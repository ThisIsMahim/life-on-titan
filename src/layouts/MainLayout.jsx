import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="relative">
      <Outlet />
    </div>
  );
};

export default MainLayout;
