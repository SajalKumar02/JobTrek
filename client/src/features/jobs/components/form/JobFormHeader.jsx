import { Briefcase, Sparkles } from 'lucide-react';
import { useMatch } from 'react-router';

const JobFormHeader = () => {
  const isCreateMode = useMatch('/jobs/new');

  if (isCreateMode) {
    return (
      <>
        <div className="flex items-center justify-between border-b border-slate-100 bg-linear-to-r from-indigo-600 to-indigo-500 px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-white">
              <Sparkles className="h-4.5 w-4.5" />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-white">Add a New Job</h2>
              <p className="text-xs text-indigo-100">Track it from wishlist to offer</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex items-center justify-between border-b border-slate-100 bg-linear-to-r from-indigo-600 to-indigo-500 px-6 py-5">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-white">
          <Briefcase className="h-4.5 w-4.5" />
        </span>
        <div>
          <h2 className="text-lg font-semibold text-white">Job Details</h2>
          <p className="text-xs text-indigo-100">View and edit this application</p>
        </div>
      </div>
    </div>
  );
};

export default JobFormHeader;
