import ReactDOM from 'react-dom/client';
import './index.css';

import App from './app/routes';

import ToastContainer from './features/toast/components/ToastContainer';

import ToastProvider from './features/toast/contextProvider/ToastProvider';
import AuthProvider from './features/auth/contextProvider/AuthProvider';

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <ToastProvider>
    <AuthProvider>
      <App />
      <ToastContainer />
    </AuthProvider>
  </ToastProvider>,
);
