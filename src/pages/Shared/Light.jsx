import { useEffect,useRef } from "react";
const Light = () => {
    const lightRef = useRef();
  
    useEffect(() => {
      if (lightRef.current) {
        lightRef.current.position.set(50, 100, 50); // Adjust position for better lighting
        lightRef.current.intensity = 6.5; // Adjust intensity for better lighting
        lightRef.current.castShadow = true;
      }
    }, []);
  
    return <directionalLight ref={lightRef} />;
  };
  export default Light;