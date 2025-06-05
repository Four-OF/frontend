// app/languages/components/ProgressLoaderWrapper.jsx
'use client';

import dynamic from 'next/dynamic';

const ProgressLoader = dynamic(() => import('./progressLoader'), {
  ssr: false,
  loading: () => <div>Loading animation...</div>, // optional fallback
});

export default ProgressLoader;
