"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./navbar";
import Footer from "./footer";
import LottieLoader from "./lottie";
import { Diamond, Sparkle, Flower, Atom } from "@phosphor-icons/react";

export default function Home() {
  const languages = [
    { name: "Krio", icon: <Sparkle className="text-green-500 strokeWidth={1.5}" /> },
    { name: "Temne", icon: <Flower className="text-green-500" strokeWidth={1.5} /> },
    { name: "Swahili", icon: <Diamond className="text-green-500" fill="#FFFFFF" strokeWidth={1.5} /> },
    { name: "Mende", icon: <Atom className="text-green-500" strokeWidth={1.5} /> },
    { name: "Yoruba", icon: <Sparkle className="text-green-500 strokeWidth={1.5}" /> },
    { name: "More+", icon: <Flower className="text-green-500" strokeWidth={1.5} /> },
    // { name: "Korean", icon: <Diamond className="text-green-500" fill="#FFFFFF" strokeWidth={1.5} /> },
    // { name: "Mandinka", icon: <Atom className="text-green-500" strokeWidth={1.5} /> },
    // { name: "Portuguese", icon: <Sparkle className="text-green-500 strokeWidth={1.5}" /> },
    // { name: "Arabic", icon: <Flower className="text-green-500" strokeWidth={1.5} /> },
    // { name: "Dutch", icon: <Diamond className="text-green-500" fill="#FFFFFF" strokeWidth={1.5} /> },
    // { name: "Swedish", icon: <Atom className="text-green-500" strokeWidth={1.5} /> }
  ];

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-white mt-10">
        {/* <Navbar  /> hidden={hideNavbar}*/}
        {/* Add margin-top to account for the navbar height */}
        <div className="flex flex-col h-screen justify-center">
          <div className="absolute top-0 left-0 right-0 bottom-0 opacity-10">
            <div
              className="absolute top-0 left-0 right-0 bottom-0"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(150,216,208,0.2) 1px, transparent 1px)",
                backgroundSize: "25px 25px",
              }}
            ></div>
          </div>
          <div className="absolute top-40 left-20 w-16 h-16 md:w-24 md:h-24 rounded-xl bg-[#96D8D0]/20 rotate-12 blur-md"></div>
          <div className="absolute bottom-40 right-20 w-20 h-20 md:w-28 md:h-28 rounded-xl bg-[#F1B4B9]/20 rotate-12 blur-md"></div>
          <div className="absolute top-1/3 right-1/4 hidden md:block w-16 h-16 rounded-xl bg-violet-400/20 rotate-12 blur-md"></div>
          <div className="absolute top-1/3 right-1/4 hidden md:block w-16 h-16 rounded-xl bg-violet-400/20 rotate-12 blur-md"></div>
          <div className="absolute top-1/3 right-1/4 hidden md:block w-16 h-16 rounded-xl bg-violet-400/20 rotate-12 blur-md"></div>
          <div className="absolute top-1/3 right-1/4 hidden md:block w-16 h-16 rounded-xl bg-violet-400/20 rotate-12 blur-md"></div>
          <div className="absolute top-1/3 right-1/4 hidden md:block w-16 h-16 rounded-xl bg-violet-400/20 rotate-12 blur-md"></div>
          <div className="absolute top-1/3 right-1/4 hidden md:block w-16 h-16 rounded-xl bg-violet-400/20 rotate-12 blur-md"></div>
          <div className="absolute top-1/3 right-1/4 hidden md:block w-16 h-16 rounded-xl bg-violet-400/20 rotate-12 blur-md"></div>
          <div className="absolute top-1/3 right-1/4 hidden md:block w-16 h-16 rounded-xl bg-violet-400/20 rotate-12 blur-md"></div>
          <div className="absolute top-1/3 right-1/4 hidden md:block w-16 h-16 rounded-xl bg-violet-400/20 rotate-12 blur-md"></div>
          <div className="absolute top-1/3 right-1/4 hidden md:block w-16 h-16 rounded-xl bg-violet-400/20 rotate-12 blur-md"></div>
          <div className="absolute top-1/3 right-1/4 hidden md:block w-16 h-16 rounded-xl bg-violet-400/20 rotate-12 blur-md"></div>
          <div className="absolute top-1/3 right-1/4 hidden md:block w-16 h-16 rounded-xl bg-violet-400/20 rotate-12 blur-md"></div>

          <div className="relative flex flex-col h-screen justify-center">
            <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center lg:space-x-5 space-y-5 lg:space-y-0 pb-5">
              <LottieLoader width={450} height={450} />
              <div className="flex flex-col items-center justify-center">
                <h3 className=" text-center max-w-[20ch] leading-tight ">
                  Fun Way to Learn A Not So Everyday Language
                </h3>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <Link href="/languages" className="bg-violet-600 border-violet-800 hover:bg-violet-700 text-white border-2 border-b-3 text-lg py-3 px-24 rounded-xl ">
                Get Started
              </Link>
              <Link href="/auth/login" className="bg-slate-100 border-slate-200 hover:bg-slate-200 border-2 border-b-3 text-lg py-3 px-8 rounded-xl">
                I Already Have An Account
              </Link>
            </div>
          </div>
        </div>

        {/* Language Showcase */}
        <div className="pt-10 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto overflow-hidden">
              <div className="flex animate-scroll py-5">
                {languages.map((language, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 mx-4 px-6 py-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <span className="text-2xl">{language.icon}</span>
                    <span className="text-lg font-medium text-gray-800">{language.name}</span>
                  </div>
                ))}
                {languages.map((language, index) => (
                  <div
                    key={`dup-${index}`}
                    className="flex-shrink-0 mx-4 px-6 py-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <span className="text-2xl">{language.icon}</span>
                    <span className="text-lg font-medium text-gray-800">{language.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-20 text-center">
              <div className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#f2f7fc] text-[#002b46] font-medium">
                <span>{languages.length} languages available</span>
                <div className="ml-3 w-2 h-2 rounded-full bg-violet-500"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"> {/* Increased vertical padding */}
          {/* Feature Section Container */}
          <div className="space-y-20 md:space-y-32"> {/* Increased space between sections */}
            {/* Feature 1: Fun Interactive Learning */}
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16"> {/* Increased gap */}
              <div className="flex-1 flex flex-col items-center md:items-start">
                <h2 className="text-2xl sm:text-3xl font-bold text-center md:text-left font-OpenDyslexic text-black">
                  Fun Interactive Learning
                </h2>
                <p className="text-base sm:text-lg text-center md:text-left font-OpenDyslexic text-gray-500 mt-4 md:mt-5"> {/* Increased margin-top */}
                  Our lessons adapt to your pace, offering real-world scenarios and instant feedback to make learning engaging and effective.
                </p>
              </div>
              <div className="flex-1 flex justify-center mt-8 md:mt-0"> {/* Increased mobile margin-top */}
                <Image
                  src="/Group7.svg"
                  alt="Interactive Learning Illustration"
                  width={400}
                  height={400}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Feature 2: Progress Tracking */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-16">
              <div className="flex-1 flex flex-col items-center md:items-start">
                <h2 className="text-2xl sm:text-3xl font-bold text-center md:text-left font-OpenDyslexic text-black">
                  Progress Tracking
                </h2>
                <p className="text-base sm:text-lg text-center md:text-left font-OpenDyslexic text-gray-500 mt-4 md:mt-5">
                  See your improvement over time with personalized insights. Our progress layout design is intuitive and visually engaging, helping you stay on track. You can also save learning content to review later.
                </p>
              </div>
              <div className="flex-1 flex justify-center mt-8 md:mt-0">
                <Image
                  src="/Group8.svg"
                  alt="Progress Tracking Illustration"
                  width={400}
                  height={400}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Feature 3: Stay Motivated */}
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
              <div className="flex-1 flex flex-col items-center md:items-start">
                <h2 className="text-2xl sm:text-3xl font-bold text-center md:text-left font-OpenDyslexic text-black">
                  Stay Motivated
                </h2>
                <p className="text-base sm:text-lg text-center md:text-left font-OpenDyslexic text-gray-500 mt-4 md:mt-5">
                  Be motivated to learn with our gamified tools which make learning fun and effective. Build your skills with our flashcards, word fill-ins, matching pairs, correspondence matching.
                </p>
              </div>
              <div className="flex-1 flex justify-center mt-8 md:mt-0">
                <Image
                  src="/Group6.svg"
                  alt="Motivation Features Illustration"
                  width={400}
                  height={400}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="m-5 flex justify-center items-center">
          <div className="flex-1 text-center max-w-2xl mx-auto"> {/* Added max-width */}
            <h1 className="text-3xl font-bold font-OpenDyslexic text-black">
              Unlock Languages with Confidence
            </h1>
            <h2 className="text-lg text-gray-500 mt-2 font-OpenDyslexic">
              Every word you learn brings you closer to a new world.
            </h2>
          </div>
        </div>

        {/* Main content with padding-top to account for navbar height */}
        <main
          id="app"
          className="min-h-screen flex flex-col justify-center items-center relative bg-emeraldDark text-white text-center overflow-hidden"
        >
          {/* Radial background overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-violet-700 via-violet-800 to-violet-900 opacity-70 z-0" />
          {/* SVG blob fitted at the top */}
          <svg
            className="absolute top-0 left-0 w-full h-auto z-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#D8B4FE"
              fillOpacity="0.2"
              d="M0,128L8,133.3C16,139,32,149,48,154.7C64,160,80,160,96,154.7C112,149,128,139,144,138.7C160,139,176,149,192,160C208,171,224,181,240,208C256,235,272,277,288,293.3C304,309,320,299,336,256C352,213,368,139,384,133.3C400,128,416,192,432,229.3C448,267,464,277,480,261.3C496,245,512,203,528,181.3C544,160,560,160,576,165.3C592,171,608,181,624,197.3C640,213,656,235,672,224C688,213,704,171,720,149.3C736,128,752,128,768,154.7C784,181,800,235,816,261.3C832,288,848,288,864,282.7C880,277,896,267,912,250.7C928,235,944,213,960,213.3C976,213,992,235,1008,256C1024,277,1040,299,1056,288C1072,277,1088,235,1104,224C1120,213,1136,235,1152,218.7C1168,203,1184,149,1200,117.3C1216,85,1232,75,1248,69.3C1264,64,1280,64,1296,96C1312,128,1328,192,1344,192C1360,192,1376,128,1392,133.3C1408,139,1424,213,1432,250.7L1440,288L1440,0L0,0Z"
            ></path>
          </svg>
          <svg
            className="absolute bottom-0 left-0 w-full h-auto z-0 opacity-30"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#D8B4FE" fillOpacity="5" d="M0,160L0,192L48,192L48,224L96,224L96,224L144,224L144,288L192,288L192,224L240,224L240,288L288,288L288,288L336,288L336,256L384,256L384,160L432,160L432,288L480,288L480,192L528,192L528,224L576,224L576,256L624,256L624,224L672,224L672,224L720,224L720,256L768,256L768,224L816,224L816,64L864,64L864,224L912,224L912,192L960,192L960,160L1008,160L1008,96L1056,96L1056,32L1104,32L1104,32L1152,32L1152,256L1200,256L1200,288L1248,288L1248,160L1296,160L1296,128L1344,128L1344,288L1392,288L1392,0L1440,0L1440,320L1392,320L1392,320L1344,320L1344,320L1296,320L1296,320L1248,320L1248,320L1200,320L1200,320L1152,320L1152,320L1104,320L1104,320L1056,320L1056,320L1008,320L1008,320L960,320L960,320L912,320L912,320L864,320L864,320L816,320L816,320L768,320L768,320L720,320L720,320L672,320L672,320L624,320L624,320L576,320L576,320L528,320L528,320L480,320L480,320L432,320L432,320L384,320L384,320L336,320L336,320L288,320L288,320L240,320L240,320L192,320L192,320L144,320L144,320L96,320L96,320L48,320L48,320L0,320L0,320Z"></path>
          </svg>
          {/* Content (above the SVG) */}
          <div className="relative max-w-2xl mx-auto space-y-6 w-full px-4 pt-20">
            <h2 className="text-3xl font-bold">Get the Mobile App</h2>
            <p className="text-xl">Learn anytime, anywhere. Continue your lessons on the go.</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button className="bg-white border-b-3 border-b-slate-300 text-violet-800 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-violet-100 transition whitespace-nowrap">
                App Store
              </button>
              <button className="bg-white border-b-3 border-b-slate-300 text-violet-800 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-violet-100 transition whitespace-nowrap">
                Google Play
              </button>
            </div>
          </div>
        </main>

        <div className="h-screen bg-purple-50 flex flex-col justify-center items-center gap-y-8 text-center">
          {/* Heading and Arrow grouped */}
          <h1 className="text-4xl font-bold">hey, you can start now!</h1>
          <div className="flex items-center ">
            <h1>new feature</h1>
            <Image
              src="/drawing.svg"
              alt="Arrow pointing to Get Started"
              width={60}
              height={60}
              className="rotate-30  transition-transform duration-300"
            />
            {/* Get Started Button */}
            <Link href="/languages"
              className="bg-purple-600 hover:bg-violet-700 text-white text-lg py-6 px-24 rounded-xl shadow-lg border-b-4 border-violet-800"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="w-full">
          <Image
            src="/assets/stacked-waves-haikei.svg"
            alt="Hero Icon"
            width={450}
            height={150}
            className="w-full h-auto object-contain"
          />
        </div>
        <Footer />
      </div>
    </>
  );
};