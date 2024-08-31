import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.jsx";
import { SpeedInsights } from '@vercel/speed-insights/react';

const App = () => (
  <SpeedInsights>
    <RouterProvider router={router} />
  </SpeedInsights>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
  