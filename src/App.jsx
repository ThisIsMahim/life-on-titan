import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.jsx";
import { SpeedInsights } from '@vercel/speed-insights/react';

const App = () => (
  <SpeedInsights>
    <RouterProvider router={router} />
  </SpeedInsights>
);

export default App;
