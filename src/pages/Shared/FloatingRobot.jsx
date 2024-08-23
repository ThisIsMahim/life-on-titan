import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { MeshStandardMaterial } from "three";
import { TextureLoader } from "three";
import gsap from "gsap";

const FloatingRobot = ({ scene }) => {
  const robotRef = useRef(null);

  useEffect(() => {
    // Load textures for the robot
    const textureLoader = new TextureLoader();
    const rustTexture = textureLoader.load("src/assets/textures/rust-texture.jpg");
    const normalMap = textureLoader.load("src/assets/textures/rust-normal.jpg");
    const roughnessMap = textureLoader.load("src/assets/textures/rust-roughness.jpg");

    // Create material with rust texture and emissive properties
    const robotMaterial = new MeshStandardMaterial({
      map: rustTexture,
      normalMap: normalMap,
      roughnessMap: roughnessMap,
      emissive: new THREE.Color(0x222222), // Adjust color for emissive glow
      emissiveIntensity: 0.5, // Adjust intensity of the glow
      metalness: 0.7,
      roughness: 0.8,
    });

    // Create robot mesh
    const robotGeometry = new THREE.SphereGeometry(10, 32, 32);
    const robot = new THREE.Mesh(robotGeometry, robotMaterial);
    robot.position.set(-50, 20, 0); // Position on the left side
    robot.castShadow = true;
    robot.receiveShadow = true;

    // Attach the robot mesh to the robotRef
    robotRef.current = robot;

    // Add robot to the scene
    scene.add(robot);

    // Floating animation using GSAP
    const floatUp = () => {
      gsap.to(robot.position, {
        y: "+=2", // Move up by 2 units
        duration: 3, // Slow down the animation for a smoother effect
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
      });
    };

    floatUp();

    return () => {
      gsap.killTweensOf(robot.position); // Clean up GSAP animation on unmount
      scene.remove(robot); // Remove robot from the scene on cleanup
    };
  }, [scene]);

  return null;
};

export default FloatingRobot;
