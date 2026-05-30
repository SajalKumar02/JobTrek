import { useToast } from '../hooks/useToast';

const ToastContainer = () => {
  const { toasts } = useToast();
  return (
    <div className="fixed top-6 left-1/2 z-50 flex flex-col gap-2 -translate-x-1/2 w-full items-center pointer-events-none">
      {toasts.length === 0
        ? null
        : toasts.map((toast, idx) => (
            <div
              key={toast.id || idx}
              className={`px-4 py-2 rounded shadow-lg min-w-[240px] max-w-xs ${
                toast.type === 'success'
                  ? 'bg-green-600 text-white'
                  : toast.type === 'warning'
                    ? 'bg-yellow-500 text-black'
                    : toast.type === 'deleted'
                      ? 'bg-red-600 text-white'
                      : toast.type === 'updated'
                        ? 'bg-blue-600 text-white'
                        : toast.type === 'error'
                          ? 'bg-red-700 text-white'
                          : 'bg-gray-900 text-white'
              }`}
            >
              {toast.message}
            </div>
          ))}
    </div>
  );
};

export default ToastContainer;
