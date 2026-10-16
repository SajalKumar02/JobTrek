import { useEffect, useState } from 'react';

/**
 * Loader component
 * Applies brand colors, spacing, radius, and typography according to DESIGN.md.
 * - Primary color: indigo (for loader bar).
 * - Muted surfaces: slate-50 and slate-100.
 * - Border radius and shadow per design system, not arbitrary values.
 * - Typography uses text-sm and font-semibold.
 */
const Loader = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Animate progress
    const timer = setTimeout(() => setWidth(100), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <div className="w-full max-w-sm h-3 bg-slate-100 rounded-lg overflow-hidden shadow-md">
        <div
          className="h-full bg-indigo-600 transition-all duration-1000 ease-linear"
          style={{ width: `${width}%` }}
        />
      </div>

      <div className="flex items-center mt-6 gap-2">
        <svg
          className="animate-spin h-5 w-5 text-indigo-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        <span className="text-indigo-700 text-sm font-semibold tracking-wide">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Loader;
