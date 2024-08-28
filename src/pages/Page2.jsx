/* eslint-disable no-unused-vars */
// ATMOSPHERE
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import RippleButton from "./Shared/RippleButton";
import Robot from "./Shared/robot";
import CameraControl from "./Shared/CameraControl";
import Light from "./Shared/Light";
import Background from "./Shared/Background";
// import { OrbitControls } from "@react-three/drei";

const Page2 = () => {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [animateRobot, setAnimateRobot] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);
  const [robotPose, setRobotPose] = useState("pose 1 - presentation");
  const [selectedVoice, setSelectedVoice] = useState(null);
  const dialogues = [
    "Now, let's talk about Titan's atmosphere.", // Initial dialogue
    "Titan's atmosphere is incredibly dense—about 1.5 times thicker than Earth's, making it the only moon with a significant atmosphere.",
    "The atmosphere is primarily composed of nitrogen, making up about 95%, with methane and hydrogen filling most of the rest.",
    "The surface pressure on Titan is 1.5 times that of Earth, which is equivalent to the pressure found 15 meters underwater on Earth.",
    "The temperature on Titan's surface is extremely cold, averaging around -179.2°C, or -290.5°F, cold enough to keep methane and ethane in liquid form.",
    "Titan also experiences a methane cycle similar to Earth's water cycle, with methane clouds, rain, and even seasonal weather patterns."
  ];
  
  
  const poses = [
    "pose 3 - hello", // Pose for the initial dialogue
    "pose 1 - presentation",
    "pose 2 - omfg",
    "pose 4 - warm welcome",
    "pose 5 - sit sad",
    "pose 6 - presentation flipped"
  ];

  useEffect(() => {
    const synth = window.speechSynthesis;

    const setVoice = () => {
      const voices = synth.getVoices();
      console.log(voices);
      if (voices.length > 5) {
        setSelectedVoice(voices[5]); // Set the desired voice, make sure the index is correct
        speakDialogue(dialogues[0]); // Speak the initial dialogue after voices are set
      }
    };

    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = setVoice; // Attach the event listener for voiceschanged
    } else {
      // If onvoiceschanged is not supported, fallback to using the available voices immediately
      setVoice();
    }

    return () => {
      synth.onvoiceschanged = null; // Cleanup the event listener on component unmount
    };
  }, [dialogues]);

  const speakDialogue = (dialogue) => {
    const synth = window.speechSynthesis;
    synth.cancel();
    if (selectedVoice) {
      const utterance = new SpeechSynthesisUtterance(dialogue);
      utterance.voice = selectedVoice; // Use the stored selected voice
      synth.speak(utterance);
    }
  };

  const handleDialogueClick = () => {
    setTimeout(() => {
      setDialogueIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % dialogues.length;
        setRobotPose(poses[newIndex]); // Update the robot pose based on the dialogue index
        if (newIndex !== prevIndex) {
          speakDialogue(dialogues[newIndex]);
          setAnimateRobot(true); // Trigger robot animation
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
        <Background texturePath="src/assets/img/page2-bg.jpg" />
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
        <div className="glass-dialogue-box h-full flex items-center">
          <h1 className="w-auto text-center">{dialogues[dialogueIndex]}</h1>
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
