import { createHashRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/Shared/NotFound";
import Page1 from "../pages/Page1";
import Page2 from "../pages/Page2";
import Page3 from "../pages/Page3";
import Page4 from "../pages/Page4";
import Page5 from "../pages/Page5";

const router = createHashRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        path:"/",
        element: <Home />,
      },
      {
        path: "page1", 
        element: <Page1 />,
      },
      {
        path: "page2", 
        element: <Page2 />,
      },
      {
        path: "page3", 
        element: <Page3 />,
      },
      {
        path: "page4", 
        element: <Page4 />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
