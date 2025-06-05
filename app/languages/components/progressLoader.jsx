
import React from 'react';
import Lottie from 'lottie-react';
import animationData from './lottiefiles/progress.json'; // Adjust path if needed

const LottieAnimation = ({ loop = true, autoplay = true, style = {} }) => {
  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      style={{ width: 190, height: 190, ...style }}
    />
  );
};

export default LottieAnimation;