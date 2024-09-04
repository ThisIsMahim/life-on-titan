/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import Robot from "./Shared/Robot";
import Light from "./Shared/Light";
import { useWindowSize } from "react-use";
import RippleButton from "./Shared/RippleButton";
import { useSpeechSynthesis } from "./Shared/useSpeechSynthesis";


gsap.registerPlugin(ScrollTrigger);


const Scene = React.memo(({ robotPose, robotPosition, robotVisible }) => (
  <Canvas
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 1,
    }}
  >
    <Light />
    {robotVisible && (
      <group position={robotPosition}>
        <Robot pose={robotPose} animateIn={true} />
      </group>
    )}
  </Canvas>
));
Scene.displayName = "Scene";

const sectionsData = [
  {
    title: "What is Chemosynthesis?",
    content:
      "Chemosynthesis is a process by which certain organisms produce energy from chemical reactions rather than sunlight. Unlike photosynthesis, chemosynthesis does not require light energy to create organic compounds.",
    points: [
      "Uses chemical energy instead of light energy",
      "Common in deep-sea environments",
      "Supports unique ecosystems in extreme conditions",
    ],
    bgImage: "/assets/img/chemo-scene-5.jpg",  // Corrected image path
  },
  {
    title: "Chemosynthesis Process",
    content:
      "The process of chemosynthesis involves organisms using chemical energy to produce carbohydrates from carbon dioxide and water. This is similar to photosynthesis, but instead of using light energy, these organisms use the oxidation of inorganic compounds.",
    points: [
      "Hydrogen sulfide oxidation",
      "Methane oxidation",
      "Iron oxidation",
    ],
    bgImage: "/assets/img/chemo-scene-2.jpg",  // Corrected image path
  },
  {
    title: "Theories About Chemosynthesis",
    content:
      "Various theories suggest that chemosynthesis might have been one of the earliest forms of life on Earth, potentially occurring in deep-sea hydrothermal vents.",
    points: [
      "Origin of life theories",
      "Deep-sea hydrothermal vents",
      "Alternative energy sources for life",
    ],
    bgImage: "/assets/img/chemo-scene-1.jpg",  // Corrected image path
  },
];

const AnimatedSection = React.forwardRef(
  ({ title, content, points, bgImage, alignLeft }, ref) => (
    <section
      ref={ref}
      style={{
        position: 'relative',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      className={`section snap-center min-h-screen w-screen flex flex-col justify-center items-center text-white`}
    >
      <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'blur(4px)',
            zIndex: -1,
          }}
        />

        <motion.div
          className={`max-w-2xl w-full mx-auto flex flex-col gap-4 z-10 ${
            alignLeft ? "items-start text-left" : "items-end text-right"
          }`}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">{title}</h2>
          <p className=" font-poppins text-lg sm:text-xl mb-6 leading-relaxed">{content}</p>
          <motion.div
            className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 sm:p-8 shadow-lg"
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "backOut" }}
          >
            <h3 className="text-2xl sm:text-3xl font-semibold mb-4">
              Key Points:
            </h3>
            <ul className="font-poppins list-disc list-inside space-y-2 text-base sm:text-xl">
              {points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
    </section>
  )
);
AnimatedSection.displayName = "AnimatedSection";



// GlassDialogueBox component
const GlassDialogueBox = () => {

  const { speak } = useSpeechSynthesis();

  useEffect(() => {
    speak({ text: "Now let's learn about chemosynthesis" });
  }, []);

  return (
    <motion.div
    style={{
      backgroundImage: "url('/assets/img/chemo-scene-3.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      zIndex: -1,
    }}

      className="transform -translate-x-1/2 h-screen w-screen sm:p-6 shadow-lg z-0 "
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className=" bg-white bg-opacity-20 rounded-xl p-8">
        <p className="text-xl sm:text-4xl font-semibold text-center font-lato text-white">
          Now let's learn about chemosynthesis
        </p>
      </div>
    </motion.div>
  );
};

export default function Page5() {
  const [robotPose, setRobotPose] = useState("pose 4 - warm welcome");
  const [robotPosition, setRobotPosition] = useState([2, -1, 0]);
  const [robotVisible, setRobotVisible] = useState(true);
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const { width } = useWindowSize();
  const isMobile = width <= 640;

  useEffect(() => {
    const container = containerRef.current;
  
    const handleWheel = (event) => {
      if (event.deltaY !== 0) {
        container.scrollLeft += event.deltaY*.2;
        event.preventDefault(); // Prevent default vertical scroll
      }
    };
  
    container.addEventListener('wheel', handleWheel);
  
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);
  
  useEffect(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        console.log(`Scroll progress: ${self.progress}`);
      },
    });
  }, []);
  
  

  const updateRobotState = (index) => {
    const poseOptions = [
      "pose 6 - presentation flipped",
      "pose 1 - presentation",
      "pose 4 - warm welcome",
      "pose 2 - omfg",
    ];
    setRobotPose(poseOptions[index % poseOptions.length]);
  };

  return (
    <div ref={containerRef} className="overflow-x-scroll overflow-y-hidden w-full h-screen">
  
  <main className="flex flex-row w-[400vw] min-h-screen snap-x">
    {/* Add GlassDialogueBox component */}
    <GlassDialogueBox />
    <Scene
      robotPose={robotPose}
      robotPosition={robotPosition}
      robotVisible={robotVisible}
    />
    {sectionsData.map((section, index) => (
      <AnimatedSection
        key={index}
        ref={(el) => (sectionsRef.current[index] = el)}
        title={section.title}
        content={section.content}
        points={section.points}
        bgImage={section.bgImage}
        alignLeft={1}
        className="w-full" // Ensure sections are full-width
      />
      
    ))}

    {/* Carousel Section */}
    {/* <section
      ref={(el) => (sectionsRef.current[sectionsData.length] = el)}
      className="min-h-screen w-screen flex flex-col justify-center items-center bg-blue-400 text-white"
    >
      <div className="max-w-2xl w-full mx-auto flex flex-col z-10">
        <h2 className="text-3xl sm:text-5xl font-bold mb-6">
          Organisms in Chemosynthetic Environments
        </h2>
        <div className="w-full">
          <div className="carousel w-full">
            <div id="slide1" className="carousel-item relative w-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
                className="w-full"
                alt="Organism 1"
              />
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide4" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide2" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg"
                className="w-full"
                alt="Organism 2"
              />
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide1" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide3" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg"
                className="w-full"
                alt="Organism 3"
              />
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide2" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide4" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
                className="w-full"
                alt="Organism 4"
              />
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide3" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide1" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> */}
  </main>
  <div className="fixed w-full bottom-0 flex justify-between px-10 z-0">
    <RippleButton navigateTo="/page4">Previous</RippleButton>
    <RippleButton navigateTo="/page5">Next</RippleButton>
  </div>
</div>
  );
}
