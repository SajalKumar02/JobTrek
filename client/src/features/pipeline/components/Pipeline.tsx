import { useState } from 'react';

import { useJobs } from '../../jobs/hooks/useJobs';
import { useToast } from '../../toast/hooks/useToast';

import JobDragDropProvider from '../../JobDragDropProvider/components/JobDragDropProvider';

import PipelineColumn from './PipelineColumn';
import DeleteJobModal from '../../jobs/modals/DeleteJobModal';

import { statusOptions } from '../../jobs/types/contants';

const Pipeline = () => {
  const { deleteJob, switchJobStatus } = useJobs();
  const { showToast } = useToast();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSwitch = async (sourceId, targetId) => {
    try {
      const data = await switchJobStatus(sourceId, targetId);
      if (!data) return;
      showToast('success', data.message);
    } catch (error) {
      showToast('error', error.message || error.response.data.message);
    }
  };

  const handleDelete = async (sourceId) => {
    try {
      const data = await deleteJob(sourceId);
      showToast('success', data.message);
    } catch (error) {
      showToast('error', error.response.data.message);
    }
  };

  const handleDragEvent = (event) => {
    setShowDeleteModal(false);
    if (!event.operation.target) return;
    else if (event.operation.target && event.operation.target.id === 'delete') {
      handleDelete(event.operation.source.id);
    } else if (event.operation.target.id !== event.operation.source.id) {
      handleSwitch(event.operation.source.id, event.operation.target.id);
    }
  };

  return (
    <JobDragDropProvider onDragEnd={handleDragEvent} onDragStart={() => setShowDeleteModal(true)}>
      <div className="grid overflow-auto">
        <div className="flex gap-2">
          {statusOptions.map((status) => (
            <PipelineColumn key={status.value} title={status.label} />
          ))}
        </div>
      </div>
      <DeleteJobModal showDeleteModal={showDeleteModal} />
    </JobDragDropProvider>
  );
};

export default Pipeline;
