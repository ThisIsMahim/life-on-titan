/* eslint-disable no-unused-vars */
// Surface
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import RippleButton from "./Shared/RippleButton";
import Robot from "./Shared/Robot";
import CameraControl from "./Shared/CameraControl";
import Light from "./Shared/Light";
import Background from "./Shared/Background";
// import { OrbitControls } from "@react-three/drei";
import { useSpeechSynthesis } from "./Shared/useSpeechSynthesis";
import Typewriter from 'typewriter-effect';

const Page4 = () => {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [animateRobot, setAnimateRobot] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);
  const [robotPose, setRobotPose] = useState("pose 1 - presentation");
  const [showContinueText, setShowContinueText] = useState(false);
  const { speak, selectedVoice } = useSpeechSynthesis();
  const dialogues = [
   "Beneath Titan's icy crust, there might be an entire ocean waiting to be discovered.",
    "This subsurface ocean could be composed of water mixed with ammonia, which keeps it in a liquid state despite the frigid temperatures.",
    "Life as we know it might adapt to thrive in this hidden ocean, perhaps near hydrothermal vents that could provide the necessary heat and nutrients.",
    "These vents could be similar to those found deep in Earth's oceans, where life exists without sunlight.",
    "Imagine an ecosystem where chemical energy, rather than sunlight, fuels life—microbial communities thriving in complete darkness.",
    "Exploring this ocean could uncover some of the most profound secrets of life beyond Earth.",
    "So, lets dive deep beneath Titans surface and explore the possibilities of life in this alien ocean."
];


  const poses = [
     // Pose for the initial dialogue
    "pose 1 - presentation",
    "pose 3 - hello",
    "pose 2 - omfg",
    "pose 4 - warm welcome",
    "pose 5 - sit sad",
    "pose 6 - presentation flipped",
    "pose 4 - warm welcome",
  ];

 
//  The speech and Dialougue handling commands
useEffect(() => {
  if (selectedVoice) {
    speak(dialogues[0]);
  }
}, [selectedVoice]);

const handleDialogueClick = () => {
  setShowContinueText(false);
  setTimeout(() => {
    setDialogueIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % dialogues.length;
      setRobotPose(poses[newIndex]);
      if (newIndex !== prevIndex) {
        speak(dialogues[newIndex]);
        setAnimateRobot(true);
      }
      return newIndex;
    });
  }, 500);
  
};

  const handleExit = () => {
    setAnimateOut(true);
  };

  return (
    <div
      className="relative"
      style={{ width: "100vw", height: "100vh", position: "relative" }}
    >
      <Canvas>
        <Suspense fallback={null}>
          {/* // Background component for setting the background texture with a dark overlay */}
          <Background texturePath="/assets/img/titan-scenery-4.jpg" />
          <Robot
            animateIn={animateRobot}
            animateOut={animateOut}
            pose={robotPose}
          />
          <Light />
          <CameraControl />
        </Suspense>
      </Canvas>
      {/* Dialogue Box */}
      <div
        className="absolute lg:bottom-36 bottom-32 flex justify-center items-center w-full lg:h-40 rounded-lg text-white font-lato text-3xl cursor-pointer"
        onClick={handleDialogueClick}
      >
        <div className="glass-dialogue-box h-full flex items-center flex-col">
        <Typewriter
             key={dialogueIndex} 
            onInit={(typewriter) => {
              typewriter
                
                .typeString(dialogues[dialogueIndex])
                .start()
                .callFunction(() => {
                  setShowContinueText(true);
                })
                
            }}   
            options={{
              autoStart: true,
              delay: 50,
              cursor: '',
              deleteSpeed: Infinity,
            }}       
          />

          {/* Blinking Continue Text */}
          {showContinueText && (
            <h2 className="mt-4 text-[16px] text-center font-lato text-red-600 animate-pulse">
              Click to continue...
            </h2>
          )}
        </div>
      </div>

      <div className="fixed w-full bottom-0 flex justify-between px-10">
        <RippleButton navigateTo="/page3">Previous</RippleButton>
        <RippleButton navigateTo="/page5" onClick={handleExit}>
          Next
        </RippleButton>
      </div>
    </div>
  );
};

export default Page4;
