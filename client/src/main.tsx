import ReactDOM from 'react-dom/client';
import App from './app/app';
import AuthProvider from './app/providers/AuthProvider';

import './index.css';

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
);
