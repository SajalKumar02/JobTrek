import { useMemo } from 'react';
import { groupJobsByStatus } from '../../utils/pipeline.utils';
import PipelineColumn from './PipelineColumn';

const Pipeline = ({ jobs }) => {
  const groupedJobs = useMemo(() => groupJobsByStatus(jobs), [jobs]);

  return (
    <div className="grid grid-cols-6 gap-2 py-2 bg-gray-50 overflow-x-auto h-full">
      <PipelineColumn
        title="Wishlist"
        count={groupedJobs.wishlist.length}
        jobs={groupedJobs.wishlist}
      />
      <PipelineColumn
        title="Applied"
        count={groupedJobs.applied.length}
        jobs={groupedJobs.applied}
      />
      <PipelineColumn
        title="OA"
        count={groupedJobs.oa.length}
        jobs={groupedJobs.oa}
      />
      <PipelineColumn
        title="Interview"
        count={groupedJobs.interview.length}
        jobs={groupedJobs.interview}
      />
      <PipelineColumn
        title="Offer"
        count={groupedJobs.offer.length}
        jobs={groupedJobs.offer}
      />
      <PipelineColumn
        title="Rejected"
        count={groupedJobs.rejected.length}
        jobs={groupedJobs.rejected}
      />
    </div>
  );
};

export default Pipeline;
