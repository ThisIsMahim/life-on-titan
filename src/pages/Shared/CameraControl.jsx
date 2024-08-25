import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect } from "react";
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
  export default CameraControl;