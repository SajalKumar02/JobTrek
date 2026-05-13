import ReactDOM from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import ProtectedRoute from './Layout/ProtectedRoute.tsx';

import Home from './Screens/Home.tsx';
import Dashboard from './Screens/Dashboard.tsx';
import Settings from './Screens/Settings.tsx';
import Registration from './Screens/Registration.tsx';
import Jobs from './Screens/Jobs.tsx';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/register',
    element: <Registration />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/jobs',
        element: <Jobs />,
      },
    ],
  },
]);

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
