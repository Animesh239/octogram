import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ id, index, category, question, answer, flipped, setFlipped, onEdit, onDelete, isAdmin }) => {
  return (
    <motion.div
      className="relative w-96 h-80 mx-auto bg-gray-900 text-white rounded-lg shadow-lg cursor-pointer"
      animate={{ rotateY: flipped ? 180 : 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Front Side */}
      <div 
        className="absolute w-full h-full flex flex-col items-start justify-start text-left p-6 text-xl font-semibold"
        style={{ backfaceVisibility: flipped ? 'hidden' : 'visible', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        <div className="flex items-center space-x-4 mb-4">
          <span className="text-3xl font-bold">{(index+1).toString().padStart(2, '0')}</span>
          <span className="text-2xl font-medium">{category}</span>
        </div>
        <div className="mt-2 text-base leading-relaxed">
          {question}
        </div>
        <div className="flex space-x-2 mt-4">
          <button 
            className="bg-cyan-500 text-black text-sm px-4 py-2 rounded-xl"
            onClick={() => setFlipped(true)}
          >
            Answer
          </button>
          {isAdmin && (
            <>
              <button
                className="bg-yellow-500 text-black text-sm px-4 py-2 rounded-xl"
                onClick={onEdit}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white text-sm px-4 py-2 rounded-xl"
                onClick={onDelete}
              >
                Delete
              </button>
            </>
          )}
        </div>
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
