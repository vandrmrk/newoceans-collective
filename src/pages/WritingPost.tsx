import React from "react";
import { Link, useParams } from "react-router-dom";
import { LETTERS } from "../data/letters";

/**
 * Vite: load markdown files as raw strings.
 * Put your .md files here:  src/letters/*.md
 */
const mdModules = import.meta.glob("../letters/*.md", {
  query: "?raw",
  import: "default",
});

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const text = raw ?? "";
  const lines = text.split(/\r?\n/);

  // Support YAML-ish frontmatter:
  // ---
  // title: Something
  // ---
  if (lines[0]?.trim() !== "---") return { data: {}, body: text };

  let end = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i]?.trim() === "---") {
      end = i;
      break;
    }
  }
  if (end === -1) return { data: {}, body: text };

  const fmLines = lines.slice(1, end);
  const body = lines.slice(end + 1).join("\n").trimStart();

  const data: Record<string, string> = {};
  for (const l of fmLines) {
    const idx = l.indexOf(":");
    if (idx === -1) continue;

    const key = l.slice(0, idx).trim();
    let val = l.slice(idx + 1).trim();

    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }

    if (key) data[key] = val;
  }

  return { data, body };
}

/**
 * Minimal markdown renderer (no extra deps).
 * Supports: headings, paragraphs, bullet lists, blockquotes, code fences.
 */
function SimpleMarkdown({ text }: { text: string }) {
  const lines = (text || "").split(/\r?\n/);

  const blocks: React.ReactNode[] = [];
  let i = 0;

  const pushParagraph = (paragraphLines: string[]) => {
    const t = paragraphLines.join(" ").trim();
    if (!t) return;
    blocks.push(
      <p key={`p-${blocks.length}`} className="letter-body-p">
        {t}
      </p>
    );
  };

  while (i < lines.length) {
    const line = lines[i];

    // code fence
    if (line.trim().startsWith("```")) {
      const lang = line.trim().slice(3).trim();
      i++;
      const codeLines: string[] = [];
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i < lines.length) i++; // closing fence

      blocks.push(
        <pre key={`code-${blocks.length}`} className="letter-body-code">
          <code data-lang={lang || undefined}>{codeLines.join("\n")}</code>
        </pre>
      );
      continue;
    }

    // headings
    if (/^#{1,3}\s/.test(line)) {
      const level = line.match(/^#+/)?.[0].length ?? 1;
      const content = line.replace(/^#{1,3}\s+/, "").trim();
      const Tag = (level === 1 ? "h2" : level === 2 ? "h3" : "h4") as any;

      blocks.push(
        <Tag key={`h-${blocks.length}`} className="letter-body-h">
          {content}
        </Tag>
      );
      i++;
      continue;
    }

    // blockquote
    if (line.trim().startsWith(">")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].replace(/^\s*>\s?/, ""));
        i++;
      }
      blocks.push(
        <blockquote key={`q-${blocks.length}`} className="letter-body-quote">
          {quoteLines.join(" ").trim()}
        </blockquote>
      );
      continue;
    }

    // bullet list
    if (/^\s*-\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*-\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*-\s+/, "").trim());
        i++;
      }
      blocks.push(
        <ul key={`ul-${blocks.length}`} className="letter-body-ul">
          {items.map((it, idx) => (
            <li key={idx} className="letter-body-li">
              {it}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // blank line
    if (!line.trim()) {
      i++;
      continue;
    }

    // paragraph chunk
    const paragraphLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^#{1,3}\s/.test(lines[i]) &&
      !lines[i].trim().startsWith("```") &&
      !lines[i].trim().startsWith(">") &&
      !/^\s*-\s+/.test(lines[i])
    ) {
      paragraphLines.push(lines[i]);
      i++;
    }
    pushParagraph(paragraphLines);
  }

  return <div className="letter-body">{blocks}</div>;
}

export default function WritingPost() {
  const { slug } = useParams<{ slug: string }>();

  const meta = React.useMemo(() => LETTERS.find((l) => l.slug === slug), [slug]);

  const [state, setState] = React.useState<{
    loading: boolean;
    error?: string;
    frontmatter: Record<string, string>;
    body: string;
  }>({
    loading: true,
    frontmatter: {},
    body: "",
  });

  React.useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!slug) return;

      // If the slug doesn't exist in letters.ts, fail loudly with helpful output.
      if (!meta) {
        const known = LETTERS.map((l) => l.slug).sort().join(", ");
        if (!cancelled) {
          setState({
            loading: false,
            frontmatter: {},
            body: "",
            error: `Unknown letter slug "${slug}". Known slugs: ${known || "(none)"}`,
          });
        }
        return;
      }

      setState((s) => ({ ...s, loading: true, error: undefined }));

      // Primary mapping: letters.ts controls which markdown file this letter uses (ex: 001.md)
      const targetKey = `../letters/${meta.mdFile}`;

      const loader = targetKey in mdModules ? mdModules[targetKey] : undefined;

      if (!loader) {
        const available = Object.keys(mdModules)
          .map((k) => k.replace("../letters/", ""))
          .sort()
          .join(", ");
        if (!cancelled) {
          setState({
            loading: false,
            frontmatter: {},
            body: "",
            error: `Could not find "${meta.mdFile}" in src/letters/. Available: ${available || "(none)"}`,
          });
        }
        return;
      }

      try {
        const raw = (await loader()) as unknown as string;
        const { data, body } = parseFrontmatter(raw);

        if (!cancelled) {
          setState({
            loading: false,
            frontmatter: data,
            body,
          });
        }
      } catch (e: any) {
        if (!cancelled) {
          setState({
            loading: false,
            frontmatter: {},
            body: "",
            error: e?.message || "Failed to load markdown.",
          });
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [slug, meta]);

  React.useEffect(() => {
    const title = meta?.title || state.frontmatter.title || "Letter";
    document.title = `${title} — Letters From Moths`;
  }, [meta, state.frontmatter]);

  const number = state.frontmatter.id || meta?.number || "—";
  const source = state.frontmatter.source || meta?.source || "—";
  const status = state.frontmatter.status || meta?.status || "—";
  const filed = state.frontmatter.date || state.frontmatter.filed || meta?.filed || "—";
  const title = state.frontmatter.title || meta?.title || "Untitled";
  const subtitle = state.frontmatter.subtitle || meta?.hook || "";

  return (
    <div className="letters-shell">
      <div className="letters-surface">
        <Link to="/writing" className="letters-backlink">
          ← Back to Letters
        </Link>

        <div className="letters-meta" style={{ marginTop: 10 }}>
          <span className="letters-meta-chip">LETTER {number}</span>
          <span className="letters-meta-dot">•</span>
          <span className="letters-meta-chip">SOURCE: {source}</span>
          <span className="letters-meta-dot">•</span>
          <span className="letters-meta-chip">FILED: {filed}</span>
          <span className="letters-meta-status">{status}</span>
        </div>

        <h1 className="letters-title" style={{ fontSize: 30, marginTop: 10 }}>
          {title}
        </h1>

        {subtitle ? (
          <p className="letters-subtitle" style={{ marginBottom: 18 }}>
            {subtitle}
          </p>
        ) : null}

        {state.loading ? (
          <p className="letters-subtitle">Loading…</p>
        ) : state.error ? (
          <div style={{ padding: 14, border: "1px solid rgba(255,255,255,0.14)", borderRadius: 12 }}>
            <p className="letters-subtitle" style={{ margin: 0 }}>
              {state.error}
            </p>
          </div>
        ) : (
          <SimpleMarkdown text={state.body} />
        )}
      </div>
    </div>
  );
}
