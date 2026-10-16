import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

// Enhanced colors, new accent and strong surface contrast
const C = {
  bg: '#1A1A1C',
  surface: '#232328',
  elevated: '#292933',
  border: '#24243d',
  borderHover: '#353560',
  text: '#F2F2F7',
  muted: '#A1A1AA',
  accent: '#AAF683', // brighter, modern green accent
  accentAlt: '#FFBE76', // new warm accent for secondary CTAs
  secondary: '#3741FD', // vivid blue for selection pop
  shadow: 'rgba(0,0,0,0.24)',
};

const PIPELINE_STAGES = [
  { label: 'Wishlist', color: '#8B7CF6', count: 3, icon: '📝' },
  { label: 'Applied', color: '#60A5FA', count: 8, icon: '📤' },
  { label: 'OA', color: '#FBBF24', count: 4, icon: '💻' },
  { label: 'Interview', color: '#34D399', count: 2, icon: '🎤' },
  { label: 'Offer', color: '#AAF683', count: 1, icon: '🎉' },
  { label: 'Rejected', color: '#F87171', count: 2, icon: '❌' },
];

const AI_FEATURES = [
  {
    icon: '🧬',
    title: 'JD Parser',
    desc: 'Just paste the description – our AI will instantly extract required skills, nice-to-haves, and any hidden traps.',
  },
  {
    icon: '✍️',
    title: 'Resume Bullets',
    desc: 'Paste your bullet, pick a role, and get a keyword-optimized rewrite that matches the job description.',
  },
  {
    icon: '📧',
    title: 'Cold Email',
    desc: 'Company + role + your background → instant tailored cold outreach email for any recruiter or referral.',
  },
  {
    icon: '🤖',
    title: 'Interview Prep',
    desc: 'Role-specific likely questions, model answers, and follow-up prep—generated just for your interview.',
  },
];

const STATS = [
  {
    value: '68%',
    label: (
      <>
        of applications
        <br />
        get no response{' '}
        <span style={{ color: C.accentAlt }}>without follow-up</span>
      </>
    ),
  },
  {
    value: '11×',
    label: (
      <>
        more likely to get a callback{' '}
        <span style={{ color: C.secondary }}>with a tailored resume</span>
      </>
    ),
  },
  {
    value: '3 wks',
    label: (
      <>
        average time lost <br />
        tracking jobs{' '}
        <span style={{ color: C.accentAlt }}>in spreadsheets</span>
      </>
    ),
  },
];

function AnimatedCounter({ target }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / 24);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 18);
    return () => clearInterval(timer);
  }, [target]);
  return <>{count}</>;
}

