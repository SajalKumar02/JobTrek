import PipelineColumn from './PipelineColumn';

const Pipeline = ({ jobs }) => {
  return (
    <div className="flex w-full gap-4 py-4 bg-gray-50">
      <PipelineColumn title="Wishlist" count={3} jobs={jobs} />
      <PipelineColumn title="Applied" count={0} jobs={[]} />
      <PipelineColumn title="OA" count={0} jobs={[]} />
      <PipelineColumn title="Interview" count={0} jobs={[]} />
      <PipelineColumn title="Offer" count={0} jobs={[]} />
      <PipelineColumn title="Rejected" count={0} jobs={[]} />
    </div>
  );
};

export default Pipeline;
