'use client';

import React from "react";
import { useRouter } from 'next/navigation'; 
import Navbar from '../navbar';
import {
  Circle,
  Triangle,
  Square,
  Hexagon,
  Star,
  Diamond,
  Sparkle,
  Flower,
  Atom
} from "@phosphor-icons/react";

export default function Language() {
  const router = useRouter(); // Initialize the router

  const languages = [
    {
      id: "kr",
      name: "Krio",
      learners: "50M learners",
      // icon: <Circle className="text-red-500" fill="#FFCC00" strokeWidth={1.5} />
      icon: <Sparkle  className="text-green-500" strokeWidth={1.5} />
    },
    {
      id: "me",
      name: "Mende",
      learners: "50M learners",
      icon: <Flower className="text-green-500" strokeWidth={1.5} />
    },
    {
      id: "te",
      name: "Temne",
      learners: "50M learners",
      icon: <Flower className="text-green-500" strokeWidth={1.5} />
    },
    {
      id: "yo",
      name: "Yoruba",
      learners: "50M learners",
      icon: <Sparkle  className="text-green-500" strokeWidth={1.5} />
    },
    {
      id: "tw",
      name: "Twi",
      learners: "50M learners",
      icon: <Diamond weight="fill" className="text-green-500" strokeWidth={1.5} />
    },
    // {
    //   id: "ki",
    //   name: "Kishwahili",
    //   learners: "50M learners",
    //   icon: <Atom className="text-green-500" strokeWidth={1.5} />
    // },
    // {
    //   id: "wo",
    //   name: "Wolof",
    //   learners: "50M learners",
    //   icon: <Diamond className="text-green-500" weight="fill" strokeWidth={1.5} />
    // },
    // {
    //   id: "fu",
    //   name: "Fulani",
    //   learners: "50M learners",
    //   icon: <Atom className="text-green-500" strokeWidth={1.5} />
    // },
    // {
    //   id: "hu",
    //   name: "Hausa",
    //   learners: "50M learners",
    //   icon:  <Flower className="text-green-500" strokeWidth={1.5} />
    // },
    // {
    //   id: "am",
    //   name: "Amharic",
    //   learners: "50M learners",
    //   icon:<Sparkle  className="text-green-500" strokeWidth={1.5} />
    // },
    // {
    //   id: "ma",
    //   name: "Mandinka",
    //   learners: "50M learners",
    //   icon: <Sparkle  className="text-green-500" strokeWidth={1.5} />
    // },
    // {
    //   id: "ja",
    //   name: "Japanese",
    //   learners: "50M learners",
    //   icon:  <Flower className="text-green-500" strokeWidth={1.5} />
    // },
    // {
    //   id: "ko",
    //   name: "Korean",
    //   learners: "50M learners",
    //   icon: <Atom className="text-green-500" strokeWidth={1.5} />
    // },
    // {
    //   id: "it",
    //   name: "Italian",
    //   learners: "50M learners",
    //   icon:  <Diamond className="text-green-500" weight="fill" strokeWidth={1.5} />
    // },
    // {
    //   id: "du",
    //   name: "Dutch",
    //   learners: "50M learners",
    //   icon: <Atom className="text-green-500" strokeWidth={1.5} />
    // },
    // {
    //   id: "tu",
    //   name: "Turkish",
    //   learners: "50M learners",
    //   icon:  <Diamond className="text-green-500" weight="fill" strokeWidth={1.5} />
    // },
    // {
    //   id: "ig",
    //   name: "Igbo",
    //   learners: "50M learners",
    //   icon:<Sparkle  className="text-green-500" strokeWidth={1.5} />
    // }
  ];

  // Handle click for navigation
  const handleLanguageSelect = (id) => {
    router.push(`/languages/${encodeURIComponent(id)}/survey`);
    console.log(`Navigating to /languages/${id}/survey`);
  };


  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className="mt-4 flex justify-center bg-white">
        <div className="flex flex-col items-center gap-8 pt-20 ">
          <div className="">
            <h2 className=" text-center mt-8">
              What do you want to learn?
            </h2>
          </div>
          {/* Languages Column */}
          <div className="flex flex-col items-center">
            <div className="overflow-y-auto p-2 grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {languages.map((language) => (
                <button
                  key={language.id}
                  onClick={() => handleLanguageSelect(language.id)} // Pass language.id directly
                  className="bg-white h-56 w-44 md:w-48 rounded-lg border-t-2 border-b-4 border-l-2 border-r-2  hover:bg-slate-200 p-4 md:p-6 cursor-pointer"
                >
                  <div className="overflow-hidden border-transparent ">
                    <div className=" flex flex-col items-center">
                      <div className="w-16 h-16 mb-4 flex items-center justify-center">
                        {language.icon}
                      </div>
                      <h3 className="font-semibold text-lg text-gray-800">{language.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{language.learners}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}