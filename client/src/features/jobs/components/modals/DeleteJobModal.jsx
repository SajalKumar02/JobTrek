import { Trash2 } from 'lucide-react';
import { useDroppable } from '@dnd-kit/react';

function Droppable({ id, children }) {
  const { ref } = useDroppable({
    id,
  });

  return <div ref={ref}>{children}</div>;
}

const DeleteJobModal = ({ showDeleteModal }) => {
  if (!showDeleteModal) {
    return null;
  }

  return (
    <div className="fixed left-1/2 top-8 transform -translate-x-1/2 z-50 flex justify-center w-full pointer-events-none">
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center pointer-events-auto">
        <Droppable id="delete">
          <div className="h-24 min-w-[340px] px-4 border-2 border-dashed border-red-300 rounded-lg flex flex-col gap-2 items-center justify-center bg-red-50 transition-colors hover:bg-red-100">
            <Trash2 className="w-10 h-10 text-red-500" />
            <span className="text-red-400 font-medium">Drop job card here</span>
          </div>
        </Droppable>
      </div>
    </div>
  );
};

export default DeleteJobModal;
