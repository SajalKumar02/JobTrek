import { Bell, Palette } from 'lucide-react';

import ProfileCard from '@/pages/Settings/components/ProfileCard';
import SettingCardHeader from '@/pages/Settings/components/SettingCardHeader';

const ToggleButton = ({ buttonTitle, buttonSubtitle, checked }) => {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div>
        <div className="font-medium text-sm text-neutral-900">{buttonTitle}</div>
        <div className="text-xs text-gray-500">{buttonSubtitle}</div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" value={checked} />
        <div className="w-10 h-6 bg-[#e0e0de] peer-focus:outline-none rounded-full peer peer-checked:bg-[#7F7F75] transition-colors"></div>
        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-neutral-900 rounded-full shadow-md transition-transform peer-checked:translate-x-4"></div>
      </label>
    </div>
  );
};

const Settings = () => {
  return (
    <div className="grid grid-rows-[auto_4fr] gap-2 px-4 pb-4">
      {/*  */}
      <div className="">
        <span className="text-gray-500">Manage your account and preferences</span>
      </div>
      {/*  */}
      <div className="flex flex-col gap-4">
        {/* ProfileCard */}
        <ProfileCard />

        <div className="text-lg font-semibold text-neutral-900">Experimental Features</div>

        {/* App Appearence Card */}
        <div className="setting-card overflow-hidden text-neutral-900">
          <SettingCardHeader title="Appearence" icon={Palette} />
          <ToggleButton buttonTitle="Dark Mode" buttonSubtitle="Switch to dark theme" checked={true} />
        </div>

        {/* Notifications Card */}
        <div className="setting-card">
          <SettingCardHeader title="Notifications" icon={Bell} />
          <ToggleButton buttonTitle="Email Notifications" buttonSubtitle="Get notified about upcoming deadlines" checked={true} />
        </div>
      </div>
    </div>
  );
};

export default Settings;
