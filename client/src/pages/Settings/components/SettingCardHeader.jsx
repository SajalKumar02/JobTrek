const SettingCardHeader = ({ title, icon: Icon }) => {
  return (
    <div className="flex items-center gap-3 px-6 py-4">
      {Icon && (
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-sm bg-surface-pearl text-primary">
          <Icon className="h-5 w-5" />
        </span>
      )}
      <span className="text-[17px] leading-[1.24] font-semibold tracking-[-0.374px] text-ink">
        {title}
      </span>
    </div>
  );
};

export default SettingCardHeader;
