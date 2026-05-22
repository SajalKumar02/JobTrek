import PipelineColumn from './PipelineColumn';
import { statusOptions } from '../../types/contants';

const Pipeline = () => {
  // const { jobs } = useJobs();
  // const groupedJobs = useMemo(() => groupJobsByStatus(jobs), [jobs]);

  return (
    <div className="flex gap-2 overflow-x-auto">
      {statusOptions.map((status) => (
        <PipelineColumn key={status.value} title={status.label} />
      ))}
      {/* <PipelineColumn title="Wishlist" jobs={jobs} />
      <PipelineColumn title="Applied" />
      <PipelineColumn title="OA" />
      <PipelineColumn title="Interview" />
      <PipelineColumn title="Offer" />
      <PipelineColumn title="Rejected" /> */}
    </div>
  );
};

export default Pipeline;
