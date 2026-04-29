import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import NavBar from "../Components/Home/NavBar";
import Footer from "../Components/Home/Footer";

const PIPELINE_STAGES = [
  { label: "Wishlist", color: "#8B7CF6", count: 3 },
  { label: "Applied", color: "#60A5FA", count: 8 },
  { label: "OA", color: "#FBBF24", count: 4 },
  { label: "Interview", color: "#34D399", count: 2 },
  { label: "Offer", color: "#86EFAC", count: 1 },
  { label: "Rejected", color: "#F87171", count: 2 },
];

const AI_FEATURES = [
  {
    icon: "◈",
    title: "JD Parser",
    desc: "Paste any job description. Get a clean list of required skills, nice-to-haves, and red flags.",
  },
  {
    icon: "◉",
    title: "Resume Bullets",
    desc: "Paste your bullet. Tell it the role. Get a rewritten version that matches the JD language.",
  },
  {
    icon: "◎",
    title: "Cold Email",
    desc: "Company name + role + your background. One click to a personalised outreach email.",
  },
  {
    icon: "◐",
    title: "Interview Prep",
    desc: "Role-specific questions, model answers, and follow-up prep — before every round.",
  },
];

const STATS = [
  {
    value: "68%",
    label: "of applications get no response without follow-up",
  },
  {
    value: "11×",
    label: "more likely to get a callback with a tailored resume",
  },
  {
    value: "3 wks",
    label: "average time lost tracking jobs in spreadsheets",
  },
];

function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [target]);
  return <>{count}</>;
}

