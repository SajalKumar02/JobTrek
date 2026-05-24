import { Palette } from 'lucide-react';
import ProfileCard from '../shared/components/ProfileCard';

const Settings = () => {
  return (
    <div className="grid grid-rows-[auto_4fr] gap-2 px-4 pb-4">
      <div className="">
        <span className="text-gray-500">
          Manage your account and preferences
        </span>
      </div>
      <div className="grid grid-rows-5 gap-4">
        {/* ProfileCard */}
        <ProfileCard />

        {/* App Appearence Card */}
        <div className="dashboard-card p-0 overflow-hidden text-[#232321]">
          <div className="flex items-center gap-2 px-4 pt-4 pb-2 text-[#232321]">
            <Palette className="w-5 h-5" />
            <span className="font-medium text-base">Appearance</span>
          </div>
          <div className="">
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <div className="font-medium text-sm text-[#232321]">
                  Dark Mode
                </div>
                <div className="text-xs text-[#727272]">
                  Switch to dark theme
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-10 h-6 bg-[#e0e0de] peer-focus:outline-none rounded-full peer peer-checked:bg-[#7F7F75] transition-colors"></div>
                <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-[#232321] rounded-full shadow-md transition-transform peer-checked:translate-x-4"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Notifications Card */}
        <div className="dashboard-card p-4">Notifications Card</div>
        {/* Data Privacy Card */}
        <div className="dashboard-card p-4">Data Privacy Card</div>
      </div>
    </div>
  );
};

export default Settings;
