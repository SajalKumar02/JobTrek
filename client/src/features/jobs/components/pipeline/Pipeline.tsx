import PipelineColumn from './PipelineColumn';
import { statusOptions } from '../../types/contants';

const Pipeline = () => {
  return (
    <div className="grid">
      <div className="flex gap-2 overflow-x-auto">
        {statusOptions.map((status) => (
          <PipelineColumn key={status.value} title={status.label} />
        ))}
      </div>
    </div>
  );
};

export default Pipeline;
