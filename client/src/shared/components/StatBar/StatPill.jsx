const StatPill = ({ label, value, sub }) => (
  <div className="flex flex-col items-start rounded-lg border border-hairline bg-canvas p-6">
    <span className="text-[14px] leading-[1.43] font-semibold tracking-[-0.224px] text-ink-muted-48 uppercase">
      {label}
    </span>
    <span className="font-display text-[34px] leading-[1.47] font-semibold tracking-[-0.374px] text-ink">
      {value}
    </span>
    <span className="text-[14px] leading-[1.43] tracking-[-0.224px] text-ink-muted-80">
      {sub}
    </span>
  </div>
);

export default StatPill;
