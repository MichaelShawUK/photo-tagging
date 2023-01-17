import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Leaderboard from "./components/Leaderboard";
import { action as modalAction } from "./components/Modal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    action: modalAction,
  },
  {
    path: "/leaderboard",
    element: <Leaderboard />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
