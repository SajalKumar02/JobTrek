import { useState } from 'react';
import { Sparkles, WandSparkles, FileText } from 'lucide-react';
import { useToast } from '../toast';
import AIServices from './services';

const AnalyzingLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10">
      <div className="relative h-16 w-16">
        {/* pulsing core */}
        <div className="absolute inset-0 m-auto h-8 w-8 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 shadow-lg shadow-indigo-600/30 animate-pulse" />
        {/* orbiting ring */}
        <div className="absolute inset-0 animate-spin [animation-duration:1.6s]">
          <span className="absolute -top-0.5 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-indigo-500" />
        </div>
        <div className="absolute inset-0 animate-spin [animation-duration:2.4s] [animation-direction:reverse]">
          <span className="absolute top-1/2 -right-0.5 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-blue-400" />
        </div>
        {/* static outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-indigo-100" />
      </div>

      <div className="flex flex-col items-center gap-1">
        <span className="bg-linear-to-r from-slate-800 via-indigo-500 to-slate-800 g-size-[200%_100%] bg-clip-text text-sm font-semibold text-transparent animate-[shimmer_2s_linear_infinite]">
          Parsing job description…
        </span>
        <span className="text-xs text-slate-400">
          Extracting skills, red flags & fit score
        </span>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};

const AIAutofillForm = ({ handleAIResponse, handleSetActiveTab }) => {
  const [jdText, setJdText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await AIServices.jdParser(jdText);

      if (response && response.success) {
        showToast('success', response.message);
        handleAIResponse(response.jsonResponse);
        handleSetActiveTab(0);
      }
    } catch (error) {
      showToast('error', error.message || 'Failed to parse job description');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 shadow-sm shadow-indigo-900/20">
          <WandSparkles className="text-white" size={18} />
        </span>
        <div>
          <h3 className="text-base font-semibold text-slate-800">
            AI Autofill
          </h3>
          <p className="text-xs text-slate-400">
            Paste a JD and let AI extract the details
          </p>
        </div>
      </div>

      {/* Body: textarea or loader */}
      {isLoading ? (
        <AnalyzingLoader />
      ) : (
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="jdText"
            className="flex items-center gap-1.5 text-[13px] font-medium text-slate-700"
          >
            <FileText size={14} className="text-slate-400" />
            Job Description
          </label>
          <textarea
            id="jdText"
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            rows={8}
            placeholder="Paste the full job description here..."
            className="resize-none rounded-lg border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-150 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>
      )}

      {/* Action */}
      {!isLoading && (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!jdText.trim()}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-600/25 transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none cursor-pointer"
        >
          <Sparkles size={16} />
          Analyze with AI
        </button>
      )}
    </div>
  );
};

export default AIAutofillForm;
