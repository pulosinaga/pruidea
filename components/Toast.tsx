
import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Hilang otomatis setelah 3 detik

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColors = {
      success: 'bg-emerald-600',
      error: 'bg-rose-600',
      info: 'bg-sky-600'
  };

  return (
    <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[60] flex items-center shadow-2xl rounded-full px-6 py-3 text-white ${bgColors[type]} animate-bounce-short`}>
        {type === 'success' && (
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        )}
        {type === 'error' && (
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        )}
        <span className="font-medium text-sm">{message}</span>
    </div>
  );
};

export default Toast;
