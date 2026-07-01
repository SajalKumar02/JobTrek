import AuthProvider from '@/features/auth/context/provider';
import { ToastContainer } from '@/features/toast';
import { ToastProvider } from '@/features/toast';

const AppProvider = ({ children }) => {
  return (
    <ToastProvider>
      <AuthProvider>
        {children}
        <ToastContainer />
      </AuthProvider>
    </ToastProvider>
  );
};

export default AppProvider;
