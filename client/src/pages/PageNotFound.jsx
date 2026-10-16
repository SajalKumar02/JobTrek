import { useEffect, useState } from 'react';

// Apple-style modern colors (from DESIGN.md and Home.jsx)
const COLORS = {
  accent: '#AAF683',
  error: '#F87171',
  ink: '#1d1d1f',
  muted: '#A1A1AA',
  bg: '#f5f5f7',
  surface: '#fff',
  border: '#e0e0e0',
  shadow: '0 2px 24px 0 #00000017',
};

const REDIRECT_SECONDS = 3;

const PageNotFound = ({ statusCode = 404, message = 'Page Not Found' }) => {
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    if (secondsLeft === 0) {
      window.history.back();
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[68vh] px-4"
      style={{
        background: COLORS.bg,
      }}
    >
      <div
        style={{
          background: COLORS.surface,
          boxShadow: COLORS.shadow,
          borderRadius: 18,
          border: `1.5px solid ${COLORS.border}`,
          padding: '40px 36px 34px 36px',
          minWidth: 320,
          maxWidth: 410,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            marginBottom: 8,
          }}
        >
          <span
            style={{
              fontSize: 42,
              marginRight: 4,
              marginBottom: 2,
              color: COLORS.error,
              textShadow: '0 1px 12px #f8717190',
            }}
            aria-label="Warning"
          >
            🚫
          </span>
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: COLORS.error,
              lineHeight: 1,
              textShadow: '0 1px 10px #f8717130',
            }}
          >
            {statusCode}
          </span>
        </div>
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 25,
            fontWeight: 700,
            marginBottom: 14,
            color: COLORS.ink,
            letterSpacing: '-0.01em',
            lineHeight: 1.16,
          }}
        >
          {message}
        </h1>
        <p
          style={{
            color: COLORS.muted,
            fontSize: 16,
            marginBottom: 16,
            fontWeight: 400,
          }}
        >
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 17,
            color: COLORS.accent,
            fontWeight: 600,
            marginBottom: 6,
            letterSpacing: '-0.01em',
            textShadow: '0 1px 8px #AAF68322',
          }}
        >
          Redirecting
          <span style={{ color: COLORS.ink, fontWeight: 500 }}>
            {' '}
            you in{' '}
            <span style={{ color: COLORS.accent, fontWeight: 800 }}>
              {secondsLeft}
            </span>{' '}
            second{secondsLeft !== 1 ? 's' : ''}
          </span>
          ...
        </div>
        <button
          onClick={() => window.history.back()}
          style={{
            marginTop: 10,
            fontFamily: "'Syne', sans-serif",
            fontWeight: 600,
            fontSize: 15,
            borderRadius: 98,
            padding: '11px 20px',
            background: COLORS.accent,
            color: '#212124',
            border: 'none',
            boxShadow: '0 2px 5px #AAF68345',
            cursor: 'pointer',
            transition: 'background .18s',
            outline: 'none',
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = '#C3FDB3')}
          onMouseOut={(e) => (e.currentTarget.style.background = COLORS.accent)}
        >
          Go Back Now
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
