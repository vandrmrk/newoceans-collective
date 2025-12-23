import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

import systemsImage from "./assets/systems.jpg";
import homeImage from "./assets/home.png";
import topLogo from "./assets/newoceans.png";

import sigil from "./components/sigil";

/* ------------------------------
   LAYOUT WRAPPER (must be under <Router>)
--------------------------------*/
function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      {/* TOP BANNER (Fixed) */}
      <header className="top-banner">
        <img src={topLogo} alt="New Oceans Collective" className="site-logo" />
      </header>

      <div className="layout">
        <div className="content">
          {children}
          {isHome && <Sigil />}
        </div>

        <img src="/schematic.jpg" alt="" className="schematic" />
      </div>
    </>
  );
}

/* ------------------------------
   HOME PAGE
--------------------------------*/
function Home() {
  React.useEffect(() => {
    document.title = "New Oceans Collective";
  }, []);

  return (
    <Layout>
      <div className="home-vertical">
        <div className="dossier-block home-block">
          <h1 className="hero">
            The world you were born in <span className="critical">no longer exists.</span>
          </h1>

          <p className="subtext">
            The systems that shaped the old world no longer hold. What comes next will belong to those who
            can see clearly, think independently, and rebuild with intention.
          </p>

          <div className="vault-actions">
            <Link to="/about">
              <button className="button-primary">Enter the Vault</button>
            </Link>

            <nav className="vault-links">
              <Link to="/research">Research</Link>
              <Link to="/writing">Writing</Link>
              <Link to="/archive">Archive</Link>
            </nav>
          </div>
        </div>

        <div className="home-image-below">
          <img src={homeImage} alt="Home visual" />
        </div>
      </div>
    </Layout>
  );
}

/* ------------------------------
   ABOUT PAGE
--------------------------------*/
function About() {
  React.useEffect(() => {
    document.title = "About — New Oceans Collective";
  }, []);

  return (
    <Layout>
      <div className="about-container">
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

        <div className="about-image">
          <img src={systemsImage} alt="Systems graphic" />
        </div>
      </div>
    </Layout>
  );
}

/* ------------------------------
   ROOT APP
--------------------------------*/
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}
