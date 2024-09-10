/* eslint-disable no-unused-vars */
import { Suspense,useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import RippleButton from "./Shared/RippleButton";
import Robot from "./Shared/Robot";
import CameraControl from "./Shared/CameraControl";
import Light from "./Shared/Light";
import Background from "./Shared/Background";
import Typewriter from 'typewriter-effect';
import useSpeechSynthesis from "./Shared/useSpeechSynthesis";
const Page6 = () => {
  // State to manage dialogue flow
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showContinueText, setShowContinueText] = useState(false);
  const { speak, selectedVoice } = useSpeechSynthesis();
  // Sample dialogue data (you can update this with actual dialogues)
  const dialogues = [
    { text: "Here's a video that explains Chemosynthesis:" },
    { text: "Methane and Sulfide bubble up through earth's crust.." },
    { text: "the bacteria then releases energy that powers Chemosynthesis" },
    { text: "organisms around then eats these bacteria or provide them shelter to gain energy from them." },
  ];

  
  //  The speech and Dialougue handling commands
  useEffect(() => {
    if (selectedVoice) {
      speak(dialogues[0].text);
    }
  }, [selectedVoice]);

  const handleDialogueClick = () => {
    setTimeout(() => {
      setShowContinueText(false);
      setDialogueIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % dialogues.length;
  
        // Update robot pose
        
        // Speak the new dialogue
        speak(dialogues[newIndex].text);
  
        return newIndex;
      });
    }, 500);
  };

  return (
    <div
      className="relative"
      style={{ width: "100vw", height: "100vh", position: "relative" }}
    >
      {/* Three.js Canvas */}
      <Canvas className="w-full h-full">
        {/* Background with texture */}
        <Background texturePath="/assets/img/chemo-scene-1.jpg" />
      </Canvas>

      {/* Video section */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
      

        {/* Video container */}
        <div className="relative flex justify-center items-center w-[80%] max-w-[1000px] h-[600px] bg-transparent rounded-xl shadow-2xl ">
        <h1 className="lg:text-7xl absolute lg:-top-20 md:text-4xl md:-top-5 top-32 text-4xl leading-none font-bold font-vt mb-6">
          Chemosynthesis on Earth
        </h1>
          {/* Video autoplay */}
          <video
            className="w-full h-full object-contain lg:object-cover rounded-md"
            src="./assets/videos/Chemosynthesis-explained.mp4"
            autoPlay
            loop
            muted
          />

          {/* Robot peeking from a corner */}
          <div className="absolute -top-10 -left-40 h-full">
            <Canvas>
              <Suspense fallback={null}>
                <Robot animateIn={true} animateOut={false} />
                <Light />
                <CameraControl />
              </Suspense>
            </Canvas>
          </div>

          {/* Dialogue Box */}
          <div
            className="absolute lg:top-52 lg:-left-40 bottom-0 flex justify-center items-center w-80 h-min rounded-lg text-white font-lato text-2xl cursor-pointer backdrop-blur-sm bg-white/10 hover:border transition-all border-white/20 p-4 "
            onClick={handleDialogueClick}
          >
            <div className="flex items-center flex-col">
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
                  cursor: '',
                  deleteSpeed: Infinity,
                }}
              />

              {/* Blinking Continue Text */}
              {showContinueText && (
                <h2 className="mt-4 text-[16px] text-center font-lato text-white animate-pulse">
                  Click to continue...
                </h2>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Previous and Next buttons */}
      <div className="fixed w-full bottom-0 flex justify-between px-10 z-20">
        <RippleButton navigateTo="/page5">Previous</RippleButton>
        <RippleButton navigateTo="/quizPage">Next</RippleButton>
      </div>
    </div>
  );
};

export default Page6;
