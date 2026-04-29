import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <span style={styles.footerLogo}>JobTrek</span>
      <span style={styles.footerNote}>
        Built for job seekers. Not recruiters.
      </span>
    </footer>
  );
};

export default Footer;

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
  /* FOOTER */
  footer: {
    position: "relative",
    zIndex: 1,
    borderTop: `1px solid ${C.border}`,
    padding: "1.5rem 2.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerLogo: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "15px",
    fontWeight: 800,
    letterSpacing: "-0.02em",
  },
  footerNote: {
    fontSize: "12px",
    color: C.muted,
  },
};
