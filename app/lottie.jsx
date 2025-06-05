'use client';
import React from 'react';
import Lottie from 'lottie-react';
import defaultAnimationData from './lottie/appbg.json'; // Adjust path if needed

const LottieLoader = ({ width = '100%', height = '100%' }) => {
  return (
    <div style={{ maxWidth: 300, maxHeight: 300, width, height }}>
      <Lottie
        animationData={defaultAnimationData}
        loop
        autoplay
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default LottieLoader;
