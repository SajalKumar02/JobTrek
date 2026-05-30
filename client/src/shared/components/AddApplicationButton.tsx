import { useJobs } from '../../features/jobs/hooks/useJobs';

const AddApplicationButton = () => {
  const { setShowCreateModal } = useJobs();
  return (
    <button
      className="my-auto text-sm font-semibold rounded px-5 py-2 shadow transition border border-gray-400 bg-white text-black cursor-pointer hover:bg-gray-100 hover:border-black hover:shadow-md"
      onClick={() => setShowCreateModal()}
    >
      + Add application
    </button>
  );
};

export default AddApplicationButton;
