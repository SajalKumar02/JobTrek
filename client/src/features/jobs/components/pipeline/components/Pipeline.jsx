import { useState } from 'react';

import { useJobs } from '@/features/jobs';
import { useToast } from '@/features/toast';

import JobDragDropProvider from '@/features/dragAndDrop/JobDragDropProvider';

import PipelineColumn from '@/features/jobs/components/pipeline/components/PipelineColumn';
import DeleteJobModal from '@/features/jobs/components/modals/DeleteJobModal';

import { statusOptions } from '@/features/jobs/constants';

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
      <div className="grid overflow-auto scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-200">
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
