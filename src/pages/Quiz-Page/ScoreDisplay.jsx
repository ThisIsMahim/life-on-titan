/* eslint-disable react/prop-types */
const ScoreDisplay = ({ score, currentQuestion, totalQuestions }) => {
  return (
    <div className="score-display fixed top-4 lg:left-10 lg:p-10 lg:gap-5 left-4 p-4 text-white bg-white/20 backdrop-blur-sm rounded-lg shadow-lg flex flex-col items-center justify-center">
      <div className="text-2xl font-bold">SCORE: {score}/{totalQuestions}</div>
      <div className="text-lg">Question {currentQuestion}/{totalQuestions}</div>
    </div>
  );
};

export default ScoreDisplay;
