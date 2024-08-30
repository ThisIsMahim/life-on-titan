/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { gsap } from "gsap";
import * as THREE from "three";

const Robot = ({ animateIn, animateOut, onClick, pose, animateInDirection, animateOutDirection }) => {
  const group = useRef();
  const { scene, animations } = useGLTF("src/assets/models/robot.gltf");
  const { actions } = useAnimations(animations, group);

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
    const directions = {
      left: { start: { x: -10 }, end: { x: 0 } },
      right: { start: { x: 10 }, end: { x: 0 } },
      up: { start: { y: 10 }, end: { y: 0 } },
      down: { start: { y: -10 }, end: { y: 0 } }
    };

    const animate = (direction, from, to) => {
      gsap.fromTo(group.current.position, 
        from, 
        { ...to, duration: 2, ease: "power3.out" }
      );
    };

    if (group.current) {
      if (animateIn) {
        const direction = animateInDirection || "left";
        animate(direction, directions[direction].start, directions[direction].end);
      }

      if (animateOut) {
        const direction = animateOutDirection || "right";
        animate(direction, directions[direction].end, directions[direction].start);
      }
    }
  }, [animateIn, animateOut, animateInDirection, animateOutDirection]);

  useEffect(() => {
    // Play the appropriate pose animation
    if (actions && pose && actions[pose]) {
      actions[pose].reset().fadeIn(0.5).play();
    }

    // Cleanup: fade out the animation when the component unmounts
    return () => {
      if (actions && pose && actions[pose]) {
        actions[pose].fadeOut(0.5);
      }
    };
  }, [actions, pose]);

  // Floating animation
  useFrame(() => {
    if (group.current) {
      group.current.position.y = Math.sin(Date.now() * 0.001) * 0.5;
    }
  });

  return <primitive ref={group} object={scene} onClick={onClick} />;
};

export default Robot;
