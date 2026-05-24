import { DragDropProvider } from '@dnd-kit/react';

import StatBar from '../features/jobs/components/StatBar.tsx';
import JobTypesFilterPills from '../features/jobs/components/JobTypesFilterPills.tsx';
import Pipeline from '../features/jobs/components/pipeline/Pipeline.tsx';

import { useJobs } from '../features/jobs/hooks/useJobs.ts';

const Jobs = () => {
  const { deleteJob, switchJobStatus } = useJobs();

  return (
    <div className="grid grid-rows-[105px_30px_auto] gap-2 px-2 pb-4">
      {/* Stat Bar */}
      <StatBar />

      <JobTypesFilterPills />

      {/* Pipeline */}
      <DragDropProvider
        onDragEnd={(event) => {
          if (!event.operation.target) return;
          else if (
            event.operation.target &&
            event.operation.target.id === 'delete'
          ) {
            deleteJob(event.operation.source.id);
          } else if (event.operation.target) {
            switchJobStatus(
              event.operation.source.id,
              event.operation.target.id,
            );
          }
        }}
      >
        <Pipeline />
      </DragDropProvider>
    </div>
  );
};

export default Jobs;
