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
import Typewriter from "typewriter-effect";
import PhotoCard from "./Shared/PhotoCard";

const Page4 = () => {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [animateRobot, setAnimateRobot] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);
  const [photoCardShow,setPhotoCardShow] = useState(false);
  const [robotPose, setRobotPose] = useState("pose 1 - presentation");
  const [showContinueText, setShowContinueText] = useState(false);
  const { speak, selectedVoice } = useSpeechSynthesis();
  const dialogues = [
    {
      text: "Beneath Titan's icy crust, there might be an entire ocean waiting to be discovered.",
      pose: "pose 1 - presentation",
      showPhotoCard: true,
      photoPath: "./assets/img/page4/hidden-1.webp",
      photoCardPlace: "",
    },
    {
      text: "NASA's Cassini spacecraft used radar measurements of Titan's rotation to detect the ocean.",
      pose: "pose 2 - omfg",
      showPhotoCard: true,
      photoPath: "./assets/img/cassini-huygens.jpg", // Replace with the correct image path
      photoCardPlace: "right",
    },
    {
      text: "The ocean is located about 100 kilometers beneath the moon's icy crust.",
      pose: "pose 3 - hello",
      showPhotoCard: true,
      photoPath: "./assets/img/page4/sub-surface.jpg",
      photoCardPlace: "",
    },
    {
      text: "The ocean is likely made up of liquid water mixed with ammonia and salts, which keeps it in a liquid state despite the frigid temperatures.",
      pose: "pose 6 - presentation flipped",
      showPhotoCard: true,
      photoPath: "./assets/img/page4/inside-ocean.png", // Replace with the correct image path
      photoCardPlace: "right",
    },
    {
      text: "Life as we know it might adapt to thrive in this hidden ocean, perhaps near hydrothermal vents that could provide the necessary heat and nutrients.",
      pose: "pose 4 - warm welcome",
      showPhotoCard: true,
      photoPath: "./assets/img/page4/hydrothermal-vents.jpeg", // Replace with the correct image path
      photoCardPlace: "left",
    },
    {
      text: "These vents could be similar to those found deep in Earth's oceans, where life exists without sunlight.",
      pose: "pose 5 - sit sad",
      showPhotoCard: false,
      photoPath: "",
      photoCardPlace: "",
    },
    {
      text: "Imagine an ecosystem where chemical energy, rather than sunlight, fuels life—microbial communities thriving in complete darkness.",
      pose: "pose 1 - presentation",
      showPhotoCard: true,
      photoPath: "./assets/img/page4/chemosynthesis.jpeg", // Replace with the correct image path
      photoCardPlace: "left",
    },
    {
      text: "So, let's dive deep beneath Titan's surface and explore the possibilities of life in this alien ocean.",
      pose: "pose 4 - warm welcome",
      showPhotoCard: false,
      photoPath: "",
      photoCardPlace: "",
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
      <PhotoCard
            path={dialogues[dialogueIndex].photoPath}
            isShown={photoCardShow}
            placement={dialogues[dialogueIndex].photoCardPlace}
          />
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
