/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState,useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import { useWindowSize } from "react-use";
import Robot from "./Shared/Robot";
import Light from "./Shared/Light";
import CameraControl from "./Shared/CameraControl";
import RippleButton from "./Shared/RippleButton";

gsap.registerPlugin(ScrollTrigger);

const Button = ({ children, onClick, className = "", variant = "primary" }) => {
  const baseClass = "px-4 py-2 rounded-md transition-colors duration-300";
  const variantClasses = {
    primary: "bg-cyan-500 hover:bg-cyan-600 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    circular: "bg-cyan-500 hover:bg-cyan-600 text-white rounded-full",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const Progress = ({ value, className = "" }) => (
  <div className={`w-full bg-gray-200 rounded-full h-2.5 ${className}`}>
    <div
      className="bg-cyan-500 h-2.5 rounded-full transition-all duration-300 ease-in-out"
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

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
    <CameraControl />
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
    bgImage: "/assets/img/chemo-scene-5.jpg",
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
    bgImage: "/assets/img/chemo-scene-2.jpg",
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
    bgImage: "/assets/img/chemo-scene-1.jpg",
  },
];

const AnimatedSection = React.forwardRef(
  ({ title, content, points, bgImage, alignLeft }, ref) => (
    <section
      ref={ref}
      className={`section snap-center min-h-screen w-screen flex flex-col justify-center items-center text-white relative`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-10 filter blur-sm"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <motion.div
        className={`max-w-2xl w-full mx-auto flex flex-col gap-4 z-10 p-5 ${
          alignLeft ? "items-start text-left" : "items-end text-right"
        }`}
        initial={{ opacity: 0, x: alignLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h2 className="text-3xl sm:text-5xl font-bold mb-6">{title}</h2>
        <p className="font-sans text-lg sm:text-xl mb-6 leading-relaxed">
          {content}
        </p>
        <motion.div
          className="bg-white w-full bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 sm:p-8 shadow-lg"
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "backOut" }}
        >
          <h3 className="text-2xl sm:text-3xl font-semibold mb-4">
            Key Points:
          </h3>
          <ul className="font-sans list-disc list-inside space-y-2 text-base sm:text-xl">
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

const GlassDialogueBox = ({ onContinue }) => {
  return (
    <motion.div
      style={{
        backgroundImage: "url('/assets/img/chemo-intro.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        
      }}
      className="transform -translate-x-1/2 h-screen w-screen sm:p-6 shadow-lg z-0 snap-start relative flex flex-col justify-center items-center"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border rounded-xl p-8 max-w-2xl w-full">
        <div className="">
          <h1 className="text-3xl sm:text-5xl font-bold text-center font-sans text-white mb-6">
            Now let's learn about chemosynthesis
          </h1>
          <p className="text-lg sm:text-xl text-center text-white mb-8">
            Embark on a journey to discover the fascinating world of
            chemosynthesis and its importance in deep-sea ecosystems.
          </p>
        </div>

        <Button
          onClick={onContinue}
          className="w-full py-3 text-lg font-semibold"
        >
          Start Learning
        </Button>
      </div>
    </motion.div>
  );
};

const FloatingActionButton = ({ onClick, icon, label }) => (
  <Button
    onClick={onClick}
    className="fixed bottom-20 right-8 w-14 h-14 flex items-center justify-center shadow-lg z-50"
    variant="circular"
    aria-label={label}
  >
    {icon}
  </Button>
);

export default function Page5() {
  const [robotPose, setRobotPose] = useState("pose 4 - warm welcome");
  const [robotVisible, setRobotVisible] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [showGlossary, setShowGlossary] = useState(false);
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const { width } = useWindowSize();
  const isMobile = width <= 640;
  // Scroll event listener for horizontal scrolling
  useEffect(() => {
    const container = containerRef.current;
    let isScrolling = false;
    let startX;
    let scrollLeft;

    const handleWheel = (event) => {
      event.preventDefault();
      container.scrollLeft += event.deltaY;
    };

    const handleTouchStart = (event) => {
      isScrolling = true;
      startX = event.touches[0].pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const handleTouchMove = (event) => {
      if (!isScrolling) return;
      event.preventDefault();
      const x = event.touches[0].pageX - container.offsetLeft;
      const walk = (x - startX) * 2; // Adjust this for sensitivity
      container.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
      isScrolling = false;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    sectionsRef.current.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: "left center",
        end: "right center",
        horizontal: true,
        scrub: true,
        onEnter: () => {
          setCurrentSection(index);
          setRobotPose(`pose ${index + 1}`);
        },
        onEnterBack: () => {
          setCurrentSection(index);
          setRobotPose(`pose ${index + 1}`);
        },
      });
    });

    gsap.to(".scroll-indicator", {
      x: 10,
      duration: 1.5,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });

    return () => {
      clearTimeout(refreshTimeout);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleContinue = () => {
    containerRef.current.scrollTo({
      left: containerRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  const glossaryTerms = useMemo(
    () => [
      {
        term: "Chemosynthesis",
        definition:
          "A process by which certain organisms produce energy from chemical reactions rather than sunlight.",
      },
      {
        term: "Hydrothermal Vent",
        definition:
          "A fissure in the planet's surface from which geothermally heated water issues.",
      },
      {
        term: "Extremophile",
        definition:
          "An organism that thrives in physically or geochemically extreme conditions.",
      },
    ],
    []
  );

  return (
    <div
      ref={containerRef}
      className="overflow-x-scroll overflow-y-hidden w-full h-screen scroll-smooth"
      style={{ scrollSnapType: "x mandatory" }}
    >
      <main className="flex flex-row w-[400vw] min-h-screen snap-x snap-mandatory relative">
        <GlassDialogueBox  onContinue={handleContinue} />
        <Scene
          robotPose={robotPose}
          robotPosition={isMobile ? [0, -1, 0] : [0, 0, 0]}
          robotVisible={robotVisible}
        />

        {sectionsData.map((section, index) => (
          <AnimatedSection
            key={index}
            ref={(el) => (sectionsRef.current[index] = el)}
            {...section}
            alignLeft={index % 2 === 0}
          />
        ))}

        <div className="fixed w-full bottom-0 z-20 flex justify-between px-10">
          <RippleButton navigateTo="/page4">Previous</RippleButton>
          <RippleButton navigateTo="/page6">Next</RippleButton>
        </div>

        <FloatingActionButton
          onClick={() => setShowGlossary(!showGlossary)}
          icon={<span className="text-2xl">?</span>}
          label="Toggle Glossary"
        />

        <AnimatePresence>
          {showGlossary && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-36 right-8 w-72 text-black bg-opacity-80 bg-white rounded-lg shadow-lg p-4 z-50"
            >
              <h3 className="text-xl font-bold mb-2">Glossary</h3>
              <ul className="space-y-2">
                {glossaryTerms.map((item, index) => (
                  <li key={index}>
                    <span className="font-semibold">{item.term}:</span>{" "}
                    {item.definition}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <Progress
            value={(currentSection / (sectionsData.length - 1)) * 100}
            className="w-64 scroll-indicator"
          />
        </div>
      </main>
    </div>
  );
}
