import { motion } from 'framer-motion';
import RippleButton from '../Shared/RippleButton';

/* eslint-disable react/prop-types */
const FinalScore = ({ score, totalQuestions }) => {
  return (
    <motion.div
      className="final-score fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl p-12 text-center font-poppins shadow-xl"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-6xl lg:text-8xl font-extrabold text-white mb-8">
          SCORE: {score}/{totalQuestions}
        </h1>
        <div className="flex justify-center space-x-6">
         <RippleButton navigateTo={"/quizPage"}>Restart</RippleButton>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FinalScore;
