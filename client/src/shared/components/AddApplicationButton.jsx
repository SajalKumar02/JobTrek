import { Plus } from 'lucide-react';

import { useJobs } from '@/features/jobs';

const AddApplicationButton = () => {
  const { setShowCreateModal } = useJobs();

  return (
    <button
      className="flex flex-row items-center gap-2 px-4 py-2 rounded-lg border border-slate-400 bg-slate-800 hover:bg-slate-900 text-slate-100 hover:border-slate-600 hover:shadow-md cursor-pointer shadow transition"
      onClick={() => setShowCreateModal()}
      type="button"
    >
      <Plus size={20} />
      <span className="text-sm font-semibold">Add application</span>
    </button>
  );
};

export default AddApplicationButton;
// my-auto rounded px-5 py-2
