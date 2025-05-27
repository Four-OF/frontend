'use client';
import React from 'react';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, BookmarkSimple } from '@phosphor-icons/react';

const Cards = ({ data }) => {

  return (
    <>
      <div className="flex flex-row flex-wrap justify-center mt-5 md:mt-3 p-2 md:p-4 items-center gap-4 md:gap-6">
        {data.map((item, index) => (
          <div className="flex flex-col items-center" key={index}>
            <div
              className="bg-slate-50 h-48 w-40 sm:h-56 sm:w-44 md:h-64 md:w-52 rounded-md border-2 border-b-4 hover:cursor-pointer gap-2 transition-all"
            >
              <div className="flex justify-between items-center p-2">
                <span className="text-base sm:text-lg">{item.word}</span>
                <BookmarkSimple size={28} className="w-5 h-5 text-violet-600" />
              </div>
              <div className="flex justify-center text-violet-600 font-semibold m-8 sm:m-10 md:m-12 text-sm sm:text-base">
                {item.translation}
              </div>
            </div>
            <div className="font-semibold text-xs sm:text-sm md:text-base mt-2">
              {item.phrase}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Cards;