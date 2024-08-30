/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import RippleButton from "./Shared/RippleButton";
import Robot from "./Shared/robot";
import CameraControl from "./Shared/CameraControl";
import Light from "./Shared/Light";
import { useSpeechSynthesis } from "./Shared/useSpeechSynthesis";
// import { OrbitControls } from "@react-three/drei";

const Page1 = () => {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [animateRobot, setAnimateRobot] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);
  const [robotPose, setRobotPose] = useState("pose 3 - hello");
  const { speak, selectedVoice } = useSpeechSynthesis();

  const dialogues = [
    "Hello there, I am Chiko", // Initial dialogue
    "Welcome to our planet Titan, where 95% of the air is nitrogen and 5% is methane.",
    "Titan is the only moon known to have a dense atmosphere.",
    "Titan's surface is covered with rivers and lakes of liquid methane and ethane.",
  ];

  const poses = [
    "pose 3 - hello", // Pose for the initial dialogue
    "pose 1 - presentation",
    "pose 2 - omfg",
    "pose 4 - warm welcome",
  ];

//  The speech and Dialougue handling commands
  useEffect(() => {
    if (selectedVoice) {
      speak(dialogues[0]);
    }
  }, [selectedVoice]);
 
  const handleDialogueClick = () => {
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
          <Background />
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
        className="absolute lg:bottom-36 bottom-32 flex justify-center items-center w-full lg:h-40 rounded-lg text-white font-lato text-3xl cursor-pointer"
        onClick={handleDialogueClick}
      >
        <div className="glass-dialogue-box h-full flex items-center">
          <h1 className="w-auto text-center">{dialogues[dialogueIndex]}</h1>
        </div>
      </div>
      <div className="fixed w-full bottom-0 flex justify-between px-10">
        <RippleButton navigateTo="/">Previous</RippleButton>
        <RippleButton navigateTo="/page2" onClick={handleExit}>
          Next
        </RippleButton>
      </div>
    </div>
  );
};

// Background component for setting the background texture with a dark overlay
const Background = () => {
  const { scene } = useThree();
  const texture = new THREE.TextureLoader().load(
    "src/assets/img/titan-scenery-3.jpg"
  );

  useEffect(() => {
    scene.background = texture;

    // Add dark overlay
    const darkOverlay = new THREE.Mesh(
      new THREE.PlaneGeometry(10000, 10000),
      new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.5,
      })
    );
    darkOverlay.position.z = -99;
    scene.add(darkOverlay);

    return () => {
      scene.background = null;
      scene.remove(darkOverlay);
    };
  }, [scene, texture]);

  return null;
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
