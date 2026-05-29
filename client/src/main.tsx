import ReactDOM from 'react-dom/client';
import App from './app/routes';
import AuthProvider from './app/providers/AuthProvider';

import './index.css';

import ToastContainer from './features/toast/components/ToastContainer';
import ToastProvider from './app/providers/ToastProvider';

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <ToastProvider>
    <AuthProvider>
      <App />
      <ToastContainer />
    </AuthProvider>
  </ToastProvider>,
);
