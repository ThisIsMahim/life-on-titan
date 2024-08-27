/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import Planet from "./Planet";
import "./Home.css";
import gsap from "gsap";
import backgroundMusicFile from "../../assets/sounds/space-bg-1.mp3";

const Home = () => {
  const audioRef = useRef(new Audio(backgroundMusicFile));
  const [hasInteracted, setHasInteracted] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (hasInteracted) {
      audio.volume = 0; // Start with volume 0
      audio.loop = true; // Loop the music
      audio.play().catch((error) => {
        console.error("Audio play failed:", error);
      });

      // Fade in the music
      gsap.to(audio, { volume: 0.5, duration: 2 });

      // Title animation
      gsap.fromTo(
        ".shining-title",
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 2, ease: "power3.out", delay: 0.5 }
      );

      // Left card entrance animation
      gsap.fromTo(
        ".animate-card",
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 1.5, ease: "power3.out", delay: 1 }
      );

      // Right card entrance animation
      gsap.fromTo(
        ".titan-description",
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 1.5, ease: "power3.out", delay: 1.5 }
      );

      // Planet rotation
      gsap.to(".planet", {
        duration: 10,
        rotation: 360,
        repeat: -1,
        ease: "linear",
      });

      // Bottom text animation
      gsap.fromTo(
        ".bottom-text",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 2 }
      );

      return () => {
        // Fade out the music when the component unmounts
        gsap.to(audio, {
          volume: 0,
          duration: 2,
          onComplete: () => {
            audio.pause();
            audio.currentTime = 0;
          },
        });
      };
    }
  }, [hasInteracted]);

  const handleUserInteraction = () => {
    // Smoothly fade out the overlay
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        setHasInteracted(true);
      },
    });
  };

  return (
    <div className="bg-black flex flex-col items-center justify-center h-screen w-full p-0">
      {/* Overlay */}
      {!hasInteracted && (
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-glass flex flex-col items-center justify-center cursor-pointer z-20 backdrop-blur-sm bg-[#4183da29] rounded-lg w-full"
          onClick={handleUserInteraction}
        >
          <div className="text-black text-4xl font-jersey p-6 bg-opacity-90 rounded-lg shining-title">
            Click Here To Start Journey
          </div>
        </div>
      )}

      {/* title */}
      <div className="bg-transparent fixed z-10 top-5">
        <h1 className="font-jersey text-white text-6xl shining-title">Life on Titan</h1>
      </div>


      {/* Planet */}
      <Planet texturePath={"./src/assets/img/titan.jpg"} />

      {/* team card */}
      <div class="floating-card text-white left-10 fixed w-1/5 h-[320px] ml-3 z-10  border-2 border-transparent p-3 rounded-br-[40px] rounded-tl-[40px]
                  hover:border-blue-300 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-green-400 
                  2xl:w-1/5 2xl:h-[420px]  2xl:p-10 max-sm:hidden"
      >
        <div className="animate-card">
          <h1 class="font-vt text-white text-center text-3xl font-bold 2xl:text-4x">ASTRO VOYAGERS</h1>
          <div class="mt-3 2xl:mt-6">
            <p class="mb-2 font-vt  text-3xl 2xl:mb-4 2xl:text-4xl">1.Mahim</p>
            <p class="mb-2 font-vt text-center  text-3xl 2xl:mb-4 2xl:text-4xl">2.Shazid</p>
            <p class="mb-2 font-vt text-right text-3xl 2xl:mb-4 2xl:text-4xl">3.Tasnia</p>
            <p class="mb-2 font-vt text-center text-3xl 2xl:mb-4 2xl:text-4xl">4.Shafi</p>
            <p class="mb-2 font-vt text-left  text-3xl 2xl:mb-4 2xl:text-4xl">5.Ajoy</p>
          </div>
        </div>
          
      </div>
      {/* Titan Card */}
      <div class="floating-card text-white right-10 fixed w-1/5 h-[320px]  mr-3 z-10  border-2 border-transparent p-4 pl-8 rounded-br-[40px] rounded-tl-[40px]
                  hover:border-blue-200 hover:scale-105  duration-300 hover:bg-gray-900 hover:text-green-400 
                  2xl:w-1/5 2xl:h-[420px] 2xl:p-4 2xl:pl-8 max-sm:hidden">
        <div className="titan-description">          
          <h2 className="text-3xl font-vt font-bold text-white text-center 2xl:text-4xl">TITAN</h2>
          <div className="mt-2 font-vt text-xl titan-description flex flex-col gap-1 hover:text-green-400
                          2xl:mt-4 2xl:gap-4 2xl:text-2xl">
            <p ><strong>Radius:</strong> 2,574 km</p>
            <p><strong>Weight:</strong> 1.345 × 10<sup>23</sup> kg</p>
            <p><strong>Atmosphere:</strong> Nitrogen and Methane</p>
            <p><strong>Distance from Saturn:</strong> 1,222,000 km </p>
            <p ><strong>Distance from Sun:</strong> 1.4 billion km </p>
          </div>
        </div>
      </div>
      <div className="text-center floating-card fixed z-10 bottom-16 bottom-text">
        <h2 className="font-vt text-white text-4xl">Click on the planet to explore</h2>
      </div>
    </div>
  );
};

export default Home;
