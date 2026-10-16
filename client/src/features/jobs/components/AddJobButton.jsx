import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router';

const AddApplicationButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="btn-primary"
      onClick={() => navigate('/jobs/new')}
      type="button"
    >
      <Plus size={18} />
      <span>Add application</span>
    </button>
  );
};

export default AddApplicationButton;
