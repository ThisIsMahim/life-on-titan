/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import RippleButton from "./Shared/RippleButton";
import Robot from "./Shared/robot";

const Page1 = () => {
  const [factIndex, setFactIndex] = useState(0);
  
  const [animateRobot, setAnimateRobot] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);
  const handleExit=()=>{
    setAnimateOut(true);
  }
  const facts = [
    "",
    "Welcome to our planet Titan, where 95% of the air is nitrogen and 5% is methane.",
    "Titan is the only moon known to have a dense atmosphere.",
    "Titan's surface is covered with rivers and lakes of liquid methane and ethane.",
  ];

  const speakFact = (fact) => {
    const synth = window.speechSynthesis;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(fact);
    utterance.voice = synth.getVoices()[2]; // Choose a voice if needed
    synth.speak(utterance);
  };

  const handleFactClick = () => {
    setTimeout(() => {
      setFactIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % facts.length;
        if (newIndex !== prevIndex) {
          speakFact(facts[newIndex]);
          setAnimateRobot(true); // Trigger robot animation
        }
        return newIndex;
      });
    }, 500);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas>
        <Suspense fallback={null}>
          <Background />
          <WaterComponent />
          <Robot  animateIn={animateRobot} animateOut={animateOut} onClick={handleFactClick} />
          <Light />
          <CameraControl/>
          <OrbitControls />
        </Suspense>
      </Canvas>
      <div className="absolute top-1/2 left-1/2 text-white font-lato text-3xl">
        {facts[factIndex]}
      </div>

      <div className="fixed w-full bottom-0 flex justify-between px-10">
        <RippleButton navigateTo="/">Previous</RippleButton>
        <RippleButton navigateTo="/page2" onClick={handleExit}>Next</RippleButton>
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

const CameraControl = () => {
  const { camera } = useThree();
  
  useEffect(() => {
    // Set the camera position
    camera.position.set(0, 1, 5); // Example position: x, y, z
    camera.lookAt(new THREE.Vector3(0, 0, 0)); // Look at the center of the scene

    // Optional: Adjust camera settings if needed
    camera.fov = 85; // Field of view
    camera.updateProjectionMatrix(); // Update the projection matrix after changes
  }, [camera]);

  return null;
};

// Light component to handle lighting
const Light = () => {
  const lightRef = useRef();

  useEffect(() => {
    if (lightRef.current) {
      lightRef.current.position.set(50, 100, 50); // Adjust position for better lighting
      lightRef.current.intensity = 5.5; // Adjust intensity for better lighting
      lightRef.current.castShadow = true;
    }
  }, []);

  return <directionalLight ref={lightRef} />;
};

export default Page1;