export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handle = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <div className="root">
      {/* Noise texture overlay */}
      <div className="noise" />

      {/* Grid lines background */}
      <div className="gridBg" />

      {/* NAV */}
      <NavBar />

      {/* HERO */}
      <section ref={heroRef} style={styles.hero}>
        <div
          style={{
            ...styles.heroGlow,
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        <div style={styles.heroBadge}>
          <span style={styles.heroBadgeDot} />
          AI-powered · Free to use
        </div>
        <h1 style={styles.heroTitle}>
          Your job hunt,
          <br />
          <span style={styles.heroTitleAccent}>
            finally under control.
          </span>
        </h1>
        <p style={styles.heroSub}>
          Track every application through a visual pipeline. Let AI
          parse JDs, rewrite your resume, draft cold emails, and prep
          you for every round. Stop losing track. Start landing
          interviews.
        </p>
        <div style={styles.heroCtas}>
          <button
            style={styles.ctaPrimary}
            onClick={() => navigate("/register")}
          >
            Start tracking free →
          </button>
          <button
            style={styles.ctaGhost}
            onClick={() => navigate("/demo")}
          >
            See a live demo
          </button>
        </div>

        {/* Floating pipeline preview */}
        <div style={styles.pipelinePreview}>
          {PIPELINE_STAGES.map((stage, i) => (
            <div key={stage.label} style={styles.previewStage}>
              <div
                style={{
                  ...styles.previewDot,
                  background: stage.color,
                  animationDelay: `${i * 0.15}s`,
                }}
              />
              <span style={styles.previewLabel}>{stage.label}</span>
              <span
                style={{ ...styles.previewCount, color: stage.color }}
              >
                <AnimatedCounter target={stage.count} />
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* STATS STRIP */}
      <section style={styles.statsStrip}>
        {STATS.map((s, i) => (
          <div key={i} style={styles.statItem}>
            <span style={styles.statValue}>{s.value}</span>
            <span style={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </section>

      {/* PIPELINE SECTION */}
      <section id="pipeline" style={styles.section}>
        <div style={styles.sectionTag}>Pipeline</div>
        <h2 style={styles.sectionTitle}>
          Every application.
          <br />
          One board.
        </h2>
        <p style={styles.sectionSub}>
          Move cards across stages with a click. Never lose track of
          where you stand with any company.
        </p>

        <div style={styles.kanban}>
          {PIPELINE_STAGES.map((stage) => (
            <div key={stage.label} style={styles.kanbanCol}>
              <div style={styles.kanbanHeader}>
                <span
                  style={{
                    ...styles.kanbanDot,
                    background: stage.color,
                  }}
                />
                <span style={styles.kanbanLabel}>{stage.label}</span>
                <span
                  style={{
                    ...styles.kanbanBadge,
                    background: stage.color + "22",
                    color: stage.color,
                  }}
                >
                  {stage.count}
                </span>
              </div>
              {Array.from({ length: Math.min(stage.count, 2) }).map(
                (_, j) => (
                  <div key={j} style={styles.kanbanCard}>
                    <div style={styles.kanbanCardCompany}>
                      Company {j + 1}
                    </div>
                    <div style={styles.kanbanCardRole}>
                      Software Engineer · Full Time
                    </div>
                    <div style={styles.kanbanCardFooter}>
                      <span style={styles.kanbanCardDate}>
                        Apr {20 + j}
                      </span>
                      <span
                        style={{
                          ...styles.kanbanCardTag,
                          borderColor: stage.color + "66",
                          color: stage.color,
                        }}
                      >
                        {stage.label}
                      </span>
                    </div>
                  </div>
                ),
              )}
            </div>
          ))}
        </div>
      </section>

      {/* AI FEATURES */}
      <section id="features" style={styles.section}>
        <div style={styles.sectionTag}>AI Tools</div>
        <h2 style={styles.sectionTitle}>
          Built-in AI that actually
          <br />
          does the work.
        </h2>
        <p style={styles.sectionSub}>
          Not generic ChatGPT prompts. Purpose-built tools for each
          stage of your job hunt, right inside your dashboard.
        </p>

        <div style={styles.featuresGrid}>
          {AI_FEATURES.map((f, i) => (
            <div key={i} style={styles.featureCard}>
              <div style={styles.featureIcon}>{f.icon}</div>
              <h3 style={styles.featureTitle}>{f.title}</h3>
              <p style={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaGlow} />
        <h2 style={styles.ctaTitle}>Ready to stop guessing?</h2>
        <p style={styles.ctaSub}>
          Set up your board in 2 minutes. Add your first application
          today.
        </p>
        <button
          style={styles.ctaPrimary}
          onClick={() => navigate("/register")}
        >
          Create free account →
        </button>
      </section>

      {/* FOOTER */}
      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        @keyframes dotPop {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }

        .fade-up {
          opacity: 0;
          animation: fadeUp 0.7s ease forwards;
        }
      `}</style>
    </div>
  );
}

/* ─── STYLES ─────────────────────────────────────────────────────────────── */

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
  /* HERO */
  hero: {
    position: "relative",
    zIndex: 1,
    paddingTop: "160px",
    paddingBottom: "80px",
    paddingLeft: "2.5rem",
    paddingRight: "2.5rem",
    maxWidth: "860px",
    margin: "0 auto",
    textAlign: "left",
  },
  heroGlow: {
    position: "absolute",
    top: "80px",
    left: "-10%",
    width: "60vw",
    height: "60vw",
    maxWidth: "600px",
    maxHeight: "600px",
    background: `radial-gradient(circle, ${C.accent}18 0%, transparent 70%)`,
    pointerEvents: "none",
    zIndex: -1,
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "12px",
    color: C.muted,
    border: `1px solid ${C.border}`,
    borderRadius: "999px",
    padding: "5px 14px",
    marginBottom: "2rem",
    fontFamily: "'DM Sans', sans-serif",
    letterSpacing: "0.04em",
  },
  heroBadgeDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: C.accent,
    animation: "pulse 2s infinite",
    display: "inline-block",
  },
  heroTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "clamp(42px, 7vw, 72px)",
    fontWeight: 800,
    lineHeight: 1.05,
    letterSpacing: "-0.03em",
    color: C.text,
    marginBottom: "1.5rem",
    animation: "fadeUp 0.8s ease forwards",
  },
  heroTitleAccent: {
    color: C.accent,
  },
  heroSub: {
    fontSize: "16px",
    lineHeight: 1.75,
    color: C.muted,
    maxWidth: "520px",
    marginBottom: "2.5rem",
    fontWeight: 300,
    animation: "fadeUp 0.8s 0.15s ease both",
  },
  heroCtas: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    animation: "fadeUp 0.8s 0.3s ease both",
  },
  ctaPrimary: {
    background: C.accent,
    color: "#0A0A0A",
    border: "none",
    borderRadius: "8px",
    padding: "12px 24px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },
  ctaGhost: {
    background: "transparent",
    color: C.text,
    border: `1px solid ${C.border}`,
    borderRadius: "8px",
    padding: "12px 24px",
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },

  /* PIPELINE PREVIEW */
  pipelinePreview: {
    display: "flex",
    gap: "0",
    marginTop: "4rem",
    border: `1px solid ${C.border}`,
    borderRadius: "12px",
    overflow: "hidden",
    background: C.surface,
    animation: "fadeUp 0.8s 0.45s ease both",
  },
  previewStage: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px 8px",
    borderRight: `1px solid ${C.border}`,
    gap: "8px",
  },
  previewDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    animation: "dotPop 0.5s ease both",
  },
  previewLabel: {
    fontSize: "11px",
    color: C.muted,
    letterSpacing: "0.04em",
  },
  previewCount: {
    fontSize: "20px",
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
  },

  /* STATS STRIP */
  statsStrip: {
    position: "relative",
    zIndex: 1,
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    borderTop: `1px solid ${C.border}`,
    borderBottom: `1px solid ${C.border}`,
  },
  statItem: {
    padding: "2.5rem",
    borderRight: `1px solid ${C.border}`,
    textAlign: `center`,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  statValue: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "36px",
    fontWeight: 800,
    color: C.accent,
    letterSpacing: "-0.03em",
  },
  statLabel: {
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: "13px",
    color: C.muted,
    lineHeight: 1.5,
    fontWeight: 300,
    maxWidth: "200px",
  },

  /* SECTIONS */
  section: {
    position: "relative",
    zIndex: 1,
    padding: "6rem 2.5rem",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  sectionTag: {
    fontSize: "11px",
    letterSpacing: "0.1em",
    color: C.accent,
    textTransform: "uppercase",
    marginBottom: "1rem",
    fontWeight: 600,
  },
  sectionTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "clamp(28px, 4vw, 44px)",
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: "-0.03em",
    marginBottom: "1rem",
  },
  sectionSub: {
    fontSize: "15px",
    color: C.muted,
    maxWidth: "480px",
    lineHeight: 1.75,
    fontWeight: 300,
    marginBottom: "3rem",
  },

  /* KANBAN */
  kanban: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "10px",
  },
  kanbanCol: {
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: "10px",
    padding: "12px 10px",
  },
  kanbanHeader: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "10px",
  },
  kanbanDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    flexShrink: 0,
  },
  kanbanLabel: {
    fontSize: "11px",
    fontWeight: 600,
    color: C.text,
    flex: 1,
    letterSpacing: "0.02em",
  },
  kanbanBadge: {
    fontSize: "10px",
    padding: "1px 6px",
    borderRadius: "999px",
    fontWeight: 600,
  },
  kanbanCard: {
    background: C.bg,
    border: `1px solid ${C.border}`,
    borderRadius: "7px",
    padding: "10px",
    marginBottom: "6px",
  },
  kanbanCardCompany: {
    fontSize: "11px",
    fontWeight: 600,
    color: C.text,
    marginBottom: "2px",
  },
  kanbanCardRole: {
    fontSize: "10px",
    color: C.muted,
    marginBottom: "8px",
    lineHeight: 1.4,
  },
  kanbanCardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  kanbanCardDate: {
    fontSize: "10px",
    color: C.muted,
  },
  kanbanCardTag: {
    fontSize: "9px",
    padding: "2px 6px",
    borderRadius: "4px",
    border: "1px solid",
    fontWeight: 600,
  },

  /* AI FEATURES */
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1px",
    border: `1px solid ${C.border}`,
    borderRadius: "12px",
    overflow: "hidden",
    background: C.border,
  },
  featureCard: {
    background: C.surface,
    padding: "2rem",
  },
  featureIcon: {
    fontSize: "24px",
    color: C.accent,
    marginBottom: "1rem",
    display: "block",
    lineHeight: 1,
  },
  featureTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "18px",
    fontWeight: 700,
    marginBottom: "0.5rem",
    color: C.text,
    letterSpacing: "-0.02em",
  },
  featureDesc: {
    fontSize: "14px",
    color: C.muted,
    lineHeight: 1.7,
    fontWeight: 300,
  },

  /* CTA SECTION */
  ctaSection: {
    position: "relative",
    zIndex: 1,
    textAlign: "center",
    padding: "6rem 2.5rem",
    borderTop: `1px solid ${C.border}`,
    overflow: "hidden",
  },
  ctaGlow: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    height: "300px",
    background: `radial-gradient(ellipse, ${C.accent}14 0%, transparent 70%)`,
    pointerEvents: "none",
  },
  ctaTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "clamp(32px, 5vw, 52px)",
    fontWeight: 800,
    letterSpacing: "-0.03em",
    marginBottom: "1rem",
  },
  ctaSub: {
    fontSize: "15px",
    color: C.muted,
    marginBottom: "2.5rem",
    fontWeight: 300,
  },
};
