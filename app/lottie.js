"use client";
import React from 'react';
import Lottie from 'react-lottie';
import defaultAnimationData from './lottie/appbg.json'; // Import the new animation
// import LottieLoader from "./lottie";

const LottieLoader = ({ width, height }) => {
  const animationData = defaultAnimationData;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="">
      <Lottie
        options={defaultOptions}
        width={width || '100%'} // Responsive width
        height={height || '100%'} // Responsive height
        style={{ maxWidth: '300px', maxHeight: '300px' }} // Cap size
      />
    </div>
  );
};

export default LottieLoader;

