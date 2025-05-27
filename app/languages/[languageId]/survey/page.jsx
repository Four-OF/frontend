'use client';

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Second from "../../components/second";
import Hdyhau from "../../components/hdyhau";
import { CaretLeft } from '@phosphor-icons/react';
import LottieLoader from "../../components/lottieLoader";
import Signup from "../../../auth/signup/page";
import { Progress } from "@heroui/progress";

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
  kr: "Krio",
  me: "Mende",
  te: "Temne",
  yo: "Yoruba",
  tw: "Twi",
  ki: "Kishwahili",
  li: "Lingala",
  fu: "Fulani",
  ha: "Hausa",
  am: "Amharic",

  ma: "Mandinka",
  ja: "Japanese",
  ko: "Korean",
  it: "Italian",
  du: "Dutch",
  tu: "Turkish",
  ig: "Igbo",
};

export default function Welcome({ Component, pageProps }) {
  const router = useRouter();
  const { languageId } = useParams();// Initialize the search parameters
  const languageName = languageId ? languageNames[languageId] || "this language" : "this language";

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('selectedLanguage', languageId);
  }, [languageId]);


  console.log(`Language selected: ${languageName}`); // Log for debugging

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCard, setSelectedCard] = useState(null);// State to track the second card selection on page 1
  const [selectedSecondCard, setSelectedSecondCard] = useState(null); // State to track the selected card on page 2
  const [selectedThirdCard, setSelectedThirdCard] = useState(null); // State to track the selected card on page 3
  const [loading, setLoading] = useState(true);
  // State to track loading status]
  // Add a new state to control the final progress animation
  const [isAnimatingFinalProgress, setIsAnimatingFinalProgress] = useState(false);

  console.log(`Language selected: ${languageName}`); // Log for debugging

  const totalPages = 3;

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);// If on page 3, trigger the final progress animation

      setIsAnimatingFinalProgress(true);
    } else if (currentPage === totalPages) {
      // Redirect to signup page with query parameters for selections
      router.push(
        `/auth/signup?language=${languageName}&page1Answer=${selectedCard}&page2Answer=${selectedSecondCard}&page3Answer=${selectedThirdCard}`
      );
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    } else if (currentPage === 1) {
      router.back(); // If on the first page and back is clicked, go back to the previous page in history
    }

    console.log(`Current Page: ${currentPage}`); // Log the current page for debugging purposes
    console.log("hello")

  };

  const handleCardClick = (id) => {
    setSelectedCard(id); // Set the clicked card's ID as the selected one
    console.log(`Card ${id} clicked`); // Log the clicked card ID for debugging purposes
  };

  const isPreviousDisabled = currentPage === 1; // Disable "Previous" on page 1

  //Disable based on current page's selection
  const isContinueDisabled =
    (currentPage === 1 && selectedCard === null) ||
    (currentPage === 2 && selectedSecondCard === null) ||
    (currentPage === 3 && selectedThirdCard === null);

  // Function to collect and send selections to API
  // const submitSelections = async () => {
  //   const selections = {
  //     language: languageName, // Use languageName instead of undefined language
  //     page1: {
  //       suvQuestion: `Why are you learning ${languageName}?`,
  //       suvAnswer: selectedCard,
  //     },
  //     page2: {
  //       suvQuestion: `How much ${languageName} do you know?`,
  //       suvAnswer: selectedSecondCard,
  //     },
  //     page3: {
  //       suvQuestion: 'How did you hear about us?',
  //       suvAnswer: selectedThirdCard,
  //     }
  //   };
  //   console.log('Collected Selections:', selections);

  //   try {
  //     const response = await fetch('http://localhost:8080/survey', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(selections),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to submit selections');
  //     }

  //     const result = await response.json();
  //     console.log('API Response:', result);
  //   } catch (error) {
  //     console.error('Error submitting selections:', error);
  //   }
  // };

  // Calculate width percentages for expansion/contraction
  const progressWidth = {
    1: '0%',
    2: '50%',
    3: '100%',
  };

  // Set loading to false after a delay (simulating data fetching)

  useEffect(() => {
    // Simulate a loading delay for demonstration purposes
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer); // Cleanup timeout
  }, []);
  return (
    <>
      {loading ? <LottieLoader width={150} height={150} /> : (
        <ErrorBoundary>
          <div className="h-screen flex flex-col w-full">
            {/* Top Content */}
            <div className={`flex flex-col items-center justify-center mt-5 w-full ${currentPage === 4 ? 'hidden' : ''}`}>
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
            <div className="flex flex-col items-center justify-center mt-5 w-full">
              <div className="text-center">
                {currentPage === 1 && (
                  <>
                    <h2 className="mt-3">Why are you learning {languageName}?</h2>
                    <div className="flex flex-col items-center justify-center h-full gap-4 mx-auto mt-20 p-4">
                      {/* Rectangle 1 */}
                      <button
                        onClick={() => handleCardClick(1)}
                        className={`w-64 h-16 bg-gray-100 rounded-lg shadow-md border-b-4 transition-all cursor-pointer duration-200 ${selectedCard === 1
                          ? 'bg-sky-100 border-2 border-sky-500'
                          : 'bg-white border border-gray-200 hover:bg-gray-50'
                          }`}
                      >
                        <div className="p-4 text-gray-600">Talk to People</div>
                      </button>

                      {/* Rectangle 2 */}
                      <button
                        onClick={() => handleCardClick(2)}
                        className={`w-64 h-16 bg-gray-100 rounded-lg shadow-md border-b-4 transition-all cursor-pointer duration-200 ${selectedCard === 2
                          ? 'bg-sky-100 border-2 border-sky-500'
                          : 'bg-white border border-gray-200 hover:bg-gray-50'
                          }`}
                      >
                        <div className="p-4 text-gray-700">Just for Fun/Curiosity</div>
                      </button>

                      {/* Rectangle 3 */}
                      <button
                        onClick={() => handleCardClick(3)}
                        className={`w-64 h-16 bg-gray-100 rounded-lg shadow-md border-b-4 transition-all cursor-pointer duration-200 ${selectedCard === 3
                          ? 'bg-sky-100 border-2 border-sky-500'
                          : 'bg-white border border-gray-200 hover:bg-gray-50'
                          }`}
                      >
                        <div className="p-4 text-gray-800">Other </div>
                      </button>
                    </div>
                  </>
                )}
                {currentPage === 2 &&
                  <Second
                    language={languageName}
                    selectedCard={selectedSecondCard}
                    setSelectedCard={setSelectedSecondCard}
                  />
                }
                {currentPage === 3 &&
                  <Hdyhau
                    language={languageName}
                    selectedCard={selectedThirdCard}
                    setSelectedCard={setSelectedThirdCard}
                  />}
                {/* {currentPage === 4 &&
                  <Signup />
                } */}
              </div>
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
