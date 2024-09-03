import { Outlet, useLocation } from "react-router-dom";
import BackgroundMusic from "./BackgroundMusic";

const MainLayout = () => {
  const location = useLocation();
  
  // Define routes where you do NOT want the music to play (e.g., Home)
  const noMusicRoutes = ['/', '/Home'];
  
  // Check if the current route is one of the routes where music should not play
  const showMusic = !noMusicRoutes.includes(location.pathname);

  return (
    <div className="relative">
      {showMusic && <BackgroundMusic />}  {/* Conditionally render BackgroundMusic */}
      <Outlet />
    </div>
  );
};

export default MainLayout;
