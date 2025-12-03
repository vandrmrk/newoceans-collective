import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

/* ------------------------------
   LAYOUT WRAPPER
--------------------------------*/
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <div className="dossier-block">
        {children}
      </div>

      {/* Background schematic */}
      <img 
        src="/schematic.jpg" 
        alt="" 
        className="schematic" 
      />
    </div>
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
      <h1 className="hero">
        The world you were born in <span className="critical">no longer exists</span>.
      </h1>

      <p className="subtext">
        The systems that shaped the old world no longer hold.
        What comes next will belong to those who can see clearly,
        think independently, and rebuild with intention.
      </p>

      <Link to="/about" className="button-primary">
        Enter the Vault
      </Link>
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
      <img 
        src="/about-city.jpg" 
        alt="Historical city scene"
        className="about-photo-outside"
      />

      <h1 className="section-title">About This Project</h1>

      <p className="subtext">
        This platform explores the machinery shaping modern reality—
        and how individuals reclaim agency in a world defined by systems.
      </p>

      <Link to="/" className="button-secondary">
        Back
      </Link>
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
