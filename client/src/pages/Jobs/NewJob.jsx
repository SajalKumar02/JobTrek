import { useEffect, useState } from 'react';

import { initialJobState, JobForm, useJobs } from '@/features/jobs';
import { useToast } from '@/features/toast';

import { newJobInputMethodOptions } from '@/features/ai/constants';

import AIAutofillForm from '@/features/ai/AIAutofillForm';

const NewJob = () => {
  const [jobForm, setJobForm] = useState({ ...initialJobState });

  const { createJob } = useJobs();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState(0);

  const handleSetActiveTab = (value) => setActiveTab(value);

  const handleSubmitNewJobForm = async (form) => {
    try {
      const response = await createJob(form);
      showToast('success', response.message);
    } catch (error) {
      showToast('error', error.response?.data?.message || error.message);
    }
  };

  const handleAIResponse = async (incomingAIFromData) => {
    console.log(incomingAIFromData);
    setJobForm((prev) => ({
      ...prev,
      ...Object.fromEntries(
        Object.entries(incomingAIFromData).map(([key, value]) => [
          key,
          value === null ? prev[key] : value,
        ])
      ),
    }));
  };

  return (
    <div className="p-3">
      <div className="grid grid-cols-2 sticky justify-around border-b border-gray-200">
        {newJobInputMethodOptions.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => handleSetActiveTab(id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors
              ${
                activeTab === id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-row justify-center p-3">
        {activeTab === 0 && (
          <JobForm
            initialJobState={jobForm}
            isEditableProp={false}
            onSubmit={handleSubmitNewJobForm}
            buttonTitle="Create New Job"
          />
        )}
        {activeTab === 1 && (
          <AIAutofillForm
            handleAIResponse={handleAIResponse}
            handleSetActiveTab={handleSetActiveTab}
          />
        )}
      </div>
    </div>
  );
};

export default NewJob;
