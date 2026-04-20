import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Outlet,
} from "react-router-dom";

import systemsImage from "./assets/systems.jpg";
import homeImage from "./assets/home.png";
import aboutCallImage from "./assets/call.png";
import topLogo from "./assets/newoceans.png";
import polarMap from "./assets/map.jpg";

import Sigil from "./components/sigil.tsx";

import Writing from "./pages/Writing";
import WritingPost from "./pages/WritingPost";

function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isWritingRoute = location.pathname.startsWith("/writing");

  return (
    <>
      <header className="top-banner">
        <img src={topLogo} alt="New Oceans Collective" className="site-logo" />
      </header>

      <div className={`layout ${isWritingRoute ? "layout--writing" : ""}`}>
        <div className="content">
          <Outlet />
          {isHome && <Sigil />}
        </div>

        <img src="/schematic.jpg" alt="" className="schematic" />
      </div>
    </>
  );
}

function Home() {
  React.useEffect(() => {
    document.title = "New Oceans Collective";
  }, []);

  return (
    <div className="home-vertical">
      <div className="dossier-block home-block">
        <h1 className="hero">
          The world you were born in <span className="critical">no longer exists.</span>
        </h1>

        <p className="subtext">
          The systems that shaped the old world no longer hold. What eventually follows; will include those
          who still choose to build, see through narratives, and remember their inheritance.
        </p>

        <div className="vault-actions">
          <Link to="/about">
            <button className="button-primary">Enter the Vault</button>
          </Link>

          <nav className="vault-links">
            <Link to="/research">Research</Link>
            <Link to="/writing">Letters</Link>
            <Link to="/archive">Archive</Link>
          </nav>
        </div>
      </div>

      <div className="home-image-below">
        <img src={homeImage} alt="Home visual" />
      </div>
    </div>
  );
}

function About() {
  React.useEffect(() => {
    document.title = "About — New Oceans Collective";
  }, []);

  return (
    <div className="about-container">
      <div className="about-left">
        <div className="dossier-block">
          <h1 className="section-title">About</h1>

          <p className="subtext">
            This platform explores the machinery shaping modern reality — and how individuals reclaim agency
            in a world defined by systems.
          </p>

          <Link to="/">
            <button className="button-secondary">Back</button>
          </Link>
        </div>

        <div className="about-below">
          <img src={aboutCallImage} alt="Intercepted call" />
        </div>
      </div>

      <div className="about-right">
        <div className="about-image">
          <img src={systemsImage} alt="Systems graphic" />
        </div>

        <div className="about-right-dossier">
          <div className="dossier-block dossier-block--right">
            <h2 className="section-title">Field Note</h2>

            <p className="subtext" style={{ marginBottom: 0 }}>
              "Do not be misinformed — You indeed are a fellow byproduct of a
              governmental entity gone rogue; a once-common tongue now turned against you,
              and your beautiful oak door now kindle for the fire."
            </p>
            <p className="subtext" style={{ marginBottom: 0 }}>
              If you want this to feel more “classified,” we can add a red stamp, a case number, and metadata
              like DATE / SOURCE / STATUS.
            </p>
          </div>
        </div>

        <div className="about-map">
          <img src={polarMap} alt="North Polar Azimuthal Equidistant Map" />
        </div>
      </div>
    </div>
  );
}

function Research() {
  React.useEffect(() => {
    document.title = "Research — New Oceans Collective";
  }, []);

  return (
    <div className="dossier-block">
      <h1 className="section-title">Research</h1>
      <p className="subtext">Workspace for analysis, sources, and intel.</p>
      <Link to="/">
        <button className="button-secondary">Back</button>
      </Link>
    </div>
  );
}

function Archive() {
  React.useEffect(() => {
    document.title = "Archive — New Oceans Collective";
  }, []);

  return (
    <div className="dossier-block">
      <h1 className="section-title">Archive</h1>
      <p className="subtext">Stored artifacts, links, and fragments.</p>
      <Link to="/">
        <button className="button-secondary">Back</button>
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/research" element={<Research />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/writing/:slug" element={<WritingPost />} />
        </Route>
      </Routes>
    </Router>
  );
}
