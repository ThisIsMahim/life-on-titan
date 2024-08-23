import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water";
import { TextureLoader } from "three";
import gsap from "gsap";
import RippleButton from "./Shared/RippleButton";

const Page1 = () => {
  const mountRef = useRef(null);
  const [factIndex, setFactIndex] = useState(0);

  const facts = [
    "",
    "Welcome to our planet Titan, where 95% of the air is nitrogen and 5% is methane.",
    "Titan is the only moon known to have a dense atmosphere.",
    "Titan's surface is covered with rivers and lakes of liquid methane and ethane.",
  ];

  useEffect(() => {
    if (!mountRef.current) return; // Guard clause to ensure mountRef.current is valid

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Set background atmosphere
    const backgroundTexture = new THREE.TextureLoader().load(
      "src/assets/img/titan-scenery-3.jpg"
    );
    scene.background = backgroundTexture;

    // Add a dark overlay
    const darkOverlay = new THREE.Mesh(
      new THREE.PlaneGeometry(10000, 10000), // Same size as the background
      new THREE.MeshBasicMaterial({
        color: 0x000000, // Black color for the overlay
        transparent: true,
        opacity: 0.5, // Adjust opacity to control darkness
      })
    );
    darkOverlay.position.z = -99; // Position it in front of the background
    scene.add(darkOverlay);

    // Create water plane
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
      distortionScale: 9.7,
    });
    water.rotation.x = -Math.PI / 2;
    water.position.y = -100; // Start below the screen
    scene.add(water);

    // Camera initial position
    camera.position.set(0, 50, 200);

    // Load textures for the robot
    const textureLoader = new TextureLoader();
    const mainTexture = textureLoader.load(
      "src/assets/texture/robot-texture.jpg"
    );
    const normalMap = textureLoader.load("src/assets/texture/robot-normal.png");
    const roughnessMap = textureLoader.load(
      "src/assets/texture/robot-roughness.jpg"
    );
    const metalnessMap = textureLoader.load(
      "src/assets/texture/robot-metal.jpg"
    );
    const aoMap = textureLoader.load("src/assets/texture/robot-ao.jpg");

    // Add a Floating sphere to the scene
    const geometry = new THREE.CapsuleGeometry(25, 60, 10, 10);

    const material = new THREE.MeshPhysicalMaterial({
      map: mainTexture,
      normalMap: normalMap,
      roughnessMap: roughnessMap,
      aoMap: aoMap,
      metalnessMap: metalnessMap,
      metalness: 0.9,
      roughness: 0.2,
      clearcoat: 1.0, // Adds a clear coat layer
      clearcoatRoughness: 0.1, // Roughness of the clear coat
      sheen: 0.5, // Adds a sheen for a soft, fabric-like effect
    });

    // Optional: Adjust emissive or other properties
    material.emissive = new THREE.Color(0x111111); // Add some emissive glow
    material.emissiveIntensity = 0.05;
    const capsule = new THREE.Mesh(geometry, material);
    capsule.position.set(-190, 50, 0);
    scene.add(capsule);
    // Make the capsule float in air (steadily going up and down) using GSAP animation
    gsap.fromTo(  
      capsule.position,
      { y: 50, delay: 2.1 },
      { y: 55, duration: 2, yoyo: true, repeat: -1, ease: "power2.inOut" }
    );

    gsap.fromTo(
      capsule.position,
      { x: -350 },
      { x: -170, duration: 2, ease: "power2.inOut" }
    );

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(100, 100, 100).normalize();
    scene.add(directionalLight);

    let waterFilled = false;

    // Animate scene
    const animate = () => {
      requestAnimationFrame(animate);

      if (water.position.y < 0 && !waterFilled) {
        water.position.y += 1; // Water rises to fill the screen
      } else {
        waterFilled = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
        scene.clear();
      }
    };
  }, []);

  // Handle fact display
  const speakFact = (fact) => {
    const synth = window.speechSynthesis;

    // Stop any ongoing speech
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
          speakFact(facts[newIndex]); // Speak the new fact
        }
        return newIndex;
      });
    }, 500);
  };

  useEffect(() => {
    // Speak the initial fact
    speakFact(facts[factIndex]);
  }, [factIndex]);

  return (
    <div
      ref={mountRef}
      style={{ width: "100vw", height: "100vh", position: "relative" }}
      onClick={handleFactClick}
    >
      <div className="absolute top-1/2 left-1/2 text-white font-lato text-3xl  ">
        {facts[factIndex]}
      </div>
      <div className="fixed w-full bottom-0 flex justify-between px-10">
        <RippleButton navigateTo="/">Previous</RippleButton>
        <RippleButton navigateTo="/page2">Next</RippleButton>
      </div>
    </div>
  );
};

export default Page1;
