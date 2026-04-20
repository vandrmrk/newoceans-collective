export type LetterMeta = {
  slug: string;      // used in the URL: /writing/:slug
  number: string;    // display number (ex: "001")
  source: string;    // ex: "FIELD"
  status: string;    // ex: "CLEARED"
  filed: string;     // ex: "2026-01-20"
  title: string;     // big title
  hook: string;      // subtitle / hook
  mdFile: string;    // MUST match a file in src/letters (ex: "001.md")
  featured?: boolean;
};

export const LETTERS: LetterMeta[] = [
  {
    slug: "on-your-synthesis",
    number: "001",
    source: "FIELD",
    status: "CLEARED",
    filed: "2026-01-20",
    title: "The Inheritance",
    hook: "On, your synthesis.",
    mdFile: "001.md",
    featured: true,
  },
  {
    slug: "agency-in-the-age-of-systems",
    number: "002",
    source: "SYSTEMS",
    status: "CLEARED",
    filed: "2026-01-18",
    title: "Agency in the age of systems",
    hook: "How power hides in defaults — and how to fight back.",
    mdFile: "002.md",
  },
  {
    slug: "on-modern-alchemy",
    number: "003",
    source: "MYTH",
    status: "CLEARED",
    filed: "2026-01-12",
    title: "On modern alchemy",
    hook: "Turning pressure into signal. Turning chaos into craft.",
    mdFile: "003.md",
  },
  {
    slug: "notes-from-the-vault-001",
    number: "004",
    source: "FIELD",
    status: "CLEARED",
    filed: "2026-01-06",
    title: "Notes from the Vault — 001",
    hook: "Fragments, observations, first principles.",
    mdFile: "004.md",
  },
];
