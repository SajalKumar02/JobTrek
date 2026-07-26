import {
  Gauge,
  ListChecks,
  Sparkle,
  TriangleAlert,
  Wallet,
  MapPinned,
  ClipboardList,
  Info,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// Small building blocks
// ─────────────────────────────────────────────────────────────
const Pill = ({ children, tone = 'slate' }) => {
  const tones = {
    slate: 'border-slate-200 bg-slate-50 text-slate-600',
    indigo: 'border-indigo-200 bg-indigo-50 text-indigo-700',
    emerald: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    rose: 'border-rose-200 bg-rose-50 text-rose-700',
    amber: 'border-amber-200 bg-amber-50 text-amber-700',
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
};

const SectionLabel = ({ icon: Icon, title }) => (
  <div className="mb-2.5 flex items-center gap-1.5 text-[13px] font-semibold text-slate-700">
    <Icon size={14} className="text-slate-400" />
    {title}
  </div>
);

// ─────────────────────────────────────────────────────────────
// Role Fit Score — circular gauge
// ─────────────────────────────────────────────────────────────
const RoleFitGauge = ({ score = 0 }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const scoreColor =
    score >= 75
      ? 'text-emerald-600'
      : score >= 45
        ? 'text-amber-600'
        : 'text-rose-600';
  const strokeColor =
    score >= 75
      ? 'stroke-emerald-500'
      : score >= 45
        ? 'stroke-amber-500'
        : 'stroke-rose-500';

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-[76px] w-[76px] shrink-0">
        <svg viewBox="0 0 72 72" className="h-full w-full -rotate-90">
          <circle
            cx="36"
            cy="36"
            r={radius}
            strokeWidth="6"
            className="fill-none stroke-slate-100"
          />
          <circle
            cx="36"
            cy="36"
            r={radius}
            strokeWidth="6"
            strokeLinecap="round"
            className={`fill-none transition-all duration-700 ease-out ${strokeColor}`}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-lg font-bold ${scoreColor}`}>{score}</span>
        </div>
      </div>
      <div>
        <div className="text-sm font-semibold text-slate-800">
          Role Fit Score
        </div>
        <div className="text-xs text-slate-400">
          Based on your profile & the JD
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────
const AIAnalysisResult = () => {
  // Static demo data — no fetching / functionality wired
  const data = {
    roleFitScore: 78,
    tldr: 'Mid-level frontend role focused on React + TypeScript, hybrid work mode, with a fast-paced product team.',
    requiredSkills: ['React', 'TypeScript', 'REST APIs', 'Git', 'CSS/Tailwind'],
    niceToHaves: ['Next.js', 'GraphQL', 'Testing (Jest/RTL)'],
    redFlags: [
      'No salary range mentioned',
      'Vague growth path',
      '"Fast-paced" mentioned 3x',
    ],
    compensation: '₹8L – ₹12L / year (estimated)',
    workMode: 'Hybrid · 3 days onsite',
  };

  return (
    <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-emerald-400 to-teal-600 shadow-sm shadow-emerald-900/20">
            <Sparkle className="text-white" size={18} />
          </span>
          <div>
            <h3 className="text-base font-semibold text-slate-800">
              AI Analysis
            </h3>
            <p className="text-xs text-slate-400">
              Extracted from the job description
            </p>
          </div>
        </div>
        <Pill tone="emerald">Parsed</Pill>
      </div>

      {/* Role fit gauge */}
      <div className="mb-5 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
        <RoleFitGauge score={data.roleFitScore} />
      </div>

      {/* TL;DR */}
      <div className="mb-5">
        <SectionLabel icon={Info} title="TL;DR" />
        <p className="rounded-lg border border-slate-100 bg-slate-50/60 p-3 text-sm leading-relaxed text-slate-600">
          {data.tldr}
        </p>
      </div>

      {/* Required Skills */}
      <div className="mb-5">
        <SectionLabel icon={ListChecks} title="Required Skills" />
        <div className="flex flex-wrap gap-1.5">
          {data.requiredSkills.map((skill) => (
            <Pill key={skill} tone="indigo">
              {skill}
            </Pill>
          ))}
        </div>
      </div>

      {/* Nice to Haves */}
      <div className="mb-5">
        <SectionLabel icon={ClipboardList} title="Nice to Haves" />
        <div className="flex flex-wrap gap-1.5">
          {data.niceToHaves.map((skill) => (
            <Pill key={skill} tone="slate">
              {skill}
            </Pill>
          ))}
        </div>
      </div>

      {/* Red Flags */}
      <div className="mb-5">
        <SectionLabel icon={TriangleAlert} title="Red Flags" />
        <ul className="space-y-1.5">
          {data.redFlags.map((flag) => (
            <li
              key={flag}
              className="flex items-start gap-2 rounded-lg border border-rose-100 bg-rose-50/60 px-3 py-2 text-xs text-rose-700"
            >
              <TriangleAlert
                size={13}
                className="mt-0.5 shrink-0 text-rose-500"
              />
              {flag}
            </li>
          ))}
        </ul>
      </div>

      {/* Compensation + Work Mode */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-3">
          <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <Wallet size={13} />
            Compensation
          </div>
          <div className="text-sm font-semibold text-slate-800">
            {data.compensation}
          </div>
        </div>
        <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-3">
          <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <MapPinned size={13} />
            Work Mode
          </div>
          <div className="text-sm font-semibold text-slate-800">
            {data.workMode}
          </div>
        </div>
      </div>

      {/* Footer action */}
      <button
        type="button"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-600/25 transition-colors hover:bg-indigo-700 cursor-pointer"
      >
        <Gauge size={16} />
        Use This to Fill Form
      </button>
    </div>
  );
};

export default AIAnalysisResult;
