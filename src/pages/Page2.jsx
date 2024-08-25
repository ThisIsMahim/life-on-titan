/* eslint-disable no-unused-vars */
import React, { Suspense ,useEffect,useRef} from "react";
import { Canvas } from "@react-three/fiber";
import Robot from "./Shared/robot";
import RippleButton from "./Shared/RippleButton";
import Light from "./Shared/Light";
import CameraControl from "./Shared/CameraControl";

const Page2 = () => {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas>
        <Suspense fallback={null}>
          <Light />
          <Robot />
          <CameraControl />
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
