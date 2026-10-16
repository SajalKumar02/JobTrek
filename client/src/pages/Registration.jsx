import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { LineChart } from 'lucide-react';
import { useAuth } from '@/features/auth';
import { useToast } from '@/features/toast';

// Apple-style surface/tile colors and typography (from DESIGN.md)
const COLORS = {
  primary: '#0066cc',
  ink: '#1d1d1f',
  muted: '#7a7a7a',
  bg: '#f5f5f7', // canvas-parchment
  surface: '#ffffff',
  inputBG: '#fafafc', // surface-pearl
  border: '#e0e0e0', // hairline
  accent: '#0066cc',
  focus: '#2997ff',
};

const FONTS = {
  display: 'SF Pro Display, system-ui, -apple-system, sans-serif',
  text: 'SF Pro Text, system-ui, -apple-system, sans-serif',
};

const Registration = () => {
  const { token, handleAuth } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/dashboard', { replace: true });
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = e.target.email.value;
      const password = e.target.password.value;
      const response = await handleAuth({ email, password });

      if (response && response.success) {
        showToast('success', response.message);
      }
    } catch (error) {
      showToast('warning', error.response?.data?.message || error.message);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{
        background: COLORS.bg,
      }}
    >
      <form
        className="flex w-full max-w-md flex-col gap-6 rounded-2xl border shadow-none"
        onSubmit={handleSubmit}
        style={{
          borderColor: COLORS.border,
          background: COLORS.surface,
          boxShadow: '0 2px 24px 0 #00000007, 0 1.5px 0 0 ' + COLORS.border,
          padding: '40px 36px 34px 36px',
        }}
      >
        <div className="mb-2 flex flex-col items-center gap-4 text-center">
          <span
            className="flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, #e9f4fd 10%, #d8eaff 100%)',
              boxShadow: '0 2px 12px #0066cc15',
            }}
          >
            <LineChart
              style={{
                color: COLORS.accent,
              }}
              size={30}
              strokeWidth={2.25}
            />
          </span>
          <div>
            <h2
              style={{
                fontFamily: FONTS.display,
                fontSize: 32,
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: COLORS.ink,
                lineHeight: 1.14,
              }}
              className="mb-1"
            >
              Create your account
            </h2>
            <p
              style={{
                fontFamily: FONTS.text,
                fontSize: 16,
                color: COLORS.muted,
                fontWeight: 400,
                letterSpacing: 0,
              }}
              className="mt-0.5"
            >
              Start tracking your job search
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            style={{
              fontFamily: FONTS.text,
              fontSize: 14.2,
              fontWeight: 500,
              color: COLORS.ink,
              letterSpacing: 0,
              marginBottom: 3,
            }}
          >
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            style={{
              fontFamily: FONTS.text,
              fontSize: 16,
              borderRadius: 12,
              border: `1.5px solid ${COLORS.border}`,
              background: COLORS.inputBG,
              padding: '14px 15px',
              color: COLORS.ink,
              outline: 'none',
              transition: 'border-color .2s, box-shadow .2s',
              boxShadow: '0 0.5px 0 #d2d2d7',
            }}
            className="focus:outline-none focus:ring-2"
            onFocus={(e) => (e.target.style.borderColor = COLORS.focus)}
            onBlur={(e) => (e.target.style.borderColor = COLORS.border)}
            defaultValue="admin@test.com"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            style={{
              fontFamily: FONTS.text,
              fontSize: 14.2,
              fontWeight: 500,
              color: COLORS.ink,
              letterSpacing: 0,
              marginBottom: 3,
            }}
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            autoComplete="new-password"
            style={{
              fontFamily: FONTS.text,
              fontSize: 16,
              borderRadius: 12,
              border: `1.5px solid ${COLORS.border}`,
              background: COLORS.inputBG,
              padding: '14px 15px',
              color: COLORS.ink,
              outline: 'none',
              transition: 'border-color .2s, box-shadow .2s',
              boxShadow: '0 0.5px 0 #d2d2d7',
            }}
            className="focus:outline-none focus:ring-2"
            onFocus={(e) => (e.target.style.borderColor = COLORS.focus)}
            onBlur={(e) => (e.target.style.borderColor = COLORS.border)}
            defaultValue="password"
          />
        </div>
        <button
          type="submit"
          className="mt-3 w-full"
          style={{
            fontFamily: FONTS.display,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            fontSize: 17,
            borderRadius: 98,
            padding: '15px 0',
            background: COLORS.primary,
            color: '#fff',
            boxShadow: '0 2px 5px #0066cc18',
            outline: 'none',
            border: 'none',
            transition: 'background .2s',
            cursor: 'pointer',
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = COLORS.focus)}
          onMouseOut={(e) =>
            (e.currentTarget.style.background = COLORS.primary)
          }
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Registration;
