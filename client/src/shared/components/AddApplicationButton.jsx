import { Plus } from 'lucide-react';

import { useJobs } from '@/features/jobs';

const AddApplicationButton = () => {
  const { setShowCreateModal } = useJobs();

  return (
    <button
      className="flex flex-row px-4 py-2 gap-1 rounded-lg border border-gray-400 hover:bg-gray-100 hover:border-black hover:shadow-md cursor-pointer shadow transition"
      onClick={() => setShowCreateModal()}
    >
      <Plus size={20} />
      <span className="text-sm font-semibold">Add application</span>
    </button>
  );
};

export default AddApplicationButton;
// my-auto rounded px-5 py-2
