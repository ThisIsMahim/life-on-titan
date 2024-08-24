import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useLoader, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { gsap } from "gsap";

const Robot = ({ animateIn, animateOut, onClick }) => {
  const group = useRef();
  const { scene } = useGLTF("src/assets/models/robot.gltf");

  // Load textures
  const baseColorMap = useLoader(THREE.TextureLoader, "src/assets/models/textures/body_baseColor.png");
  const emissiveMap = useLoader(THREE.TextureLoader, "src/assets/models/textures/body_emissive.png");
  const metalnessMap = useLoader(THREE.TextureLoader, "src/assets/models/textures/body_metallicRoughness.png");
  const normalMap = useLoader(THREE.TextureLoader, "src/assets/models/textures/body_normal.png");

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.map = baseColorMap;
        child.material.emissiveMap = emissiveMap;
        child.material.metalnessMap = metalnessMap;
        child.material.normalMap = normalMap;
        child.material.emissive = new THREE.Color(0x111111);
        child.material.emissiveIntensity = 0.5;
        child.material.roughness = 0.5;
        child.material.metalness = 1.0;
      }
    });
  }, [scene, baseColorMap, emissiveMap, metalnessMap, normalMap]);

  // Handle animations
  useEffect(() => {
    if (group.current) {
      if (animateIn) {
        // Animate in from the left
        gsap.fromTo(group.current.position, 
          { x: -10 }, // Adjust this value based on your scene's scale
          { x: 0, duration: 3.5, ease: "power3.out" }
        );
      }

      if (animateOut) {
        // Animate out to the right
        gsap.to(group.current.position, 
          { x: 10, duration: .5, ease: "power3.in" }
        );
      }
    }
  }, [animateIn, animateOut]);

  // Floating animation
  useFrame(() => {
    if (group.current) {
      group.current.position.y = Math.sin(Date.now() * 0.001) * 0.5;
    }
  });

  return <primitive ref={group} object={scene} onClick={onClick} />;
};

export default Robot;
