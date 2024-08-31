/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import Planet from "./Planet";
import "./Home.css";
import gsap from "gsap";
import backgroundMusicFile from "/assets/sounds/space-bg-1.mp3";
import AudioControl from "../Shared/AudioControl";

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
      tl.fromTo(
        ".bottom-text",
        {opacity: 0 }, // Start off-screen to the right
        {opacity: 1, duration: 1.5, ease: "power2.out" },
        "-=1" // Overlap the second animation with the first
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

      {/* Show after Interaction */}
      {hasInteracted && (<> 
        {/* mute button */}
        <AudioControl audioRef={audioRef}/>

      <div className="fixed z-10 text-center bottom-5 bottom-text">
        <h2 className="font-vt text-white text-3xl ">Click on the planet continue exploring</h2>
      </div>
      
      {/* Team Info Card */}
      <div className="hidden z-10 shining-border font-lato text-center team-card-container lg:block fixed top-1/2 left-5 transform -translate-y-1/2 cursor-pointer">
        <div className="glassmorphism-card floating-card">
          <h2 className="text-3xl team-title font-vt text-white">ASL-ASTRO VOYAGERS</h2>
          <div className="mt-3 2xl:mt-6">
            <p className="mb-2 font-vt text-left  text-3xl 2xl:mb-4 2xl:text-4xl">1.Mahim</p>
            <p className="mb-2 font-vt text-center  text-3xl 2xl:mb-4 2xl:text-4xl">2.Shazid</p>
            <p className="mb-2 font-vt text-right text-3xl 2xl:mb-4 2xl:text-4xl">3.Tasnia</p>
            <p className="mb-2 font-vt text-center text-3xl 2xl:mb-4 2xl:text-4xl">4.Shafi</p>
            <p className="mb-2 font-vt text-left  text-3xl 2xl:mb-4 2xl:text-4xl">5.Ajoy</p>
          </div>
        </div>
      </div>

      {/* Titan Info Card */}
      <div className="hidden z-10 shining-border font-lato text-center titan-card-container lg:block fixed top-1/2 right-5 transform -translate-y-1/2 cursor-pointer">
        <div className="glassmorphism-card floating-card">
          <h2 className="text-3xl titan-title font-vt text-white">Titan</h2>
          <p className="font-vt text-lg titan-description">
            <strong>Radius:</strong> 2,574 km<br />
            <strong>Weight:</strong> 1.345 × 10<sup>23</sup> kg<br />
            <strong>Atmosphere:</strong> Nitrogen and Methane<br />
            <strong>Distance from Saturn:</strong> 1,222,000 km<br />
            <strong>Distance from Sun:</strong> 1.4 billion km<br />
          </p>
        </div>
      </div>
      </>
        
      )}
      

      {/* Planet */}
      <Planet/>

    </div>
  );
};

export default Home;
