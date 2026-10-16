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
      const response = await updateUserProfile({ username });
      showToast('success', response.message);
    } catch (error) {
      showToast(
        'warning',
        error.response?.data?.message || 'An unexpected error occurred.'
      );
      setUsername(user.username || '');
    } finally {
      setIsEditable(false);
    }
  };

  return (
    <div className="app-card flex flex-col gap-6">
      <div className="flex items-center gap-2 text-ink">
        <User className="mt-0.5 inline-block h-5 w-5 text-primary" />
        <span className="text-[17px] leading-[1.24] font-semibold tracking-[-0.374px]">
          Profile
        </span>
      </div>
      <div className="flex flex-col justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary">
            <User className="h-8 w-8 text-on-primary" />
          </div>
          <div className="my-auto flex flex-col">
            {isEditable ? (
              <>
                <input
                  className="mb-1 rounded-sm border border-hairline bg-canvas px-3 py-1.5 text-[17px] leading-[1.47] tracking-[-0.374px] text-ink transition focus:border-primary focus:outline-none focus-visible:outline-2 focus-visible:outline-primary-focus"
                  value={username}
                  onChange={(e) => handleUsernameChange(e.target.value)}
                  placeholder="Username"
                  maxLength={32}
                />
                <span className="text-[14px] leading-[1.43] tracking-[-0.224px] text-ink-muted-48">
                  {user.email}
                </span>
              </>
            ) : (
              <>
                <span className="text-[17px] leading-[1.24] font-semibold tracking-[-0.374px] text-ink">
                  {user.username}
                </span>
                <span className="text-[14px] leading-[1.43] tracking-[-0.224px] text-ink-muted-48">
                  {user.email}
                </span>
              </>
            )}
          </div>
        </div>
        <div className="my-auto flex shrink-0 gap-2">
          {isEditable ? (
            <>
              <button className="btn-primary px-4 py-2" onClick={handleSave}>
                Save
              </button>
              <button className="btn-pearl-capsule" onClick={handleCancel}>
                Cancel
              </button>
            </>
          ) : (
            <button
              className="btn-pearl-capsule"
              onClick={() => setIsEditable(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
