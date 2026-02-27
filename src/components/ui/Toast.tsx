import { useEffect } from 'react';
import { Toast as ToastType } from '../../types';
import { cn } from '../../lib/utils';

interface Props {
  toast: ToastType;
  onDismiss: (id: string) => void;
}

const typeStyles = {
  success: 'bg-green-50 border-green-200 text-green-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
  warning: 'bg-amber-50 border-amber-200 text-amber-800',
};

export function Toast({ toast, onDismiss }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, toast.duration ?? 3000);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onDismiss]);

  return (
    <div
      className={cn(
        'fixed top-4 right-4 z-50 px-4 py-3 rounded-lg border shadow-lg',
        'animate-bounce-in text-sm font-medium',
        typeStyles[toast.type],
      )}
    >
      {toast.message}
    </div>
  );
}
