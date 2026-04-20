import React from "react";
import { Link } from "react-router-dom";

export default function Archive() {
  React.useEffect(() => {
    document.title = "Archive — New Oceans Collective";
  }, []);

  return (
    <div className="dossier-block">
      <h1 className="section-title">Archive</h1>

      <p className="subtext">
        A repository for artifacts, captured links, saved fragments. Coming soon.
      </p>

      <Link to="/">
        <button className="button-secondary">Back</button>
      </Link>
    </div>
  );
}
