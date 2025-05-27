import React from 'react';
// Make sure to install lucide-react: npm install lucide-react
//import { Star1, TrendingUp, Volume2, BookOpen1 } from 'lucide-react';
import { Star, TrendUp, SpeakerHigh, BookOpen } from '@phosphor-icons/react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

// Main component for the results page
function ResultsPage({ userName = "FourOf", stars = 10, score = 100, vocabulary = { spanish: "Wo din de sɛn?", english: "What's your name?" } }) {

    const router = useRouter();
    const searchParams = useSearchParams();
    const moduleId = searchParams.get('module');

    const handleNext = () => {
        const storedProgress = localStorage.getItem("quizProgress");

        if (storedProgress) {
            const progress = JSON.parse(storedProgress);

            // If no moduleId from URL, get the current module from progress
            const currentModuleId = moduleId || progress.currentModuleId;

            // Find the current module index
            const currentModuleIndex = progress.modules.findIndex((module) => module.id === currentModuleId);

            if (currentModuleIndex !== -1) {
                const updatedModules = [...progress.modules];

                // Mark current module as completed
                updatedModules[currentModuleIndex].status = "completed";

                // Set next module as in-progress if available
                if (currentModuleIndex < updatedModules.length - 1) {
                    updatedModules[currentModuleIndex + 1].status = "in-progress";
                    progress.currentModuleId = updatedModules[currentModuleIndex + 1].id;
                } else {
                    // All modules completed
                    progress.currentModuleId = null;
                }

                // Update the progress object
                progress.modules = updatedModules;

                // Save to localStorage
                localStorage.setItem("quizProgress", JSON.stringify(progress));

                console.log("Progress updated:", progress); // Debug log
            }
        }

        // Navigate back to the learning path
        router.push("/class/learn");
    };
    // const handleNext = () => {
    //     router.push(`/class/learn?complete=${moduleId}`);
    // };

    return (
        // Outer container to center content and manage padding
        <div className="flex flex-col items-center justify-center min-h-screen font-sans">
            {/* Main content card */}
            <div className="w-full max-w-md text-center "> {/* Added subtle shadow */}

                {/* Illustration at the top */}
                {/* <div className="mb-3 flex justify-center"> */}
                {/* Placeholder image - updated colors */}
                {/* <img
                        //src="https://placehold.co/150x100/EDE9FE/7C3AED?text=Illustration" // Violet theme placeholder
                        //alt="Completion Illustration"
                        //className="h-24 object-contain" */}
                {/* 333333333333333333333333333333333333333 */}
                {/* /> */}
                {/* </div> */}

                {/* Congratulatory message */}
                <h1 className="text-2xl font-bold text-gray-800 mb-3">
                    Well done {userName}!
                </h1>

                {/* Stats Section (Stars and Score) */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Stars Box */}
                    <div className="border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center">
                        <span className="text-sm text-gray-500 mb-1">Stars</span>
                        <div className="flex items-center text-lg font-semibold text-gray-700">
                            +{stars}
                            {/* Using yellow-400 (complementary) for the star */}
                            <Star size={24} weight="fill" className="ml-1 text-yellow-400" />
                        </div>
                    </div>

                    {/* Score Box */}
                    <div className="border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center">
                        <span className="text-sm text-gray-500 mb-1">Score</span>
                        <div className="flex items-center text-lg font-semibold text-gray-700">
                            {score}%
                            {/* Keeping green for score trend, can be changed */}
                            <TrendUp size={24} className="ml-1 text-green-500" />
                        </div>
                    </div>
                </div>

                {/* Vocabulary Section */}
                <div className="text-left mb-6">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                            Vocabulary
                        </h2>
                        {/* Using violet-600 for the vocabulary score */}
                        <div className="flex items-center text-violet-600 font-semibold">
                            +4 {/* Assuming this value is static based on the image */}
                            <BookOpen size={24} className="ml-1" />
                        </div>
                    </div>

                    {/* Vocabulary Item Card */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center text-gray-800 mb-1">
                            {/* Using violet-600 for the volume icon */}
                            <SpeakerHigh size={24} className="mr-2 text-violet-600" />
                            <span className="font-medium">{vocabulary.spanish}</span>
                        </div>
                        <p className="text-gray-600 ml-7">{vocabulary.english}</p> {/* Align with text above */}
                    </div>
                    {/* Add more vocabulary items here if needed */}
                </div>

            </div>
            {/* Continue Button - Placed outside the main card, using violet-600 */}
            <div className="w-full max-w-md mt-6">
                <Link href="/class/phrasebook" className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"> {/* Added focus state */}
                    Review
                </Link>
            </div>


            <button
                onClick={handleNext}
                className="mt-4 px-4 py-2 bg-violet-600 text-white rounded"
            >
                Continue
            </button>

        </div>
    );
}

// Default export for the App component
export default function App() {
    // You can pass dynamic data via props here if needed
    return <ResultsPage />;
}
