/* eslint-disable no-unused-vars */
import { useState } from "react";
import Robot from "../Shared/Robot";
import Light from "../Shared/Light";
import Background from "../Shared/Background";
import BackgroundVDO from "../Shared/BackgroundVDO";
import CameraControl from "../Shared/CameraControl";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import RippleButton from "../Shared/RippleButton";
import useSpeechSynthesis from "../Shared/useSpeechSynthesis";
import ConfettiEffect from "./ConfettiEffect";
import FeedbackOverlay from "./FeedbackOverlay";
import QuestionBox from "./QuestionBox";
import ScoreDisplay from "./ScoreDisplay";
import correctSound from "./correct.mp3";
import incorrectSound from "./wrong.mp3";
import FinalScore from "./FinalScore";

const QuizPage = () => {
  const questions = [
    {
      text: "What is the primary energy source for life on Titan?",
      choices: ["Sunlight", "Chemosynthesis", "Photosynthesis", "Nuclear"],
      correctAnswer: "Chemosynthesis",
    },
    {
      text: "What gas is most abundant in Titan's atmosphere?",
      choices: ["Oxygen", "Methane", "Nitrogen", "Carbon Dioxide"],
      correctAnswer: "Nitrogen",
    },
    {
      text: "What spacecraft provided detailed data about Titan?",
      choices: ["Voyager 1", "Cassini", "Galileo", "New Horizons"],
      correctAnswer: "Cassini",
    },
    {
      text: "What liquid is found in large quantities on Titan's surface?",
      choices: ["Water", "Methane", "Ammonia", "Sulfuric Acid"],
      correctAnswer: "Methane",
    },
    {
      text: "What is chemosynthesis?",
      choices: [
        "The process of converting sunlight into energy",
        "The production of energy from chemical reactions",
        "The decomposition of organic material",
        "The process of photosynthesis in extreme environments",
      ],
      correctAnswer: "The production of energy from chemical reactions",
    },
    {
      text: "What element is crucial for life as we know it on Earth?",
      choices: ["Carbon", "Nitrogen", "Oxygen", "Hydrogen"],
      correctAnswer: "Carbon",
    },
    {
      text: "What is the average surface temperature of Titan?",
      choices: ["-179°C", "-100°C", "-50°C", "0°C"],
      correctAnswer: "-179°C",
    },
    {
      text: "What mission is planned to explore Titan's surface in the 2030s?",
      choices: ["Dragonfly", "Mars Rover", "Voyager 3", "Europa Clipper"],
      correctAnswer: "Dragonfly",
    },
    {
      text: "How does life on Earth at hydrothermal vents obtain energy?",
      choices: [
        "Photosynthesis",
        "Chemosynthesis",
        "Respiration",
        "Fermentation",
      ],
      correctAnswer: "Chemosynthesis",
    },
    {
      text: "Which moon of Saturn is considered a prime candidate for extraterrestrial life?",
      choices: ["Enceladus", "Europa", "Titan", "Ganymede"],
      correctAnswer: "Titan",
    },
  ];

  const totalQuestions = 10;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [animateOut, setAnimateOut] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const { speak } = useSpeechSynthesis();
  const [animateRobot, setAnimateRobot] = useState(true);

  const handleExit = () => {
    setAnimateOut(true);
  };

  const handleAnswerClick = (choice) => {
    const correct = questions[currentQuestionIndex].correctAnswer === choice;
    setIsCorrect(correct);
    setSelectedAnswer(choice);

    const playSound = (sound) => {
      const audio = new Audio(sound);
      audio.play().catch((error) => {
        console.error("Error playing sound:", error);
      });
    };

    if (correct) {
      setScore(score + 1);
      playSound(correctSound);
    } else {
      playSound(incorrectSound);
    }

    setShowFeedback(true);
    setTimeout(() => {
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setShowFeedback(false);
      } else {
        setIsGameOver(true);
        setShowFeedback(false);
      }
    }, 2000);
  };
  return (
    <div className="relative" style={{ width: "100vw", height: "100vh" }}>
      <Canvas>
        <Suspense fallback={null}>
          <BackgroundVDO videoPath="./assets/videos/bg-vdo-2.mp4"/>
          <Robot
            pose={
              isCorrect === null
                ? "pose 3 - hello"
                : isCorrect
                ? "pose 4 - warm welcome"
                : "pose 5 - sit sad"
            }
            animateOut={animateOut}
            animateIn={animateRobot}
          />
          <Light />
          <CameraControl />
        </Suspense>
      </Canvas>

      <ScoreDisplay
        score={score}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={questions.length}
      />

      {!isGameOver ? (
        <QuestionBox
          question={questions[currentQuestionIndex]}
          onAnswerClick={handleAnswerClick}
          isCorrect={isCorrect}
          showFeedback={showFeedback}
        />
      ) : (
        <FinalScore score={score} totalQuestions={totalQuestions} />
      )}

      {showFeedback && <FeedbackOverlay isCorrect={isCorrect} />}
      {isCorrect && showFeedback && <ConfettiEffect />}
      <div className="fixed w-full bottom-0 flex justify-between px-10">
        <RippleButton navigateTo="/page7">Previous</RippleButton>
        <RippleButton navigateTo="/creditPage" onClick={handleExit}>
          Next
        </RippleButton>
      </div>
    </div>
  );
};

export default QuizPage;
