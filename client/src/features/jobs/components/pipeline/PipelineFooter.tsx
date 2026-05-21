import { Trash2 } from 'lucide-react';
import { useDroppable } from '@dnd-kit/react';

function Droppable({ id, children }) {
  const { ref } = useDroppable({
    id,
  });

  return <div ref={ref}>{children}</div>;
}

const PipelineFooter = () => {
  return (
    <div className="flex justify-between">
      <Droppable id="delete">
        <div className="flex items-center space-x-2 border border-red-300 bg-red-50 text-red-500 px-3 py-1 rounded-md text-xs opacity-70 hover:opacity-100 transition-opacity">
          <Trash2 className="w-4 h-4" />
          <span>Drag here to delete</span>
        </div>
      </Droppable>
      <span className="text-gray-500 text-xs px-3 py-1 rounded-md bg-gray-50 border border-gray-200">
        Drag cards between columns to update status
      </span>
    </div>
  );
};

export default PipelineFooter;
