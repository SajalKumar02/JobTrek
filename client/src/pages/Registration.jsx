import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { LineChart } from 'lucide-react';

import { useAuth } from '@/features/auth';
import { useToast } from '@/features/toast';

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
    <div className="flex h-full items-center justify-center bg-slate-100 px-4">
      <form
        className="flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/5"
        onSubmit={handleSubmit}
      >
        <div className="mb-2 flex flex-col items-center gap-3 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-sm shadow-indigo-900/20">
            <LineChart className="text-white" size={22} />
          </span>
          <div>
            <h2 className="text-xl font-semibold text-slate-800">Create your account</h2>
            <p className="mt-0.5 text-sm text-slate-400">Start tracking your job search</p>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-[13px] font-medium text-slate-700">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            className="rounded-lg border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all duration-150 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            defaultValue="admin@test.com"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-[13px] font-medium text-slate-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            className="rounded-lg border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all duration-150 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            defaultValue="password"
          />
        </div>
        <button
          type="submit"
          className="mt-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-600/25 transition-colors hover:bg-indigo-700 cursor-pointer"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Registration;
