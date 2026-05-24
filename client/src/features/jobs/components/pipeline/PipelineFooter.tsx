import { Info, Trash2 } from 'lucide-react';
import { useDroppable } from '@dnd-kit/react';

function Droppable({ id, children }) {
  const { ref } = useDroppable({
    id,
  });

  return <div ref={ref}>{children}</div>;
}

const PipelineFooter = () => {
  return (
    <div className="flex justify-between mt-2">
      <Droppable id="delete">
        <div className="flex items-center space-x-2 border border-red-300 bg-red-50 text-red-500 px-3 py-1 rounded-md text-xs opacity-70 hover:opacity-100 transition-opacity">
          <Trash2 className="w-4 h-4" />
          <span>Drag here to delete</span>
        </div>
      </Droppable>
      <span className="flex items-center w-full text-xs px-3 py-2 rounded-md bg-[#22304a] border border-[#294067] text-[#bcd0ea]">
        <Info className="w-4 h-4 mr-2 text-[#7ea7ce]" />
        Drag cards between columns to update status or use the grip handle to
        reorder
      </span>
    </div>
  );
};

export default PipelineFooter;
