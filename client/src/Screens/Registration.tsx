import http from '../API/api';
import { useNavigate } from 'react-router';

const Registration = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await http.post('/auth', {
        email: e.target.email.value,
        password: e.target.password.value,
      });

      if (response.data && response.data.success) {
        navigate('/dashboard');
      } else {
        alert(
          response.data && response.data.message
            ? response.data.message
            : 'Registration failed. Please try again.',
        );
      }
    } catch (error) {
      alert(
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'An error occurred. Please try again.',
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-sm flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            defaultValue="admin@gmail.com"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            defaultValue="password"
          />
        </div>
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default Registration;
