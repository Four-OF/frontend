import React, { useEffect }from 'react';
//import LottieAnimation from './calllottie'; // Import the Lottie animation component
import dynamic from 'next/dynamic';

import LottieLoader from './CallLottieWrapper';

export default function Hdyhau({ language, selectedCard, setSelectedCard }) {

    // Load selected card from local storage on component mount
    useEffect(() => {
        const savedCard = localStorage.getItem('selectedThirdCard3');
        if (savedCard) {
            setSelectedCard(parseInt(savedCard));
        }
    }, [setSelectedCard]);

    const handleCardClick = (id) => {
        setSelectedCard(id);
        console.log(`Card ${id} clicked`);
    };

    const isContinueDisabled = selectedCard === null; // Disable "Continue" if no card is selected

    return (
        <>
            <h2 className="mt-3">How did you hear about fourof?</h2>
            <div className="flex flex-col items-center justify-center h-full gap-4 mx-auto mt-0">
                {/* This is the second page content, where you can ask the user about their knowledge of the selected language */}
                {/* Rectangle 1 */}
                <LottieLoader />
                <button
                    onClick={() => handleCardClick(1)}
                    className={`w-64 h-16 bg-gray-100 rounded-lg shadow-md border-b-4                  transition-all 
                  cursor-pointer
                  duration-200 ${selectedCard === 1
                            ? 'bg-sky-100 border-2 border-sky-500'
                            : 'bg-white border border-gray-200 hover:bg-gray-50'
                        }`}
                >
                    <div className="p-4 text-gray-600">🛜Web</div>
                </button>

                {/* Rectangle 2 */}
                <button
                    onClick={() => handleCardClick(2)}
                    className={`w-64 h-16 bg-gray-100 rounded-lg shadow-md border-b-4                  transition-all 
                  cursor-pointer
                  duration-200 ${selectedCard === 2
                            ? 'bg-sky-100 border-2 border-sky-500'
                            : 'bg-white border border-gray-200 hover:bg-gray-50'
                        }`}
                >
                    <div className="p-4 text-gray-700">📱Socials </div>
                </button>

                {/* Rectangle 3 */}
                <button
                    onClick={() => handleCardClick(3)}
                    className={`w-64 h-16 bg-gray-100 rounded-lg shadow-md border-b-4 transition-all 
                  cursor-pointer
                  duration-200 ${selectedCard === 3
                            ? 'bg-sky-100 border-2 border-sky-500'
                            : 'bg-white border border-gray-200 hover:bg-gray-50'
                        }`}
                >
                    <div className="p-4 text-gray-800">👥Family/Friends</div>
                </button>
                
            </div>
        </>
    )
}

