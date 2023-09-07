import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Today, { loader as todayLoader } from "./pages/Today.jsx";
import Tomorrow, { loader as tomorrowLoader } from "./pages/Tomorrow.jsx";
import Yesterday, { loader as yesterdayLoader } from "./pages/Yesterday.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/today",
    element: <Today />,
    loader: todayLoader,
  },
  {
    path: "/tomorrow",
    element: <Tomorrow />,
    loader: tomorrowLoader,
  },
  {
    path: "/yesterday",
    element: <Yesterday />,
    loader: yesterdayLoader,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
