'use client';
import React from 'react';
import { motion } from "framer-motion";
import { Bookmark } from "lucide-react"; 

const Cards = ({ data }) => {
  return (
    <div className="flex flex-row flex-wrap justify-center mt-5 md:mt-3 p-2 md:p-4 items-center gap-4 md:gap-6">
      {data.map((item, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 160,
            damping: 12,
            delay: index * 0.065,
          }}
          whileHover={{
            scale: 1.05,
            y: -4,
            transition: { type: "spring", stiffness: 200, damping: 10 },
          }}
        >
          <motion.div
            className="bg-slate-50 h-48 w-40 sm:h-56 sm:w-44 md:h-64 md:w-52 rounded-xl border-2 border-b-4 hover:cursor-pointer shadow-sm"
            whileTap={{ scale: 0.96 }}
          >
            <div className="flex justify-between items-center p-2">
              <span className="text-base sm:text-lg font-semibold">{item.word}</span>

              <motion.div
                whileHover={{ rotate: -12, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <Bookmark className="w-5 h-5 text-violet-600" />
              </motion.div>
            </div>

            <div className="flex justify-center text-violet-600 font-bold m-8 sm:m-10 md:m-12 text-sm sm:text-base">
              {item.translation}
            </div>
          </motion.div>

          <div className="font-semibold text-xs sm:text-sm md:text-base mt-2 opacity-90">
            {item.phrase}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Cards;
