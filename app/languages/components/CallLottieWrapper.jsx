// app/components/LottieLoaderWrapper.jsx
'use client';

import dynamic from 'next/dynamic';

const LottieCallLoader = dynamic(() => import('./calllottie'), {
  ssr: false,
  loading: () => <div>Loading animation...</div>, // Optional fallback
});

export default LottieCallLoader;
