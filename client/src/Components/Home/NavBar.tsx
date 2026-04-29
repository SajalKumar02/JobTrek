import React from "react";
import { useNavigate } from "react-router";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav style={styles.nav}>
      <span style={styles.navLogo}>JobTrek</span>
      <div style={styles.navLinks}>
        <a href="#features" style={styles.navLink}>
          Features
        </a>
        <a href="#pipeline" style={styles.navLink}>
          Pipeline
        </a>
        <button
          style={styles.navCta}
          onClick={() => navigate("/register")}
        >
          Sign in
        </button>
        <button
          style={styles.navCtaSolid}
          onClick={() => navigate("/register")}
        >
          Get started
        </button>
      </div>
    </nav>
  );
};

export default NavBar;

const C = {
  bg: "#0A0A0A",
  surface: "#111111",
  border: "#1F1F1F",
  borderHover: "#2E2E2E",
  text: "#F0EDE8",
  muted: "#6B6B6B",
  accent: "#E8FF47", // electric lime — the one memorable colour
  accentDim: "#E8FF4722",
};

const styles: Record<string, React.CSSProperties> = {
  /* NAV */
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 2.5rem",
    height: "60px",
    borderBottom: `1px solid ${C.border}`,
    backdropFilter: "blur(12px)",
    background: "rgba(10,10,10,0.85)",
  },
  navLogo: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "18px",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    color: C.text,
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  navLink: {
    color: C.muted,
    textDecoration: "none",
    fontSize: "13px",
    padding: "6px 12px",
    transition: "color 0.2s",
  },
  navCta: {
    background: "transparent",
    border: `1px solid ${C.border}`,
    color: C.text,
    borderRadius: "6px",
    padding: "7px 16px",
    fontSize: "13px",
    cursor: "pointer",
  },
  navCtaSolid: {
    background: C.accent,
    border: "none",
    color: "#0A0A0A",
    borderRadius: "6px",
    padding: "7px 16px",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
  },
};
