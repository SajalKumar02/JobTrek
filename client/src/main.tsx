import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import Home from "./Screens/Home.tsx";
import Dashboard from "./Screens/Dashboard.tsx";
import Settings from "./Screens/Settings.tsx";
import Registration from "./Screens/Registration.tsx";
import Jobs from "./Screens/Jobs.tsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Registration />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/jobs/",
    element: <Jobs />,
    children: [
      {
        path: "job/:jobid",
        element: <p>This is job child component</p>,
      },
    ],
  },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
