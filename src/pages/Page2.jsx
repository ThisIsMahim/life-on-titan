/* eslint-disable no-unused-vars */
// ATMOSPHERE
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

const Page2 = () => {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [animateRobot, setAnimateRobot] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);
  const [robotPose, setRobotPose] = useState("pose 1 - presentation");
  const [showContinueText, setShowContinueText] = useState(false);
  const { speak, selectedVoice } = useSpeechSynthesis();
  const dialogues = [
    "Now, let's talk about Titan's atmosphere.", // Initial dialogue
    "Titan's atmosphere is incredibly dense—about 1.5 times thicker than Earth's, making it the only moon with a significant atmosphere.",
    "The atmosphere is primarily composed of nitrogen, making up about 95%, with methane and hydrogen filling most of the rest.",
    "The surface pressure on Titan is 1.5 times that of Earth, which is equivalent to the pressure found 15 meters underwater on Earth.",
    "The temperature on Titan's surface is extremely cold, averaging around -179.2°C, or -290.5°F, cold enough to keep methane and ethane in liquid form.",
    "Titan also experiences a methane cycle similar to Earth's water cycle, with methane clouds, rain, and even seasonal weather patterns.",
  ];

  const poses = [
    // Pose for the initial dialogue
    "pose 1 - presentation",
    "pose 3 - hello",
    "pose 2 - omfg",
    "pose 4 - warm welcome",
    "pose 5 - sit sad",
    "pose 6 - presentation flipped",
  ];


  //  The speech and Dialougue handling commands
  useEffect(() => {
    if (selectedVoice) {
      speak(dialogues[0]);
    }
  }, [selectedVoice]);

  const handleDialogueClick = () => {
  // Hide the "Click to continue..." text immediately when clicking
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
          <Background texturePath="/assets/img/page2-bg.jpg" />
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
                .callFunction(() => {
                  setShowContinueText(false);
                })
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
        <RippleButton navigateTo="/page1">Previous</RippleButton>
        <RippleButton navigateTo="/page3" onClick={handleExit}>
          Next
        </RippleButton>
      </div>
    </div>
  );
};

export default Page2;
