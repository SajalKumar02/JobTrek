import { DragDropProvider } from '@dnd-kit/react';

const JobDragDropProvider = ({ children, onDragEnd, onDragStart }) => {
  return (
    <DragDropProvider onDragEnd={onDragEnd} onDragStart={onDragStart}>
      {children}
    </DragDropProvider>
  );
};

export default JobDragDropProvider;
