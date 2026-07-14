import { useToast } from '../context/ToastContext';

function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="fixed right-4 bottom-4 flex flex-col gap-2 z-50"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className="animate-fade-in-up flex items-center gap-3 bg-white text-gray-800 text-sm font-medium px-4 py-3 rounded-md shadow-lg border border-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-500 shrink-0"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {toast.message}
        </div>
      ))}
    </div>
  );
}

export default ToastContainer;
