import { User } from 'lucide-react';

const ProfileCard = () => {
  return (
    <div className="dashboard-card p-4 flex flex-col gap-3">
      <div className="text-gray-700 flex items-center gap-2">
        <User className="w-5 h-5 inline-block mt-0.5" />
        <span className="font-medium text-sm text-gray-900">Profile</span>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-linear-to-br from-indigo-400 to-violet-600 text-2xl font-semibold text-white">
            A
          </div>
          <div className="flex flex-col my-auto">
            <span className="font-medium text-base text-gray-900">admin</span>
            <span className="text-sm text-gray-700">admin@flow.com</span>
          </div>
        </div>
        <button className="border border-gray-500 rounded px-4 py-1 bg-[#f7f7f7] hover:bg-[#e5e5e5] text-gray-900 text-sm transition-colors my-auto">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
