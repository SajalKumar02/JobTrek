import { Trash2 } from 'lucide-react';

const DeleteJobModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Modal overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>
      {/* Modal content */}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6 flex flex-col items-center z-10">
        <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-red-100">
          <Trash2 className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-xl font-semibold mb-2 text-center text-gray-800">
          Drop here to delete
        </h2>
        <p className="text-gray-500 text-center mb-4">
          Drag a job card onto this area to remove it from your list. This
          action can’t be undone.
        </p>
        <div className="w-full h-24 border-2 border-dashed border-red-300 rounded-lg flex items-center justify-center bg-red-50 transition-colors hover:bg-red-100">
          <span className="text-red-400 font-medium">Drop job card here</span>
        </div>
      </div>
    </div>
  );
};

export default DeleteJobModal;
