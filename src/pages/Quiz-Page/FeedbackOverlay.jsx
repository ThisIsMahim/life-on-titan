/* eslint-disable react/prop-types */
const FeedbackOverlay = ({ isCorrect }) => {
    return (
      <div
        className={`feedback-overlay fixed inset-0 ${isCorrect ? "bg-green-400" : "bg-red-400"} opacity-50 `}
      ></div>
    );
  };
  
  export default FeedbackOverlay;
  