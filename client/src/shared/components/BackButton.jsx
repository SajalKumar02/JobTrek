import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <button
      type="button"
      onClick={handleBack}
      className="mb-4 ml-3 flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </button>
  );
};

export default BackButton;
