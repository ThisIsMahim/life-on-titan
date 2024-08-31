/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import RippleButton from "./Shared/RippleButton";
import Robot from "./Shared/Robot";
import CameraControl from "./Shared/CameraControl";
import Light from "./Shared/Light";
import { useSpeechSynthesis } from "./Shared/useSpeechSynthesis";
import Background from "./Shared/Background";
import Typewriter from 'typewriter-effect';

const Page1 = () => {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [animateRobot, setAnimateRobot] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);
  const [robotPose, setRobotPose] = useState("pose 3 - hello");
  const [showContinueText, setShowContinueText] = useState(false);
  const { speak, selectedVoice } = useSpeechSynthesis();
  console.log(showContinueText)
  const dialogues = [
    "Greetings, Earthling! I am Chiko, your guide to the wonders of Titan.",
    "I was designed to explore this icy moon and uncover the secrets of life beyond Earth.",
    "Welcome to Titan, a world where life finds a way through chemosynthesis, not sunlight.",
    "As the face of this mission, I'm here to show you how life can thrive in the most unexpected places.",
    "On Titan, life doesn’t rely on the sun. Instead, it harnesses energy from chemical reactions deep below the icy surface.",
    "Together, we'll discover the unique ecosystems of Titan, where methane rivers flow and icy mountains touch the sky.",
    "Get ready for an adventure like no other, as we explore Titan’s mysteries and learn how life adapts in a world so different from our own.",
  ];

  const poses = [
    "pose 3 - hello", // Pose for the initial dialogue
    "pose 1 - presentation",
    "pose 4 - warm welcome",
    "pose 2 - omfg",
    "pose 5 - sit sad",
    "pose 6 - presentation flipped",
    "pose 4 - warm welcome",
  ];

  // The speech and dialogue handling commands
  useEffect(() => {
    if (selectedVoice) {
      speak(dialogues[0]);
    }
  }, [selectedVoice]);

  const handleDialogueClick = () => {
    setShowContinueText(false); // Hide continue text when new dialogue starts
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

  // Handle Exit button
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
          <Background texturePath={"/assets/img/titan-scenery-3.jpg"} />
          <WaterComponent />
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
        className="absolute lg:bottom-36 bottom-32 flex flex-col justify-center items-center w-full lg:h-40 rounded-lg text-white font-lato text-3xl cursor-pointer"
        onClick={handleDialogueClick}
      >
        <div className="glass-dialogue-box h-full flex flex-col items-center">
          <h1 className="w-auto text-center">
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
          </h1>
          {/* Blinking Continue Text */}
        {showContinueText && (
          <h2 className="mt-4 text-[16px] text-center font-lato text-red-600 animate-pulse">
            Click to continue...
          </h2>
        )}
        </div>
        
      </div>
      {/* Buttons */}
      <div className="fixed w-full bottom-0 flex justify-between px-10">
        <RippleButton navigateTo="/">Previous</RippleButton>
        <RippleButton navigateTo="/page2" onClick={handleExit}>
          Next
        </RippleButton>
      </div>
    </div>
  );
};

// Water component for the water effect
const WaterComponent = () => {
  const { scene } = useThree();
  const waterRef = useRef();
  const [waterFilled, setWaterFilled] = useState(false);

  useFrame(() => {
    if (waterRef.current) {
      if (!waterFilled && waterRef.current.position.y < 0) {
        waterRef.current.position.y += 1; // Adjust speed as needed
      } else {
        setWaterFilled(true);
      }
    }
  });

  useEffect(() => {
    const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
    const water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load(
        "https://threejs.org/examples/textures/waternormals.jpg",
        (texture) => {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        }
      ),
      sunDirection: new THREE.Vector3(),
      sunColor: 0x00ff00,
      waterColor: 0x001e0f,
      distortionScale: 0.2,
    });
    water.rotation.x = -Math.PI / 2;
    water.position.y = -100; // Start below the screen
    scene.add(water);

    waterRef.current = water;
    return () => {
      scene.remove(water);
    };
  }, [scene]);

  return null;
};

export default Page1;
