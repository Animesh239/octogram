import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ id, category, question, answer, flipped, setFlipped }) => {
  return (
    <motion.div
      className="relative w-96 h-80 mx-auto bg-gray-900 text-white rounded-lg shadow-lg cursor-pointer"
      animate={{ rotateY: flipped ? 180 : 0 }}
      transition={{ duration: 0.4 }}
    >
      <div 
        className="absolute w-full h-full flex flex-col items-start justify-start text-left p-6 text-xl font-semibold"
        style={{ backfaceVisibility: flipped ? 'hidden' : 'visible', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        <div className="flex items-center space-x-4 mb-4">
          <span className="text-3xl font-bold">{id.toString().padStart(2, '0')}</span>
          <span className="text-2xl font-medium">{category}</span>
        </div>
        <div className="mt-2 text-base leading-relaxed">
          {question}
        </div>
        <button 
          className="mt-auto bg-cyan-500 text-black text-sm px-4 py-2 rounded-xl self-end" 
          onClick={() => setFlipped(true)}
        >
          Answer
        </button>
      </div>

      {/* Back Side */}
      <div 
        className="absolute w-full h-full flex flex-col items-center justify-center text-center p-6 text-xl font-semibold"
        style={{ backfaceVisibility: flipped ? 'visible' : 'hidden', transform: 'rotateY(180deg)' }}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <p>{answer}</p>
          <button 
            className="mt-4 bg-cyan-500 text-black text-sm px-4 py-2 rounded-xl" 
            onClick={() => setFlipped(false)}
          >
            Back to Question
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
