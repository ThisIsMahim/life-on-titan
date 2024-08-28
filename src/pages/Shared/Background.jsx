import React, { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

const Background = ({ texturePath }) => {
  const { scene } = useThree();
  const texture = new THREE.TextureLoader().load(texturePath);

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

export default Background;
