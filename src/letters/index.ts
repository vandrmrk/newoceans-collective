export type LetterMeta = {
  id: number;
  title: string;
  date: string; // YYYY-MM-DD
  source: "FIELD" | "SYSTEMS" | "PERSONAL" | "SIGNAL" | "MYTH" | string;
  status?: string;
  subtitle?: string;
};

export type Letter = {
  meta: LetterMeta;
  body: string; // markdown
};

function parseFrontMatter(raw: string): { meta: Partial<LetterMeta>; body: string } {
  // Supports:
  // ---
  // key: value
  // ---
  // body...
  if (!raw.startsWith("---")) return { meta: {}, body: raw.trim() };

  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { meta: {}, body: raw.trim() };

  const fmBlock = raw.slice(3, end).trim();
  const body = raw.slice(end + "\n---".length).trim();

  const meta: Record<string, string> = {};
  for (const line of fmBlock.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const idx = trimmed.indexOf(":");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();

    // strip surrounding quotes if any
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    meta[key] = value;
  }

  const parsed: Partial<LetterMeta> = {
    id: meta.id ? Number(meta.id) : undefined,
    title: meta.title,
    date: meta.date,
    source: meta.source,
    status: meta.status,
    subtitle: meta.subtitle,
  };

  return { meta: parsed, body };
}

// Vite: eagerly import all markdown files in this folder as raw strings
const rawModules = import.meta.glob("./*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const letters: Letter[] = Object.entries(rawModules)
  .map(([path, raw]) => {
    const { meta, body } = parseFrontMatter(raw);

    if (!meta.id || !meta.title || !meta.date || !meta.source) {
      // Fail loudly in dev: bad letter file
      throw new Error(
        `Invalid letter front-matter in ${path}. Required: id, title, date, source.`
      );
    }

    return {
      meta: meta as LetterMeta,
      body,
    };
  })
  // newest first
  .sort((a, b) => b.meta.id - a.meta.id);

export function getAllLetters(): Letter[] {
  return letters;
}

export function getLetterById(id: number): Letter | undefined {
  return letters.find((l) => l.meta.id === id);
}
