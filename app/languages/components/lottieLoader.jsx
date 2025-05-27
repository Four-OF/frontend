"use client";
import React from 'react';
import Lottie from 'react-lottie';
import defaultAnimationData from './lottiefiles/loading.json';
import anotherAnimationData from './lottiefiles/progress.json'; // Import the new animation


const LottieLoader = ({ width, height, animationType}) => {
  const animationData = animationType === 'another' ? anotherAnimationData : defaultAnimationData;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
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

