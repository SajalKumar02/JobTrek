import { useContext } from 'react';

import { ToastContext } from './provider';

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
