/* eslint-disable react/prop-types */
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect } from "react";

const CameraControl = ({ position = { x: 0, y: 1, z: 5 }, fov = 85 }) => {
  const { camera } = useThree();

  useEffect(() => {
    // Set the camera position dynamically based on the provided props
    camera.position.set(position.x, position.y, position.z);
    camera.lookAt(new THREE.Vector3(0, 0, 0)); // Look at the center of the scene

    // Optional: Adjust the field of view (fov) dynamically
    camera.fov = fov;
    camera.updateProjectionMatrix(); // Update the projection matrix after changes
  }, [camera, position, fov]);

  return null;
};

export default CameraControl;
