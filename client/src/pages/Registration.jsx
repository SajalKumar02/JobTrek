import { useAuth } from '../features/auth/hooks/useAuth';
import { useNavigate } from 'react-router';
import { useToast } from '../features/toast/hooks/useToast';
import { useEffect } from 'react';

const Registration = () => {
  const { authenticated, handleAuth } = useAuth();
  const { showToast } = useToast();

  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [authenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = e.target.email.value;
      const password = e.target.password.value;
      const response = await handleAuth({ email, password });

      if (response && response.success) {
        showToast('success', response.message);
      }
    } catch (error) {
      showToast('warning', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-sm flex flex-col gap-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input name="email" type="email" required className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" defaultValue="admin@flow.com" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input type="password" name="password" required className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" defaultValue="password" />
        </div>
        <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default Registration;
