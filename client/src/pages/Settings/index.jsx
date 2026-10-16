import { Bell, Palette } from 'lucide-react';

import ProfileCard from '@/pages/Settings/components/ProfileCard';
import SettingCardHeader from '@/pages/Settings/components/SettingCardHeader';

const ToggleButton = ({ buttonTitle, buttonSubtitle, checked }) => {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex flex-col gap-0.5">
        <span className="text-[17px] leading-[1.24] font-semibold tracking-[-0.374px] text-ink">
          {buttonTitle}
        </span>
        <span className="text-[14px] leading-[1.43] tracking-[-0.224px] text-ink-muted-48">
          {buttonSubtitle}
        </span>
      </div>
      <label className="relative flex min-w-[48px] cursor-pointer items-center select-none">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          readOnly
          tabIndex={-1}
        />
        <div
          className="
            h-6 w-10
            rounded-full
            bg-surface-chip
            transition-colors
            duration-200
            peer-checked:bg-primary
            peer-focus:outline-none
            peer-focus-visible:outline-2 peer-focus-visible:outline-primary-focus
          "
        />
        <div
          className="
            pointer-events-none
            absolute top-0.5 left-0.5
            h-5 w-5
            transform
            rounded-full
            border border-hairline
            bg-canvas
            transition-transform
            duration-200
            peer-checked:translate-x-4
          "
        />
      </label>
    </div>
  );
};

const Settings = () => {
  return (
    <section className="flex min-h-screen w-full flex-col items-center bg-canvas-parchment px-6 py-10">
      <div className="mb-8 w-full max-w-2xl">
        <h2 className="font-display text-[28px] leading-[1.14] font-normal tracking-[0.196px] text-ink">
          Settings
        </h2>
        <p className="mt-1 text-[17px] leading-[1.47] tracking-[-0.374px] text-ink-muted-48">
          Manage your account and preferences
        </p>
      </div>

      <div className="flex w-full max-w-2xl flex-col gap-8">
        <ProfileCard />

        <div>
          <h3 className="pt-2 text-[21px] leading-[1.19] font-semibold tracking-[0.231px] text-ink">
            Experimental Features
          </h3>
        </div>

        <div className="setting-card flex w-full flex-col">
          <SettingCardHeader title="Appearance" icon={Palette} />
          <hr className="border-hairline" />
          <ToggleButton
            buttonTitle="Dark Mode"
            buttonSubtitle="Switch to dark theme"
            checked={true}
          />
        </div>

        <div className="setting-card flex w-full flex-col">
          <SettingCardHeader title="Notifications" icon={Bell} />
          <hr className="border-hairline" />
          <ToggleButton
            buttonTitle="Email Notifications"
            buttonSubtitle="Get notified about upcoming deadlines"
            checked={true}
          />
        </div>
      </div>
    </section>
  );
};

export default Settings;
