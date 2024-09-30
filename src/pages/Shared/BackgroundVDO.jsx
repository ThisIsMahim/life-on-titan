/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

const BackgroundVDO = ({ videoPath }) => {
  const { scene } = useThree();
  const videoRef = useRef(null); // Reference for the video element

  useEffect(() => {
    // Create a video element programmatically
    const video = document.createElement('video');
    video.src = videoPath;
    video.loop = true;
    video.muted = true;
    video.play();

    // Create a VideoTexture from the video element
    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBFormat;

    // Apply video as scene background
    scene.background = videoTexture;

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
      // Cleanup the background and overlay on unmount
      scene.background = null;
      scene.remove(darkOverlay);
    };
  }, [scene, videoPath]);

  return null;
};

export default BackgroundVDO;
