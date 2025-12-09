import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import systemsImage from "./assets/systems.jpg";
import homeImage from "./assets/home.png";


/* ------------------------------
   LAYOUT WRAPPER
--------------------------------*/
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">

      {/* LEFT-SIDE IMAGE (works only on About page) */}
      {/* The About component will inject this dynamically */}
      {children}

      {/* BACKGROUND OVERLAY SCHEMATIC */}
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

  <div className="home-vertical">

    {/* WHITE DOSSIER BLOCK */}
    <div className="dossier-block home-block">
      <h1 className="hero">
        The world you were born in <span className="critical">no longer exists.</span>
      </h1>

      <p className="subtext">
        The systems that shaped the old world no longer hold.
        What comes next will belong to those who can see clearly,
        think independently, and rebuild with intention.
      </p>

      <Link to="/about">
        <button className="button-primary">Enter the Vault</button>
      </Link>
    </div>

    {/* IMAGE BELOW */}
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

      {/* FLEX CONTAINER FOR WHITE BOX + RIGHT IMAGE */}
      <div className="about-container">

        {/* WHITE DOSSIER BLOCK */}
        <div className="dossier-block">
          <h1 className="section-title">About This Project</h1>

          <p className="subtext">
            This platform explores the machinery shaping modern reality —
            and how individuals reclaim agency in a world defined by systems.
          </p>

          <Link to="/">
            <button className="button-secondary">Back</button>
          </Link>
        </div>

        {/* IMAGE ON THE RIGHT */}
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