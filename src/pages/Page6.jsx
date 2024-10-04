import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import RippleButton from "./Shared/RippleButton";
import Robot from "./Shared/Robot";
import CameraControl from "./Shared/CameraControl";
import Light from "./Shared/Light";
import Background from "./Shared/Background";
import Typewriter from "typewriter-effect";
import useSpeechSynthesis from "./Shared/useSpeechSynthesis";

const Page6 = () => {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showContinueText, setShowContinueText] = useState(false);
  const { speak, selectedVoice } = useSpeechSynthesis();
  const [selectedPose, setSelectedPose] = useState(
    "pose 6 - presentation flipped"
  );
  const dialogues = [
    { text: "Here's a video that explains Chemosynthesis:" },
    { text: "Methane and Sulfide bubble up through earth's crust.." },
    { text: "the bacteria then releases energy that powers Chemosynthesis" },
    {
      text: "organisms around then eats these bacteria or provide them shelter to gain energy from them.",
    },
  ];

  // Trigger speech only when the dialogueIndex changes, not on component mount
  useEffect(() => {
    if (selectedVoice) {
      speak(dialogues[dialogueIndex].text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogueIndex, selectedVoice]);

  // Handle dialogue transitions
  const handleDialogueClick = () => {
    setTimeout(() => {
      setShowContinueText(false);
      if (dialogueIndex < dialogues.length - 1) {
        setDialogueIndex(dialogueIndex + 1);
      } else setDialogueIndex(0);
    }, 500);
  };

    // Detect screen size and set the pose for mobile devices
    useEffect(() => {
      const updatePose = () => {
        if (window.innerWidth > 768) {
          setSelectedPose("pose 6 - presentation flipped");
        } else {
          setSelectedPose("pose 4 - warm welcome");
        }
      };
  
      // Check when component mounts
      updatePose();
  
      // Add a resize listener to handle screen resizing
      window.addEventListener("resize", updatePose);
  
      return () => {
        window.removeEventListener("resize", updatePose); 
      };
    }, []);
  

  return (
    <div
      className="relative overflow-hidden"
      style={{ width: "100vw", height: "100vh", position: "relative" }}
    >
      {/* Three.js Canvas */}
      <Canvas className="absolute inset-0 w-full h-full">
        <Background texturePath="/assets/img/chemo-scene-0.jpg" />
        <Suspense fallback={null}>
          <Robot pose={selectedPose} animateIn={true} animateOut={false}  />
          <Light />
          <CameraControl />
        </Suspense>
      </Canvas>

      <div className="absolute inset-0 flex items-center justify-center text-center text-white">
        <div className="relative flex flex-col justify-center items-center w-full h-[50vh] max-w-[1200px] rounded-xl shadow-2xl">
          <h1 className="lg:text-7xl text-6xl leading-none font-bold font-vt mb-6 z-20">
            Chemosynthesis on Earth
          </h1>
          <div className="flex items-center lg:flex-row-reverse flex-col-reverse h-full w-full">
            <video
              className="lg:w-[80%] z-10 h-full object-contain lg:hover:scale-150 transition-all duration-500 rounded-lg p-5 backdrop-blur-md bg-transparent bg-opacity-10"
              src="./assets/videos/Chemosynthesis-explained.mp4"
              autoPlay
              loop
              muted
            />

            {/* Robot adjusted for better layout */}
            <div className="relative z-10 lg:w-[20%] h-max lg:h-full mb-5 ">
              <Canvas>
                <Suspense fallback={null}>
                  <Robot animateIn={true} animateOut={false} />
                  <Light />
                  <CameraControl position={{ x: 0, y: 0, z: 4 }}/>
                </Suspense>
              </Canvas>
            </div>
          </div>

          {/* Dialogue Box */}
          <div
            className="flex justify-center items-center w-full rounded-lg text-white font-lato text-2xl cursor-pointer backdrop-blur-sm bg-white/10 hover:border transition-all border-white/20 p-4 mt-10 z-10"
            onClick={handleDialogueClick}
          >
            <div className="flex items-center font-tr flex-col">
              <Typewriter
                key={dialogueIndex}
                onInit={(typewriter) => {
                  typewriter
                    .typeString(dialogues[dialogueIndex].text)
                    .start()
                    .callFunction(() => setShowContinueText(true));
                }}
                options={{
                  autoStart: true,
                  delay: 50,
                  cursor: "..",
                  deleteSpeed: Infinity,
                }}
              />
              {showContinueText && (
                <h2 className="mt-4 text-[16px] text-center font-lato text-white animate-pulse">
                  Click to continue...
                </h2>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="fixed w-full bottom-0 flex justify-between px-10 z-20">
        <RippleButton navigateTo="/page5">Previous</RippleButton>
        <RippleButton navigateTo="/page7">Next</RippleButton>
      </div>
    </div>
  );
};

export default Page6;
