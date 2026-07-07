import { useState } from 'react';

import { User } from 'lucide-react';

import { useAuth } from '@/features/auth';
import { useToast } from '@/features/toast';

const ProfileCard = () => {
  const [isEditable, setIsEditable] = useState(false);
  const { user, updateUserProfile } = useAuth();

  const [username, setUsername] = useState(user?.username || '');

  const { showToast } = useToast();

  const handleUsernameChange = (value) => {
    setUsername(value);
  };

  const handleCancel = () => {
    setUsername(user?.username || '');
    setIsEditable(false);
  };

  const handleSave = async () => {
    try {
      const response = await updateUserProfile({
        username,
      });
      showToast('success', response.message);
    } catch (error) {
      showToast('warning', error.response.data.message || 'An unexpected error occurred.');
      setUsername(user.username || '');
    } finally {
      setIsEditable(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 app-card">
      <div className="text-gray-700 flex items-center gap-2">
        <User className="w-5 h-5 inline-block mt-0.5" />
        <span className="font-medium text-sm text-gray-900">Profile</span>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-linear-to-br from-indigo-400 to-violet-600 text-2xl font-semibold text-white">
            <User className="w-10 h-10 text-white" />
          </div>
          <div className="flex flex-col my-auto">
            {isEditable ? (
              <>
                <input
                  className="font-medium text-base text-gray-900 border p-1 rounded mb-1"
                  value={username}
                  onChange={(e) => handleUsernameChange(e.target.value)}
                  placeholder="Username"
                />
                <span className="text-sm text-gray-700">{user.email}</span>
              </>
            ) : (
              <>
                <span className="font-medium text-base text-gray-900">{user.username}</span>
                <span className="text-sm text-gray-700">{user.email}</span>
              </>
            )}
          </div>
        </div>
        {isEditable ? (
          <div className="flex gap-2 my-auto">
            <button
              className="border border-green-500 rounded px-4 py-1 bg-green-100 hover:bg-green-200 text-green-700 text-sm transition-colors"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="border border-gray-300 rounded px-4 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm transition-colors"
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="border border-gray-500 rounded px-4 py-1 bg-[#f7f7f7] hover:bg-[#e5e5e5] text-gray-900 text-sm transition-colors my-auto"
            onClick={() => setIsEditable(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
