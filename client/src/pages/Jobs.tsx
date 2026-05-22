import { DragDropProvider } from '@dnd-kit/react';

import StatBar from '../features/jobs/components/StatBar.tsx';
import JobTypesFilterPills from '../features/jobs/components/JobTypesFilterPills.tsx';
import Pipeline from '../features/jobs/components/pipeline/Pipeline.tsx';

import { useJobs } from '../features/jobs/hooks/useJobs.ts';
import PipelineFooter from '../features/jobs/components/pipeline/PipelineFooter.tsx';
import { Navigate } from 'react-router';

const Jobs = () => {
  const { deleteJob, switchJobStatus } = useJobs();

  return (
    <div className="flex flex-col">
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

        {/* Pipeline Footer */}
        <PipelineFooter />
      </DragDropProvider>
    </div>
  );
};

export default Jobs;
