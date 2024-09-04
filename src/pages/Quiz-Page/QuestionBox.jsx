/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
const QuestionBox = ({ question, onAnswerClick, isCorrect, showFeedback }) => {
  return (
    <div className="box-container w-full flex justify-center absolute lg:bottom-24 bottom-16">
      <div className="question-box text-white flex flex-col items-center p-6 w-[90%] lg:w-[60%] mx-auto rounded-lg backdrop-blur-sm bg-white/10 shadow-lg border border-white/20">
        <h2 className="text-2xl lg:text-3xl mb-4 font-semibold">
          {question.text}
        </h2>
        <div className="choices grid grid-cols-2 gap-4 w-full">
          {question.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => onAnswerClick(choice)}
              disabled={showFeedback}
              className={`choice-button text-lg py-3 px-4 rounded-lg transition-all duration-300 ${
                showFeedback
                  ? choice === question.correctAnswer
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              {choice}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionBox;
