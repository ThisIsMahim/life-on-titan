import React, { Suspense ,useEffect,useRef} from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Robot from "./Shared/robot";
import RippleButton from "./Shared/RippleButton";
const Light = () => {
  const lightRef = useRef();

  useEffect(() => {
    if (lightRef.current) {
      lightRef.current.position.set(5, 10, 10);
      lightRef.current.intensity = 5.0;
      lightRef.current.castShadow = true;
    }
  }, []);

  return <directionalLight ref={lightRef} />;
};

const Page2 = () => {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight/>
          <Light />
          <Robot />
          <OrbitControls />
        </Suspense>
      </Canvas>
      <div className="fixed w-full bottom-0 flex justify-between px-10">
        <RippleButton navigateTo="/">Previous</RippleButton>
        <RippleButton navigateTo="/page2">Next</RippleButton>
      </div>
    </div>
  );
};

export default Page2;