export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handle = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <div style={styles.root}>
      {/* Noise texture overlay */}
      <div style={styles.noise} />

      {/* Soft radial background gradient */}
      <div style={styles.bgGradient} />

      {/* NAV */}
      <nav style={styles.nav}>
        <span style={styles.navLogo}>
          <span style={{ color: C.accent }}>●</span>
          <span style={{ marginLeft: '8px' }}>JobTrek</span>
        </span>
        <div style={styles.navLinks}>
          <a href="#features" style={styles.navLink}>
            Features
          </a>
          <a href="#pipeline" style={styles.navLink}>
            Pipeline
          </a>
          <button style={styles.navCta} onClick={() => navigate('/auth')}>
            Sign in
          </button>
          <button style={styles.navCtaSolid} onClick={() => navigate('/auth')}>
            Get started
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section ref={heroRef} style={styles.hero}>
        <div
          style={{
            ...styles.heroGlow,
            transform: `translateY(${scrollY * 0.22}px)`,
          }}
        />
        <div style={styles.heroBadge}>
          <span style={styles.heroBadgeDot} />
          AI-powered, Private, Free
        </div>
        <h1 style={styles.heroTitle}>
          Take control{' '}
          <span style={styles.heroTitleAccent}>of your job search.</span>
        </h1>
        <p style={styles.heroSub}>
          Organize applications, move cards visually, and empower your hunt with
          built-in AI for parsing, writing, cold emails & prep.
        </p>
        <div style={styles.heroCtas}>
          <button style={styles.ctaPrimary} onClick={() => navigate('/auth')}>
            Start tracking — it’s free
          </button>
          <button style={styles.ctaGhost} onClick={() => navigate('/demo')}>
            Try demo
          </button>
        </div>

        {/* Floating pipeline preview */}
        <div style={styles.pipelinePreview}>
          {PIPELINE_STAGES.map((stage, i) => (
            <div key={stage.label} style={styles.previewStage}>
              <span
                style={{
                  ...styles.previewEmoji,
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))',
                  animationDelay: `${i * 0.09}s`,
                }}
              >
                {stage.icon}
              </span>
              <span style={{ ...styles.previewCount, color: stage.color }}>
                <AnimatedCounter target={stage.count} />
              </span>
              <span style={styles.previewLabel}>{stage.label}</span>
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
          One view.
          <span style={{ color: C.accent, marginLeft: 8 }}>
            All your job apps.
          </span>
        </h2>
        <p style={styles.sectionSub}>
          Drag and drop cards to update progress. Never miss emails, deadlines,
          or decision points again.
        </p>
        <div style={styles.kanban}>
          {PIPELINE_STAGES.map((stage) => (
            <div
              key={stage.label}
              style={{
                ...styles.kanbanCol,
                borderTop: `4px solid ${stage.color}`,
              }}
            >
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
                    background: stage.color + '1A',
                    color: stage.color,
                  }}
                >
                  {stage.count}
                </span>
              </div>
              {Array.from({ length: Math.min(stage.count, 2) }).map((_, j) => (
                <div
                  key={j}
                  style={{
                    ...styles.kanbanCard,
                    boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
                  }}
                >
                  <div style={styles.kanbanCardCompany}>Company {j + 1}</div>
                  <div style={styles.kanbanCardRole}>
                    Software Engineer · Full Time
                  </div>
                  <div style={styles.kanbanCardFooter}>
                    <span style={styles.kanbanCardDate}>Apr {20 + j}</span>
                    <span
                      style={{
                        ...styles.kanbanCardTag,
                        borderColor: stage.color + '66',
                        color: stage.color,
                        background: stage.color + '0D',
                        fontWeight: 600,
                        fontSize: '10px',
                      }}
                    >
                      {stage.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* AI FEATURES */}
      <section id="features" style={styles.sectionAlt}>
        <div style={styles.sectionTag}>Built-in AI Tools</div>
        <h2 style={styles.sectionTitle}>
          Get the unfair advantage—
          <span style={{ color: C.secondary }}>at every stage</span>
        </h2>
        <p style={styles.sectionSub}>
          More than prompts — actionable tools designed for real job hunters,
          not resume spammers.
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
        <h2 style={styles.ctaTitle}>Start your job search with confidence.</h2>
        <p style={styles.ctaSub}>
          Setup is instant. Your progress is private.{' '}
          <b>You’ll never lose an opportunity again.</b>
        </p>
        <button style={styles.ctaPrimary} onClick={() => navigate('/auth')}>
          Create my free board
        </button>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <span style={styles.footerLogo}>
          <span style={{ color: C.accent }}>●</span> JobTrek
        </span>
        <span style={styles.footerNote}>
          No tracking. No recruiters.{' '}
          <span style={{ color: C.accentAlt }}>Job seekers only.</span>
        </span>
      </footer>
      {/* Responsive styles and shadow/glass */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        @keyframes emojiPop {
          from { transform: scale(0.6); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        .fade-up {
          opacity: 0;
          animation: fadeUp 0.8s ease forwards;
        }
        @media (max-width: 900px) {
          .kanban-grid { grid-template-columns: 1fr 1fr 1fr !important; }
          .stats-strip { grid-template-columns: 1fr !important; }
          .features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

/* ─── STYLES ─────────────────────────────────────────────────────────────── */

const styles = {
  root: {
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    background: C.bg,
    color: C.text,
    minHeight: '100vh',
    overflowX: 'hidden',
    position: 'relative',
  },
  noise: {
    position: 'fixed',
    inset: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
    opacity: 0.035,
    pointerEvents: 'none',
    zIndex: 0,
  },
  bgGradient: {
    position: 'fixed',
    inset: 0,
    background: `radial-gradient(ellipse 100% 50% at 80% 5%, ${C.secondary}1A 0%, transparent 70%), radial-gradient(ellipse 80% 55% at 20% 100%, ${C.accentAlt}12 0%, transparent 80%)`,
    zIndex: 0,
    pointerEvents: 'none',
  },

  /* NAV */
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2.7rem',
    height: '65px',
    borderBottom: `1px solid ${C.border}`,
    backdropFilter: 'blur(18px)',
    background: 'rgba(26,26,28,0.92)',
    boxShadow: '0 2px 14px rgba(34,36,48,0.13)',
  },
  navLogo: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '21px',
    fontWeight: 800,
    letterSpacing: '-0.02em',
    color: C.text,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  navLink: {
    color: C.muted,
    textDecoration: 'none',
    fontSize: '15px',
    padding: '7px 20px',
    borderRadius: '7px',
    transition: 'background 0.14s, color 0.14s',
    fontWeight: 500,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    cursor: 'pointer',
  },
  navCta: {
    background: 'transparent',
    border: `1px solid ${C.border}`,
    color: C.accent,
    borderRadius: '7px',
    padding: '8px 18px',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'border 0.16s, color 0.13s',
  },
  navCtaSolid: {
    background: C.accent,
    border: 'none',
    color: '#111',
    borderRadius: '7px',
    padding: '8px 19px',
    fontSize: '14px',
    fontWeight: 700,
    boxShadow: `0 2px 24px ${C.accent}22`,
    cursor: 'pointer',
    transition: 'background 0.16s',
  },

  /* HERO */
  hero: {
    position: 'relative',
    zIndex: 1,
    paddingTop: '140px',
    paddingBottom: '94px',
    paddingLeft: '2.5rem',
    paddingRight: '2.5rem',
    maxWidth: '930px',
    margin: '0 auto',
    textAlign: 'left',
  },
  heroGlow: {
    position: 'absolute',
    top: '-30px',
    left: '-18%',
    width: '70vw',
    height: '60vw',
    maxWidth: '680px',
    maxHeight: '620px',
    background: `radial-gradient(circle, ${C.accent}38 0%, transparent 74%)`,
    pointerEvents: 'none',
    zIndex: -1,
    opacity: 0.93,
    filter: 'blur(12px)',
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    fontSize: '13px',
    color: C.accent,
    border: `1px solid ${C.border}`,
    borderRadius: '999px',
    background: `${C.surface}CC`,
    padding: '7px 18px',
    marginBottom: '1.7rem',
    fontFamily: "'DM Sans', sans-serif",
    letterSpacing: '0.05em',
    boxShadow: '0 0.5px 7px rgba(160,255,150,0.044)',
    backdropFilter: 'blur(4px)',
  },
  heroBadgeDot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: C.accent,
    animation: 'pulse 2s infinite',
    display: 'inline-block',
  },
  heroTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 'clamp(45px, 8vw, 78px)',
    fontWeight: 800,
    lineHeight: 1.07,
    letterSpacing: '-0.035em',
    color: C.text,
    marginBottom: '1.15rem',
    animation: 'fadeUp 0.9s ease forwards',
    textShadow: '0 2px 18px #00000024',
    wordSpacing: '-0.03em',
  },
  heroTitleAccent: {
    color: C.accent,
    letterSpacing: '-0.023em',
    marginLeft: '3px',
  },
  heroSub: {
    fontSize: '18px',
    lineHeight: 1.9,
    color: C.muted,
    maxWidth: '620px',
    marginBottom: '2.7rem',
    fontWeight: 400,
    animation: 'fadeUp 0.8s 0.15s ease both',
    textShadow: '0 1px 6px #00000014',
  },
  heroCtas: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    marginBottom: '7px',
    animation: 'fadeUp 0.8s 0.2s ease both',
  },
  ctaPrimary: {
    background: `linear-gradient(100deg, ${C.accent} 12%, #CEF5D4 100%)`,
    color: '#131A13',
    border: 'none',
    borderRadius: '9px',
    padding: '16px 32px',
    fontSize: '17px',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
    boxShadow: '0 1px 16px #AAF68333',
    letterSpacing: '-0.01em',
    transition: 'background 0.1s',
  },
  ctaGhost: {
    background: 'transparent',
    color: C.secondary,
    border: `1.5px solid ${C.secondary}`,
    borderRadius: '9px',
    padding: '16px 32px',
    fontSize: '17px',
    cursor: 'pointer',
    fontWeight: 600,
    fontFamily: "'DM Sans', sans-serif",
    transition: 'border 0.12s, color 0.11s',
  },

  /* PIPELINE PREVIEW */
  pipelinePreview: {
    display: 'flex',
    gap: '0',
    marginTop: '3.6rem',
    border: `1px solid ${C.border}`,
    borderRadius: '17px',
    overflow: 'hidden',
    background: C.surface,
    animation: 'fadeUp 0.8s 0.26s ease both',
    boxShadow: '0 2px 24px #24243d15',
  },
  previewStage: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '22px 5px',
    borderRight: `1px solid ${C.border}`,
    gap: '8px',
    background: 'rgba(36,36,61,0.03)',
    minWidth: '86px',
    textAlign: 'center',
    position: 'relative',
  },
  previewEmoji: {
    fontSize: '28px',
    marginBottom: '3px',
    animation: 'emojiPop 0.5s ease both',
  },
  previewLabel: {
    fontSize: '11.5px',
    color: C.muted,
    letterSpacing: '0.048em',
    marginTop: '2px',
  },
  previewCount: {
    fontSize: '24px',
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    marginTop: '2px',
    marginBottom: '0px',
  },

  /* STATS STRIP */
  statsStrip: {
    position: 'relative',
    zIndex: 1,
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    borderTop: `2px solid ${C.border}`,
    borderBottom: `2px solid ${C.border}`,
    background: `${C.elevated}C0`,
    boxShadow: '0 2px 32px #22243022',
    margin: '36px 0 0 0',
  },
  statItem: {
    padding: '2.8rem 1rem',
    borderRight: `1px solid ${C.border}`,
    textAlign: `center`,
    display: 'flex',
    flexDirection: 'column',
    gap: '7px',
    fontFamily: "'Syne', sans-serif",
  },
  statValue: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '40px',
    fontWeight: 800,
    color: C.accent,
    letterSpacing: '-0.035em',
    marginBottom: '3px',
  },
  statLabel: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: '13.5px',
    color: C.text,
    lineHeight: 1.7,
    fontWeight: 500,
    maxWidth: '228px',
    textShadow: `0 1.5px 5px #0003`,
  },

  /* SECTIONS */
  section: {
    position: 'relative',
    zIndex: 1,
    padding: '6.5rem 2.5rem 5.5rem 2.5rem',
    maxWidth: '1160px',
    margin: '0 auto',
  },
  sectionAlt: {
    position: 'relative',
    zIndex: 1,
    padding: '6.2rem 2.5rem 4.6rem 2.5rem',
    maxWidth: '1160px',
    margin: '0 auto',
    background: `${C.surface}99`,
    borderRadius: '18px',
    boxShadow: '0 2px 36px #22243018',
    marginTop: '42px',
  },
  sectionTag: {
    fontSize: '12px',
    letterSpacing: '0.09em',
    color: C.accentAlt,
    textTransform: 'uppercase',
    marginBottom: '0.9rem',
    fontWeight: 700,
    background: `${C.elevated}88`,
    borderRadius: '4px',
    display: 'inline-block',
    padding: '5px 13px',
    boxShadow: '0 1px 9px rgba(252, 190, 118, 0.04)',
  },
  sectionTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 'clamp(30px, 5vw, 48px)',
    fontWeight: 800,
    lineHeight: 1.07,
    letterSpacing: '-0.032em',
    marginBottom: '1rem',
  },
  sectionSub: {
    fontSize: '17px',
    color: C.muted,
    maxWidth: '540px',
    lineHeight: 1.78,
    fontWeight: 400,
    marginBottom: '3.4rem',
  },

  /* KANBAN */
  kanban: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '20px',
    marginTop: '14px',
    marginBottom: '10px',
  },
  kanbanCol: {
    background: C.surface,
    border: `1.5px solid ${C.border}`,
    borderRadius: '13px',
    padding: '13px 11px',
    minWidth: '0',
    boxShadow: '0 1px 12px #11111222',
    transition: 'box-shadow 0.18s, border 0.14s',
  },
  kanbanHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
    marginBottom: '11px',
  },
  kanbanDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  kanbanLabel: {
    fontSize: '13px',
    fontWeight: 700,
    color: C.text,
    flex: 1,
    letterSpacing: '0.03em',
  },
  kanbanBadge: {
    fontSize: '12px',
    padding: '2px 8px',
    borderRadius: '999px',
    fontWeight: 700,
  },
  kanbanCard: {
    background: C.bg,
    border: `1.5px solid ${C.border}`,
    borderRadius: '9px',
    padding: '12px',
    marginBottom: '10px',
    minWidth: '0',
    transition: 'box-shadow 0.14s, border 0.13s',
    boxShadow: '0 2px 16px #2C2E4315',
  },
  kanbanCardCompany: {
    fontSize: '13px',
    fontWeight: 700,
    color: C.text,
    marginBottom: '3px',
    letterSpacing: '-0.01em',
  },
  kanbanCardRole: {
    fontSize: '11.7px',
    color: C.muted,
    marginBottom: '10px',
    lineHeight: 1.45,
    fontWeight: 500,
  },
  kanbanCardFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  kanbanCardDate: {
    fontSize: '11px',
    color: C.muted,
  },
  kanbanCardTag: {
    fontSize: '10px',
    padding: '3px 9px',
    borderRadius: '6px',
    border: '1px solid',
    fontWeight: 700,
    background: C.elevated,
  },

  /* AI FEATURES */
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0.5px',
    border: `1.5px solid ${C.border}`,
    borderRadius: '14px',
    overflow: 'hidden',
    background: C.border,
    boxShadow: '0 1px 18px #11111213',
  },
  featureCard: {
    background: C.surface,
    padding: '2.45rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  featureIcon: {
    fontSize: '33px',
    color: C.accent,
    marginBottom: '1.1rem',
    display: 'block',
    lineHeight: 1,
    filter: 'drop-shadow(0 4px 16px #AAF68333)',
  },
  featureTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '21px',
    fontWeight: 700,
    marginBottom: '0.4rem',
    color: C.text,
    letterSpacing: '-0.02em',
    lineHeight: 1.14,
  },
  featureDesc: {
    fontSize: '15px',
    color: C.muted,
    lineHeight: 1.68,
    fontWeight: 400,
    maxWidth: '350px',
  },

  /* CTA SECTION */
  ctaSection: {
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
    padding: '5.2rem 2.5rem 2.7rem 2.5rem',
    borderTop: `2px solid ${C.border}`,
    overflow: 'hidden',
    background: `${C.elevated}EA`,
    borderRadius: '18px',
    margin: '44px auto 0 auto',
    boxShadow: '0 1px 22px #1f1f2d19',
    maxWidth: '860px',
  },
  ctaGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -48%)',
    width: '650px',
    height: '320px',
    background: `radial-gradient(ellipse, ${C.secondary}11 0%, transparent 80%)`,
    pointerEvents: 'none',
  },
  ctaTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 'clamp(32px, 5vw, 52px)',
    fontWeight: 800,
    letterSpacing: '-0.03em',
    marginBottom: '1.2rem',
    color: C.accent,
    textShadow: '0 1px 16px #AAF68330',
  },
  ctaSub: {
    fontSize: '17px',
    color: C.text,
    marginBottom: '2.6rem',
    fontWeight: 400,
    textShadow: '0 1.5px 5px #00000011',
  },

  /* FOOTER */
  footer: {
    position: 'relative',
    zIndex: 1,
    borderTop: `1.5px solid ${C.border}`,
    padding: '1.7rem 2.7rem 1.7rem 2.7rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '15.5px',
    background: `${C.surface}99`,
    boxShadow: '0 2px 32px #22243016',
  },
  footerLogo: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '15.5px',
    fontWeight: 800,
    letterSpacing: '-0.02em',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  footerNote: {
    fontSize: '13px',
    color: C.muted,
    fontWeight: 400,
    display: 'flex',
    alignItems: 'center',
  },
};
