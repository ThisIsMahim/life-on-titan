/* eslint-disable no-unused-vars */
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import RippleButton from "./Shared/RippleButton";
import Robot from "./Shared/Robot";
import CameraControl from "./Shared/CameraControl";
import Light from "./Shared/Light";
import Background from "./Shared/Background";
// import { OrbitControls } from "@react-three/drei";
import useSpeechSynthesis from "./Shared/useSpeechSynthesis";
import Typewriter from "typewriter-effect";
import PhotoCard from "./Shared/PhotoCard";
import BackgroundVDO from "./Shared/BackgroundVDO";
import Titan from "./Shared/Titan";

const TestPage = () => {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [animateRobot, setAnimateRobot] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);
  const [robotPose, setRobotPose] = useState("pose 1 - presentation");
  const [showContinueText, setShowContinueText] = useState(false);
  const { speak, selectedVoice } = useSpeechSynthesis();
  const [photoCardShow, setPhotoCardShow] = useState(false);
  const dialogues = [
    {
      text: "",
      pose: "",
    },
    {
      text: "Join me in this exciting journey to discover if Titan can truly be the key to humanity’s future.",
      pose: "pose 4 - warm welcome",
    },
    {
      text: " Let’s explore the possibilities together!",
      pose: "pose 1 - presentation",
    },

  ];

  //  The speech and Dialougue handling commands
  useEffect(() => {
    if (selectedVoice) {
      speak(dialogues[0].text);
    }
  }, [selectedVoice]);

  const handleDialogueClick = () => {
    setTimeout(() => {
      setShowContinueText(false);
      setDialogueIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % dialogues.length;

        // Update robot pose
        setRobotPose(dialogues[newIndex].pose);

        // Speak the new dialogue
        speak(dialogues[newIndex].text);

        // Check if PhotoCard should be shown
        if (dialogues[newIndex].showPhotoCard) {
          setPhotoCardShow(true);
        } else {
          setPhotoCardShow(false);
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
      onClick={handleDialogueClick}
    >
      <Canvas>
        <Suspense fallback={null}>
          {/* // Background component for setting the background texture with a dark overlay */}
          <BackgroundVDO videoPath="./assets/videos/bg-vdo-1.mp4" />
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
        className="absolute lg:bottom-36 bottom-32 justify-center items-center w-full lg:h-40 rounded-lg text-white font-lato text-3xl cursor-pointer flex"
        onClick={handleDialogueClick}
      >
        <div className="glass-dialogue-box h-full flex items-center flex-col">
          <Typewriter
            key={dialogueIndex}
            onInit={(typewriter) => {
              typewriter
                .typeString(dialogues[dialogueIndex].text)
                .start()
                .callFunction(() => {
                  setShowContinueText(true);
                });
            }}
            options={{
              autoStart: true,
              delay: 50,
              cursor: "",
              deleteSpeed: Infinity,
            }}
          />

          {/* Blinking Continue Text */}
          {showContinueText && (
            <h2 className="mt-4 text-[16px] text-center font-lato text-white animate-pulse">
              Click to continue...
            </h2>
          )}
        </div>
      </div>
      <div className="fixed w-full bottom-0 flex justify-between px-10 hidden">
        <RippleButton navigateTo="/page5">Previous</RippleButton>
        <RippleButton navigateTo="/page6" onClick={handleExit}>
          Next
        </RippleButton>
      </div>
    </div>
 
  );
};

export default TestPage;
