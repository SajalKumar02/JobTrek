const SettingCardHeader = ({ title, icon: Icon }) => {
  return (
    <div className="flex items-center gap-2 px-4 pb-2 text-neutral-900">
      {Icon && <Icon className="w-5 h-5" />}
      <span className="font-medium text-base">{title}</span>
    </div>
  );
};

export default SettingCardHeader;
