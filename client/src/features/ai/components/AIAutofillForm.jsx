import { useState } from 'react';
import { Sparkles, WandSparkles, FileText } from 'lucide-react';

import { useToast } from '@/features/toast';
import AIServices from '@/features/ai/services';

const AnalyzingLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 m-auto h-10 w-10 animate-pulse rounded-full bg-primary/20" />
        <div className="absolute inset-0 animate-spin [animation-duration:1.7s]">
          <span className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-primary" />
        </div>
        <div className="absolute inset-0 animate-spin [animation-duration:2.6s] [animation-direction:reverse]">
          <span className="absolute top-1/2 -right-1 h-2 w-2 -translate-y-1/2 rounded-full bg-primary/40" />
        </div>
        <div className="absolute inset-0 rounded-full border-[2.5px] border-divider-soft" />
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-[17px] leading-[1.47] font-semibold tracking-[-0.374px] text-ink">
          Parsing job description…
        </span>
        <span className="text-[14px] leading-[1.43] tracking-[-0.224px] text-ink-muted-48">
          Extracting skills, red flags &amp; fit score
        </span>
      </div>
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
        handleAIResponse(response.aiJsonResponse);
        handleSetActiveTab(0);
      }
    } catch (error) {
      showToast('error', error.message || 'Failed to parse job description');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-card w-full max-w-xl">
      <div className="mb-6 flex items-center gap-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-primary">
          <WandSparkles className="text-on-primary" size={20} />
        </span>
        <div>
          <h3 className="text-[21px] leading-[1.19] font-semibold tracking-[0.231px] text-ink">
            AI Autofill
          </h3>
          <p className="mt-0.5 text-[14px] leading-[1.43] tracking-[-0.224px] text-ink-muted-48">
            Paste a JD and let AI extract the details
          </p>
        </div>
      </div>

      {isLoading ? (
        <AnalyzingLoader />
      ) : (
        <div className="flex flex-col gap-2">
          <label
            htmlFor="jdText"
            className="flex items-center gap-2 text-[17px] leading-[1.24] font-semibold tracking-[-0.374px] text-ink"
          >
            <FileText size={16} className="text-ink-muted-48" />
            Job Description
          </label>
          <textarea
            id="jdText"
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            rows={8}
            spellCheck={false}
            placeholder="Paste the full job description here..."
            className="resize-none rounded-sm border border-hairline bg-surface-pearl px-4 py-3 text-[17px] leading-[1.47] tracking-[-0.374px] text-ink placeholder:text-ink-muted-48 outline-none transition focus:border-primary focus:bg-canvas focus:outline-none focus-visible:outline-2 focus-visible:outline-primary-focus"
            style={{
              fontFamily: 'inherit',
            }}
          />
        </div>
      )}

      {!isLoading && (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!jdText.trim()}
          className="btn-primary mt-6 w-full"
        >
          <Sparkles size={18} />
          Analyze with AI
        </button>
      )}
    </div>
  );
};

export default AIAutofillForm;
