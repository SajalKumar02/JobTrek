import { Trash2 } from 'lucide-react';

const PipelineFooter = () => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center space-x-2 border border-red-300 bg-red-50 text-red-500 px-3 py-1 rounded-md text-xs opacity-70 hover:opacity-100 transition-opacity">
        <Trash2 className="w-4 h-4" />
        <span>Drag here to delete</span>
      </div>
      <span className="text-gray-500 text-xs px-3 py-1 rounded-md bg-gray-50 border border-gray-200">
        Drag cards between columns to update status
      </span>
    </div>
  );
};

export default PipelineFooter;
