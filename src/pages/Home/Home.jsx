import Planet from "./Planet";
import "./Home.css"; // Assuming you're adding the CSS in a separate file
import gsap from "gsap";
import { useEffect } from "react";
const Home = () => {
  useEffect(() => {
    const tl = gsap.timeline();

    // Animate the team card from the left side of the screen
    tl.fromTo(
      ".team-card-container", 
      { x: "-100%", opacity: 0 }, // Start off-screen to the left
      { x: "0%", opacity: 1, duration: 1.5, ease: "power2.out" }
    );

    // Animate the Titan card from the right side of the screen
    tl.fromTo(
      ".titan-card-container", 
      { x: "100%", opacity: 0 }, // Start off-screen to the right
      { x: "0%", opacity: 1, duration: 1.5, ease: "power2.out" },
      "-=1" // Overlap the second animation with the first
    );
  }, []);

  return (
    <div className="bg-black flex flex-col items-center justify-center h-screen w-full p-0">
      {/* title */}
      <div className="bg-transparent fixed z-10 top-5">
        <h1 className="font-jersey text-white text-6xl shining-title">Life on Titan</h1>
      </div>
      <div className="fixed z-10 bottom-5">
        <h2 className="font-lato text-white text-xl">Click on the planet to explore</h2>
      </div>
      
      {/* Planet */}
      <Planet texturePath={"./src/assets/img/titan.jpg"} />
      
      {/* Team Info Card */}
      <div className="hidden z-10 shining-border
shining-border font-lato text-center team-card-container lg:block fixed top-1/2 left-5 transform -translate-y-1/2 cursor-pointer">
        <div className="glassmorphism-card floating-card">
          <h2 className="text-3xl team-title font-jersey text-white">ASL-ASTRO VOYAGERS</h2>
          <ul className="font-lato text-xl team-list">
            <li>MAHIM</li>
            <li>SAZID</li>
            <li>SAFI</li>
            <li>TASNIA</li>
            <li>AJOY</li>
          </ul>
        </div>
      </div>
      
      {/* Titan Info Card */}
      <div className="hidden z-10 shining-border
shining-border font-lato text-center titan-card-container lg:block fixed top-1/2 right-5 transform -translate-y-1/2 cursor-pointer">
        <div className="glassmorphism-card floating-card">
          <h2 className="text-3xl titan-title font-jersey text-white">Titan</h2>
          <p className="font-lato text-lg titan-description">
            <strong>Radius:</strong> 2,574 km<br />
            <strong>Weight:</strong> 1.345 × 10<sup>23</sup> kg<br />
            <strong>Atmosphere:</strong> Nitrogen and Methane<br />
            <strong>Distance from Saturn:</strong> 1,222,000 km<br />
            <strong>Distance from Sun:</strong> 1.4 billion km<br />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
