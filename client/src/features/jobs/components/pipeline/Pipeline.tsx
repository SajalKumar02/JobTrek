import PipelineColumn from './PipelineColumn';
import { statusOptions } from '../../types/contants';
import PipelineFooter from './PipelineFooter';

const Pipeline = () => {
  return (
    <div className="grid grid-rows-[auto_1fr]">
      <div className="flex gap-2 overflow-x-auto">
        {statusOptions.map((status) => (
          <PipelineColumn key={status.value} title={status.label} />
        ))}
      </div>
      <PipelineFooter />
    </div>
  );
};

export default Pipeline;
