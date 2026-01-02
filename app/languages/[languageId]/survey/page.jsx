'use client';

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { CaretLeft } from '@phosphor-icons/react';
import LottieLoader from "../../components/LottieLoaderWrapper";
import { Progress } from "@heroui/progress";
import LottieCallLoader from '../../components/CallLottieWrapper';

//error boundary to gracefully handle unexpected errors
function ErrorBoundary({ children }) {
  try {
    return children;
  } catch (error) {
    return <div>Something went wrong: {error.message}</div>;
  }
}

// Map of language IDs to their display names
const languageNames = {
  am: "Amharic",
  ig: "Igbo",
  kr: "Krio",
  ki: "Kishwahili",
  li: "Lingala",
  ma: "Mandinka",
  me: "Mende",
  sw: "Swahili",
  te: "Temne",
  tu: "Turkish",
  tw: "Twi",
  
  fu: "Fulani",
  ha: "Hausa",
  yo: "Yoruba",
  ko: "Korean",
  it: "Italian",
  du: "Dutch",
};

export default function Welcome({ Component, pageProps }) {
  const router = useRouter();
  const { languageId } = useParams();// Initialize the search parameters
  const languageName = languageId ? languageNames[languageId] || "this language" : "this language";
  // console.log(`Language selected: ${languageName}`); // Log for debugging

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({1: null, 2: null, 3: null});
  const [loading, setLoading] = useState(true);
  const [callLoad, setCallLoad] = useState(false);
  // State to track loading status]
  // Add a new state to control the final progress animation
  const [isAnimatingFinalProgress, setIsAnimatingFinalProgress] = useState(false);

  const totalPages = 3;

  const setSelectedForCurrentPage = (value) => setSelectedOptions(prev => ({...prev, [currentPage]: value}));

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('selectedLanguage', languageId);
  }, [languageId]);

  // Add this new useEffect to restore progress from localStorage
  useEffect(() => {
    // Restore progress from localStorage on component mount
    const savedPage = localStorage.getItem('currentPage');
    const savedOptions = localStorage.getItem('selectedOptions');

    if (savedPage) {
      setCurrentPage(parseInt(savedPage));
    }
    if (savedOptions) {
      setSelectedOptions(JSON.parse(savedOptions));
    }

        // Always show loader for at least 1 second
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this runs once on mount


  // Save progress to localStorage whenever selections or page changes
  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
    localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
  }, [currentPage, selectedOptions]);

  // Check if loading screen has been shown before
  useEffect(() => {
    const loadingShown = localStorage.getItem('loadingShown');
    if (loadingShown) {
      setLoading(false);
    } else {
      const timer = setTimeout(() => {
        setLoading(false);
        localStorage.setItem('loadingShown', 'true');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNext = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      
      // 2. If moving to page 3, trigger the loader
      if (nextPage === 3) {
        setCallLoad(true);
        setTimeout(() => setLoading(false), 2000); // Hide loader after 2 seconds
      }
      
      setCurrentPage(nextPage);
      setIsAnimatingFinalProgress(true);
    } else if (currentPage === totalPages) {
      // Redirect to signup page with query parameters for selections
      router.push(
        `/auth/signup?language=${languageName}&page1Answer=${selectedOptions[1]}&page2Answer=${selectedOptions[2]}&page3Answer=${selectedOptions[3]}`
      );
      console.log(`Survey complete. Redirecting to signup... ${selectedOptions[1]}${selectedOptions[2]}${selectedOptions[3]}`);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      setCallLoad(false); // Reset loading if they go back
    } else if (currentPage === 1) {
      router.back(); // If on the first page and back is clicked, go back to the previous page in history
    }
    // console.log(`Current Page: ${currentPage}`); // Log the current page for debugging purposes
  };

  const handleCardClick = (id) => {
    setSelectedForCurrentPage(id); // Set the clicked card's ID as the selected one
    console.log(`Card ${id} clicked`); // Log the clicked card ID for debugging purposes
  };

  const isPreviousDisabled = currentPage === 1; // Disable "Previous" on page 1

  //Disable based on current page's selection
  const isContinueDisabled = selectedOptions[currentPage] === null;


  console.log('Page:', currentPage, '| Disabled:', isContinueDisabled);

  // Calculate width percentages for expansion/contraction
  const progressWidth = {
    1: 33, 2: 66, 3: 100
  };

  // Set loading to false after a delay (simulating data fetching)

  // useEffect(() => {
  //   // Simulate a loading delay for demonstration purposes
  //   const timer = setTimeout(() => setLoading(false), 3000);
  //   return () => clearTimeout(timer); // Cleanup timeout
  // }, []);
  const survey = [
    {
      id: `Why are you learning ${languageName}?`,
      options: {
        1: "😗Talk to People",
        2: "🎉Just for Fun/Curiosity",
        3: "🫡Other",
      },
    },
    {
      id: `How much ${languageName} do you know?`,
      options: {
        1: `😳I'm new to ${languageName}`, //language
        2: `🫠I know some ${languageName}`,
        3: `😌I'm confident in ${languageName}`
      },
    },
    {
      id: "How did you hear about fourof?",
      options: {
        1: "🛜Web",
        2: "📱Socials",
        3: "👥Family/Friends"
      },
    }
  ];
  const getCurrentSurveyItem = () => {
    if (currentPage >= 1 && currentPage <= survey.length) {
      return survey[currentPage - 1];
    }
    return null;
  };
  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white">
          <LottieLoader width={150} height={150} />
          {/* <LottieCallLoader /> */}
          {/* <p className="mt-4 text-gray-500 animate-pulse">Tailoring your experience...</p> */}
        </div>
        ) : (
        <ErrorBoundary>
          <div className="h-screen flex flex-col w-full">
            {/* Top Content */}
            <div className={`flex flex-col items-center justify-center mt-3 w-full ${currentPage === 4 ? 'hidden' : ''}`}>
              <div className="w-full flex items-center gap-4 px-4">
                <button
                  onClick={handlePrev}
                  className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CaretLeft size={28} />
                </button>

                {/* Progress Bar Container */}
                <div className="w-full">
                  <Progress
                    aria-label="Loading..."
                    className=" w-full"
                    showValueLabel={false}
                    size="md"
                    value={progressWidth[currentPage] ? parseInt(progressWidth[currentPage]) : 0}
                  />
                </div>
              </div>
            </div>

            {/* Page Content */}
            <div className="flex flex-col items-center justify-center w-full">
                {/* 3. PAGE 3 SPECIFIC LOTTIE: Only shows when user is on Page 3 */}
                {currentPage === 3 && (
                  <LottieCallLoader width={90} height={150} /> 
                )}

                {currentPage >= 1 && currentPage <= 3 && (
                  <>
                    <h3 className="">{getCurrentSurveyItem().id}</h3>
                    <div className="flex flex-col items-center h-full gap-2 mx-auto mt-16 p-2">
                      {Object.entries(getCurrentSurveyItem().options).map(([key, value]) => (
                        <button
                          key={key}
                          onClick={() => handleCardClick(parseInt(key))}
                          className={`w-72 h-16 bg-gray-100 rounded-lg shadow-md border-b-4 transition-all cursor-pointer duration-200 ${selectedOptions[currentPage] === parseInt(key)
                            ? 'bg-sky-100 border-2 border-sky-500'
                            : 'bg-white border border-gray-200 hover:bg-gray-50'
                            }`}
                        >
                          <div className="p-4 text-gray-600">
                            <p>{value}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                )}
            </div>

            {/* Bottom Navigation Bar */}
            {/* {currentPage !== 4 && ( */}
            <nav id="navbar" className="fixed bottom-0 z-10 bg-gray-100 w-full py-8 border-t border-gray-300">
              <div className="container mx-auto px-4 flex items-center justify-between">
                {/* First image: hidden on mobile & medium screens, visible on lg+ screens */}
                <div className="hidden lg:flex items-center justify-end w-full">
                  <button
                    onClick={handleNext}
                    disabled={isContinueDisabled}
                    className={`px-10 py-4 text-white rounded-full transition-colors ${isContinueDisabled
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-violet-600 hover:bg-violet-700'
                      }`}
                  >
                    {currentPage === totalPages ? 'Finish' : 'Continue'}
                  </button>
                </div>
                {/* Second image: visible on mobile & medium screens, hidden on lg and above */}
                <div className="flex items-center justify-center lg:hidden w-full">
                  <button
                    onClick={handleNext}
                    disabled={isContinueDisabled}
                    className={`px-10 py-4 text-white rounded-full transition-colors ${isContinueDisabled
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-violet-600 hover:bg-violet-700'
                      }`}
                  >
                    {currentPage === totalPages ? 'Finish' : 'Continue'}
                  </button>
                </div>
              </div>
            </nav>
            {/* )} */}
          </div >
        </ErrorBoundary>
      )}
    </>
  );
}
