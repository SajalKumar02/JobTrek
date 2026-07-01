import { useToast } from '@/features/toast/hooks/useToast';

const ToastContainer = () => {
  const { toasts } = useToast();

  const getToastColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white border-green-700';
      case 'warning':
        return 'bg-yellow-100 text-yellow-900 border-yellow-400';
      case 'deleted':
        return 'bg-red-500 text-white border-red-700';
      case 'updated':
        return 'bg-blue-500 text-white border-blue-700';
      default:
        return 'bg-gray-900 text-white border-gray-700';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.length === 0
        ? null
        : toasts.map((toast, idx) => (
            <div key={toast.id || idx} className={`px-4 py-2 rounded shadow-lg min-w-[240px] max-w-xs border font-medium ${getToastColor(toast.type)}`} role="alert" aria-live="assertive">
              {toast.message}
            </div>
          ))}
    </div>
  );
};

export default ToastContainer;
