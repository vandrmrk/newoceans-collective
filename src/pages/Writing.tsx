import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LETTERS, type LetterMeta } from "../data/letters";

export default function Writing() {
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = "Letters From Moths — New Oceans Collective";
  }, []);

  const featured = LETTERS.find((l) => l.featured) ?? LETTERS[0];
  const rest = LETTERS.filter((l) => l.slug !== featured?.slug);

  const onBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  const Meta = ({ l }: { l: LetterMeta }) => (
    <div className="letters-meta">
      <span className="letters-meta-chip">LETTER {l.number}</span>
      <span className="letters-meta-dot">•</span>
      <span className="letters-meta-chip">SOURCE: {l.source}</span>
      <span className="letters-meta-dot">•</span>
      <span className="letters-meta-chip">FILED: {l.filed}</span>
      <span className="letters-meta-status">{l.status}</span>
    </div>
  );

  if (!featured) {
    return (
      <div className="letters-shell">
        <div className="letters-surface">
          <div className="letters-header">
            <div>
              <h1 className="letters-title">Letters From Moths</h1>
              <p className="letters-subtitle">No letters filed yet.</p>
              <a href="#" className="letters-backlink" onClick={onBack}>
                ← Return
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="letters-shell">
      <div className="letters-surface">
        <div className="letters-header">
          <div>
            <h1 className="letters-title">Letters From Moths</h1>
            <p className="letters-subtitle">
              Filed correspondence. Recovered signals. Internal writing.
            </p>
            <a href="#" className="letters-backlink" onClick={onBack}>
              ← Return
            </a>
          </div>
        </div>

        {/* Featured */}
        <Link to={`/writing/${featured.slug}`} className="letters-featured">
          <div className="letters-featured-body">
            <Meta l={featured} />
            <h2 className="letters-featured-title">{featured.title}</h2>
            <p className="letters-featured-hook">{featured.hook}</p>
            <div className="letters-cta">OPEN LETTER →</div>
          </div>
        </Link>

        {/* Grid */}
        <div className="letters-grid">
          {rest.map((l) => (
            <Link key={l.slug} to={`/writing/${l.slug}`} className="letters-card">
              <Meta l={l} />
              <h3 className="letters-card-title">{l.title}</h3>
              <p className="letters-card-hook">{l.hook}</p>
              <div className="letters-cta">OPEN LETTER →</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
