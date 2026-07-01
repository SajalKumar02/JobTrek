import ReactDOM from 'react-dom/client';
import '@/index.css';

import AppProvider from '@/app/provider/AppProvider';
import App from '@/app/app';

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <AppProvider>
    <App />
  </AppProvider>,
);
