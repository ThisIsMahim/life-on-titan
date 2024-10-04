import { motion } from 'framer-motion';

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
        {/* this below para should be dynamic, giving well done for score 7 or above and vice versa */}
        <p className="text-lg sm:text-xl mb-8 font-lato font-bold text-gray-300 leading-relaxed">
          You&#39;ve completed the quiz! Thank you for taking the time to explore Life on Titan.
        </p>
        <div className="flex justify-center space-x-6">
        <button className='btn bg-[#3a7dbf] hover:bg-[#417ae4] text-white hover:border-yellow-400 font-bold font-lato text-lg rounded-full' onClick={() => window.location.reload(false)}>Restart Quiz</button>        </div>
      </motion.div>
    </motion.div>
  );
};

export default FinalScore;
