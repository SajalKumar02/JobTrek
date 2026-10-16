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

const Pill = ({ children, selected = false }) => (
  <span className={selected ? 'chip-pill-selected' : 'chip-pill'}>
    {children}
  </span>
);

const SectionLabel = ({ icon: Icon, title }) => (
  <div className="mb-3 flex items-center gap-2 text-[14px] leading-[1.29] font-semibold tracking-[-0.224px] text-ink">
    <Icon size={14} className="text-ink-muted-48" />
    {title}
  </div>
);

const RoleFitGauge = ({ score = 0 }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const scoreColor =
    score >= 75
      ? 'text-primary'
      : score >= 45
        ? 'text-ink-muted-80'
        : 'text-ink-muted-48';
  const strokeColor =
    score >= 75
      ? 'stroke-primary'
      : score >= 45
        ? 'stroke-ink-muted-80'
        : 'stroke-ink-muted-48';

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-[76px] w-[76px] shrink-0">
        <svg viewBox="0 0 72 72" className="h-full w-full -rotate-90">
          <circle
            cx="36"
            cy="36"
            r={radius}
            strokeWidth="6"
            className="fill-none stroke-divider-soft"
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
          <span
            className={`text-[21px] leading-[1.19] font-semibold tracking-[0.231px] ${scoreColor}`}
          >
            {score}
          </span>
        </div>
      </div>
      <div>
        <div className="text-[17px] leading-[1.24] font-semibold tracking-[-0.374px] text-ink">
          Role Fit Score
        </div>
        <div className="text-[14px] leading-[1.43] tracking-[-0.224px] text-ink-muted-48">
          Based on your profile & the JD
        </div>
      </div>
    </div>
  );
};

const AIAnalysisResult = () => {
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
    <div className="app-card w-full max-w-xl">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary">
            <Sparkle className="text-on-primary" size={18} />
          </span>
          <div>
            <h3 className="text-[17px] leading-[1.24] font-semibold tracking-[-0.374px] text-ink">
              AI Analysis
            </h3>
            <p className="text-[14px] leading-[1.43] tracking-[-0.224px] text-ink-muted-48">
              Extracted from the job description
            </p>
          </div>
        </div>
        <Pill selected>Parsed</Pill>
      </div>

      <div className="mb-6 rounded-sm border border-hairline bg-surface-pearl p-4">
        <RoleFitGauge score={data.roleFitScore} />
      </div>

      <div className="mb-6">
        <SectionLabel icon={Info} title="TL;DR" />
        <p className="rounded-sm border border-hairline bg-surface-pearl p-4 text-[17px] leading-[1.47] tracking-[-0.374px] text-ink-muted-80">
          {data.tldr}
        </p>
      </div>

      <div className="mb-6">
        <SectionLabel icon={ListChecks} title="Required Skills" />
        <div className="flex flex-wrap gap-2">
          {data.requiredSkills.map((skill) => (
            <Pill key={skill} selected>
              {skill}
            </Pill>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <SectionLabel icon={ClipboardList} title="Nice to Haves" />
        <div className="flex flex-wrap gap-2">
          {data.niceToHaves.map((skill) => (
            <Pill key={skill}>{skill}</Pill>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <SectionLabel icon={TriangleAlert} title="Red Flags" />
        <ul className="space-y-2">
          {data.redFlags.map((flag) => (
            <li
              key={flag}
              className="flex items-start gap-2 rounded-sm border border-hairline bg-surface-pearl px-4 py-3 text-[14px] leading-[1.43] tracking-[-0.224px] text-ink-muted-80"
            >
              <TriangleAlert
                size={13}
                className="mt-0.5 shrink-0 text-ink-muted-48"
              />
              {flag}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-sm border border-hairline bg-surface-pearl p-4">
          <div className="mb-1 flex items-center gap-2 text-[14px] leading-[1.43] font-semibold tracking-[-0.224px] text-ink-muted-48">
            <Wallet size={13} />
            Compensation
          </div>
          <div className="text-[17px] leading-[1.24] font-semibold tracking-[-0.374px] text-ink">
            {data.compensation}
          </div>
        </div>
        <div className="rounded-sm border border-hairline bg-surface-pearl p-4">
          <div className="mb-1 flex items-center gap-2 text-[14px] leading-[1.43] font-semibold tracking-[-0.224px] text-ink-muted-48">
            <MapPinned size={13} />
            Work Mode
          </div>
          <div className="text-[17px] leading-[1.24] font-semibold tracking-[-0.374px] text-ink">
            {data.workMode}
          </div>
        </div>
      </div>

      <button type="button" className="btn-primary mt-6 w-full">
        <Gauge size={16} />
        Use This to Fill Form
      </button>
    </div>
  );
};

export default AIAnalysisResult;
