//Responsible for the learn content
//Contain the Flashcards, fill ins the blank, word matching result
//STATUS: ACTIVE
'use client';

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X, BookmarkSimple } from '@phosphor-icons/react';
import { cn } from "@/lib/utils";

import Cards from "./ui/cards";
import Join from "./ui/join";
import Fill from "./ui/fill";
import MatchSound from "./ui/match-sound";
import Match from "./ui/match";
import Result from "./ui/result";
import { Button, Progress, CardHeader, CardBody, CardFooter } from "@heroui/react";
import { useClassData } from '.././layout'; // Assuming you have this context


// Import or define your lessons data
const lessonsData = {
  "modules": [
    {
      "id": "use-basic-phrases",
      "title": "Use basic phrases",
      "description": "Learn the building blocks of Spanish conversation.",
      "status": "in-progress",
      "lessons": 8,
      "completedLessons": 0,
      "duration": "2 hours",
      "lessonData": {
        "flashcards": [
          { "id": 1, "word": "kushɛ", "translation": "Hello", "pronunciation": "koo-sheh" },
          { "id": 2, "word": "tenki", "translation": "Thank you", "pronunciation": "ten-kee" },
          { "id": 3, "word": "sɔri", "translation": "Sorry", "pronunciation": "saw-ree" },
          { "id": 4, "word": "yes", "translation": "Yes", "pronunciation": "yes" },
          { "id": 5, "word": "no", "translation": "No", "pronunciation": "no" }
        ],
        "fillInBlanks": [
          {
            "id": 1,
            "sentence": "kushɛ ___ yu de?",
            "answer": "aw",
            "translation": "Hello, how are you?",
            "options": ["aw", "wetin", "usai", "wen"]
          },
          {
            "id": 2,
            "sentence": "___ yu nem?",
            "answer": "wetin",
            "translation": "What is your name?",
            "options": ["wetin", "aw", "usai", "way"]
          }
        ],
        "matching": [
          { "id": 1, "word": "kushɛ", "meaning": "Hello" },
          { "id": 2, "word": "tenki", "meaning": "Thank you" },
          { "id": 3, "word": "sɔri", "meaning": "Sorry" },
          { "id": 4, "word": "baybay", "meaning": "Goodbye" }
        ],
        "joinWords": [
          {
            "id": 1,
            "words": ["kushɛ", "papa"],
            "correctOrder": ["kushɛ", "papa"],
            "translation": "Hello father"
          }
        ]
      }
    }
    // Add other modules here...
  ]
};
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
  sw: "Swahili",
  li: "Lingala",
  fu: "Fulani",
  hu: "Hausa",
  am: "Amharic",
  ma: "Mandinka",
  ja: "Japanese",
  ko: "Korean",
  it: "Italian",
  du: "Dutch",
  tu: "Turkish",
  ig: "Igbo",
};

const questions = [
  { id: 1, word: "kushɛ", translation: "Hello" },
  { id: 2, word: "man", translation: "Man" },
  { id: 3, word: "nɛt", translation: "Night" },
  { id: 4, word: "lɛf", translation: "Stop" },
  { id: 5, word: "wetin yu nem?", translation: "What’s your name?" },
];

const joinWords = [
  { id: 1, word: "kushɛ", translation: "Hello" },
]

function Welcome() {
  const router = useRouter();
  const { isAuthenticated } = useClassData();
  // Modified: Initialize currentPage to 1 and use it for progress bar
  const [currentPage, setCurrentPage] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const [showSection, setShowSection] = useState('card');
  const [inputValue, setInputValue] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);
  const [inputStep, setInputStep] = useState(0); // Track input section steps
  const [movedBottom1, setMovedBottom1] = useState(false);
  const [movedBottom2, setMovedBottom2] = useState(false); //To move selected div in Join section
  const [feedback, setFeedback] = useState(''); // Feedback message
  const [languageName, setLanguageName] = useState('My Language Journey');

  // Add this state variable with other useState declarations
  const [joinDataSet, setJoinDataSet] = useState(1);// Add this state variable with other useState declarations
  const [fillDataSet, setFillDataSet] = useState(1);


  const [fillCurrentQuestionsAnswered, setFillCurrentQuestionsAnswered] = useState(0);
  const [fillQuestionsAnswered, setFillQuestionsAnswered] = useState(0);

  // Add a new state for tracking the card dataset
  const [cardDataSet, setCardDataSet] = useState(1); // Start with dataset 1


  const searchParams = useSearchParams();
  const moduleId = searchParams.get('moduleId');
  console.log("Module ID:", moduleId);

  const [moduleData, setModuleData] = useState(null);

  useEffect(() => {
    if (moduleId) {
      // Fetch or lookup data for this moduleId
      const stored = localStorage.getItem('quizProgress_static');
      if (stored) {
        const { modules } = JSON.parse(stored);
        const selectedModule = modules.find(m => m.id === moduleId);
        console.log("Selected Module:", selectedModule);
        setModuleData(selectedModule);
      }

      // Optionally: fetch API data for this moduleId
      // fetch(`/api/module-data?moduleId=${moduleId}`).then(...)
    }
  }, [moduleId]);

  // Add this state for API data
  const [lessonData, setLessonData] = useState(null);
  // Only show questions 0–4 for the 'card' section
  const cardQuestions = lessonData?.slice(0, 5) || [];
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [firstSet, setFirstSet] = useState([]);
  const [secondSet, setSecondSet] = useState([]);
  const [secondSetTrim, setSecondSetTrim] = useState([]);
  const [secondSetTrim2, setSecondSetTrim2] = useState([]);

  useEffect(() => {
    setFillCurrentQuestionsAnswered(0);
  }, [fillDataSet]);

  const [matchDataSet, setMatchDataSet] = useState(1);
  const englishWord = "hello";

  // useEffect(() => {
  //   // Get language from localStorage
  //   const langId = localStorage.getItem('selectedLanguage');
  //   setLanguageName(langId ? languageNames[langId] : 'My Language Journey');
  // }, []);

  useEffect(() => {
    const langId = localStorage.getItem('selectedLanguage');
    if (langId && languageNames[langId]) {
      setLanguageName(languageNames[langId]);
    }
  }, []);

  console.log("Language Name:", languageName);

  // Log the languageName and moduleId to ensure they are correct
  console.log("Fetching data for:", languageName, moduleId);
  const url = `http://localhost:8080/api/language-data/${languageName}/chapter/1/topic/${moduleId}`;
  console.log("Requesting URL:", url);


  useEffect(() => {
    if (languageName && moduleId && languageName !== 'My Language Journey') {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          setError(null);

          const sanitizedLanguage = languageName.trim().toLowerCase();
          const sanitizedModule = moduleId.trim().toLowerCase();

          const url = `http://localhost:8080/api/language-data/${encodeURIComponent(sanitizedLanguage)}/chapter/1/topic/${encodeURIComponent(sanitizedModule)}`;
          console.log('👉 Requesting URL:', url);

          const response = await fetch(url, {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          });

          console.log('✅ Response status:', response.status);
          console.log('✅ Response headers:', [...response.headers.entries()]);

          if (response.status === 204) {
            console.warn('⚠️ No content (204) received from backend.');
            setLessonData(null);
            return;
          }

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const contentType = response.headers.get('content-type');
          console.log('🧾 Content-Type:', contentType);

          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            console.log('📦 JSON data received:', data);


            const firstSetData = data.slice(0, 5);
            const secondSetData = data.slice(5, 10);
            const secondSetTrimData = data.slice(5, 8);
            const secondSetTrim2Data = data.slice(8, 10);

            console.log('🔹 First Set (0–4):', firstSet);
            console.log('🔸 Second Set (5–9):', secondSet);
            console.log('🔸 Second Set Trim (5–7):', secondSetTrim);
            console.log('🔸 Second Set Trim 2 (5–8):', secondSetTrim2);

            setLessonData(data);
            setFirstSet(firstSetData); // Save for card display
            setSecondSet(secondSetData);
            setSecondSetTrim(secondSetTrimData); // 6-9Save for card display
            setSecondSetTrim2(secondSetTrim2Data); // 9-10Save for card display
          } else {
            console.warn('⚠️ Response was not JSON.');
            setLessonData(null);
          }
        } catch (error) {
          console.error('❌ Error fetching lesson data:', error);
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [languageName, moduleId]);

  // Update the handleContinue function - replace the match sections with this:
  const handleContinue = async () => {
    if (showSection === 'card') {
      if (currentQuestion < 5) {
        setCurrentQuestion((prev) => prev + 1);
        setCurrentPage((prev) => prev + 1);
      } else {
        setShowSection('putin');
        setCurrentPage(6);
      }
    } else if (showSection === 'putin') {
      // Submit the selected word first
      if (inputValue.trim() && userAnswers.length < 5) {
        // Check if the input is correct
        const isCorrect = inputValue === firstSet[inputStep]?.phrase;
        setUserAnswers((prev) => [...prev, { word: inputValue, isCorrect }]);
        setFeedback(isCorrect ? "Correct!" : `Incorrect. The correct word is "${firstSet[inputStep]?.phrase}".`);
        setInputValue('');
        setInputStep((prev) => prev + 1);
        setCurrentPage((prev) => prev + 1);

        // Move to 'join' after 5 inputs
        if (inputStep === 4) {
          setShowSection('cards');
          setCurrentPage(7);
          setFeedback(''); // Clear feedback
        }
      }
    } else if (showSection === 'cards') {
      setShowSection('join');
      setJoinDataSet(1); // Set to first dataset
      setCurrentPage(8);
    } else if (showSection === 'join') {
      // Check if we're on dataset 1, move to dataset 2
      if (joinDataSet === 1) {
        setJoinDataSet(2);
        setCurrentPage(9);
      } else {
        // We're on dataset 2, move to Fill
        setShowSection('Fill');
        setFillDataSet(1); // Start with first fill dataset
        setCurrentPage(10);
      }
    } else if (showSection === 'Fill') {
      // Check current dataset and move to next one
      if (fillDataSet < 5) {
        setFillDataSet(prev => prev + 1);
        setCurrentPage(prev => prev + 1); // Increment progress for each dataset
      } else {
        // All 5 datasets completed, move to match
        setShowSection('match');
        setMatchDataSet(1); // Start with first match dataset
        setCurrentPage(16);
      }
    } else if (showSection === 'match') {
      // Check if we're on dataset 1, move to dataset 2
      if (matchDataSet === 1) {
        setMatchDataSet(2);
        setCurrentPage(17);
      } else {
        // We're on dataset 2, move to results
        setShowSection('results');
        setCurrentPage(18);
      }
    } else if (showSection === 'results') {
      // Get the current module ID
      const token = localStorage.getItem('authToken');

      if (!isAuthenticated) {
        console.warn('User not authenticated, cannot save progress');
        router.push(`/class/lesson/results?module=${moduleId}`);
        return;
      }

      try {
        // Fetch current progress from backend
        const response = await fetch('http://localhost:8080/api/user/progress', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const progress = await response.json();
          const currentModuleId = moduleId || progress.currentModuleId;

          // Update the progress
          const updatedModules = progress.modules.map(module => {
            if (module.id === currentModuleId) {
              return { ...module, status: "completed" };
            }
            return module;
          });

          const currentModuleIndex = progress.modules.findIndex(m => m.id === currentModuleId);
          let nextModuleId = '';

          if (currentModuleIndex !== -1 && currentModuleIndex < updatedModules.length - 1) {
            updatedModules[currentModuleIndex + 1].status = "in-progress";
            nextModuleId = updatedModules[currentModuleIndex + 1].id;
          }

          const updatedProgress = {
            modules: updatedModules,
            currentModuleId: nextModuleId,
          };

          // Save updated progress to backend
          await fetch('http://localhost:8080/api/user/progress', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProgress),
          });

          console.log('Progress updated and saved to backend');
        }
      } catch (error) {
        console.error('Error updating progress:', error);
      }
      // Navigate to results with module ID
      router.push(`/class/lesson/results?module=${moduleId}`);
    }
  };

  // Add handleJoinComplete function
  const handleJoinComplete = () => {
    // This will be called when Join component completes a dataset
    if (joinDataSet === 1) {
      setJoinDataSet(2);
      setCurrentPage(9);
    } else {
      setShowSection('Fill');
      setCurrentPage(10);
    }
  };

  // // Add handleFillComplete function
  // const handleFillComplete = () => {
  //   // This will be called when Fill component completes a dataset
  //   if (fillDataSet < 5) {
  //     setFillDataSet(prev => prev + 1);
  //     setCurrentPage(prev => prev + 1);
  //   } else {
  //     setShowSection('match');
  //     setCurrentPage(16);
  //   }
  // };

  // In the parent component (Welcome.js)
  const handleFillComplete = () => {
    // Directly transition to match section
    setShowSection('match');
    setCurrentPage(16);
  };

  // Add handleMatchComplete function
  const handleMatchComplete = () => {
    // This will be called when Match component completes a dataset
    if (matchDataSet === 1) {
      setMatchDataSet(2);
      setCurrentPage(17);
    } else {
      setShowSection('results');
      setCurrentPage(18);
    }
  };

  useEffect(() => {
    console.log("Current Section:", showSection);
  }, [showSection]);

  // Fixed: handleInputChange uses actual inputValue, limits userAnswers to 5, and clears input
  // const handleInputChange = () => {
  //   if (inputValue.trim() && userAnswers.length < 5) { // Added: Limit to 5 submissions
  //     setUserAnswers((prev) => [...prev, inputValue]);
  //     setInputValue(''); // Clear input field after submission
  //     setInputStep((prev) => prev + 1); // 🔥 Add this line
  //   }
  // };

  const handleInputChange = () => {
    if (inputValue.trim() && userAnswers.length < 5) {
      const isCorrect = inputValue === firstSet[inputStep]?.phrase;
      setUserAnswers((prev) => [...prev, { word: inputValue, isCorrect }]);
      setFeedback(isCorrect ? "Correct!" : `Incorrect. The correct word is "${firstSet[inputStep]?.phrase}".`);
      setInputValue('');
      setInputStep((prev) => prev + 1);
      if (inputStep === 4) {
        setShowSection('join');
        setCurrentPage(7);
        setFeedback('');
      }
    }
  };


  // Modified: handleFillinContinue adds input (if any) and moves to 'results'
  const handleFillinContinue = () => {
    if (inputValue.trim() && userAnswers.length < 5) { // Added: Respect 5-submission limit
      setUserAnswers((prev) => [...prev, inputValue]);
      setInputValue(''); // Clear input
    }
    setShowSection('results');
    setCurrentPage(8); // Results section
  };

  //For Section Join: Handle word click and swap
  const handleSwapAndMove = () => {
    setMovedBottom2(true);
    // setWordOrder(([first, second]) => [second, first]);
    // handleWordClick(2);
  };
  const handleCardClick = (id) => {
    console.log(`Card ${id} clicked`); // Log the clicked card ID 
  };

  const handleBack = () => {
    router.push('/class/learn');
  };

  // Update the progressWidth calculation - replace with this:
  const progressWidth = (() => {
    switch (showSection) {
      case 'card':
        return `${(currentQuestion / 5) * 0.2 * 100}%`; // 20% per card (0-20%)
      case 'putin':
        return `${(0.2 + (inputStep / 5) * 0.2) * 100}%`; // 20% + 20% for each input (20-40%)
      case 'cards':
        return `${0.4 * 100}%`; // 40%
      case 'join':
        return joinDataSet === 1 ? `${0.45 * 100}%` : `${0.5 * 100}%`; // 45% for dataset 1, 50% for dataset 2
      case 'Fill':
        return `${50 + (fillQuestionsAnswered / 10 * 25)}%`; // Fill section contributes 25% of total progress (50-75%)

      case 'match':
        return matchDataSet === 1 ? `${0.85 * 100}%` : `${0.95 * 100}%`; // 85% for dataset 1, 95% for dataset 2
      case 'results':
        return `100%`; // 100%
      default:
        return `0%`; // Default to 0%
    }
  })();

  const render = () => {
    // Added: Log to debug rendering
    console.log('Rendering section:', showSection);
    console.log(firstSet[currentQuestion - 1]);
    switch (showSection) {
      case 'card':
        return firstSet?.length > 0 ? (

          <div className="flex flex-col mt-5 md:mt-3 p-4 items-center">
            <div
              className="bg-slate-50 h-64 w-52 rounded-md border-2 border-b-4 hover:cursor-pointer"
              onClick={() => handleCardClick(firstSet[currentQuestion - 1]?.id)}

            >
              <div className="flex justify-between items-center p-2">
                <span className="text-lg">{currentQuestion}</span>
                <BookmarkSimple size={32} className="w-5 h-5 text-violet-600" />
              </div>
              <div className="flex justify-center font-semibold m-12">
                <span className="text-violet-600 font-semibold">{firstSet[currentQuestion - 1]?.translation}</span>
              </div>
            </div>
            <div className="flex justify-center m-2">
              <span>{firstSet[currentQuestion - 1]?.phrase}</span>
            </div>
          </div>

        ) : null;
      case 'putin':
        return (
          <div className="flex flex-col mt-5 md:mt-3 p-4 space-y-5 items-center">
            <div className="text-sm text-gray-500">
              Word {inputStep + 1} of 5
            </div>
            <div className="text-lg font-semibold">
              {firstSet[inputStep].translation}
            </div>
            <input
              type="text"
              value={inputValue}
              readOnly
              className="w-64 h-16 bg-gray-100 rounded-lg shadow-md border-b-4 text-center"
              placeholder="Select a word below"
            />
            <div className="grid grid-cols-2 gap-4">
              {firstSet.map((item, index) => (
                <button
                  key={item.id || index}
                  onClick={() => setInputValue(item.phrase)}
                  className={cn(
                    "w-32 h-12 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-md",
                    userAnswers.some((ans) => ans.word === item.phrase) ? "opacity-50 cursor-not-allowed" : ""
                  )}
                  disabled={userAnswers.some((ans) => ans.word === item.phrase)}
                >
                  {item.phrase}
                </button>
              ))}
              {feedback && (
                <div className={`text-sm ${feedback.includes("Correct") ? "text-green-500" : "text-red-500"}`}>
                  {feedback}
                </div>
              )}
              <button onClick={handleContinue} disabled={!inputValue.trim()}>
                Submit
              </button>
            </div>
          </div>
        );

      case 'cards':
        return <Cards data={secondSetTrim} />;

      case 'join':
        return <Join dataSet={joinDataSet} data={secondSetTrim2} onComplete={handleJoinComplete} />;

      case 'Fill':
        return <Fill
          data={secondSet}
          onComplete={handleFillComplete}
          onQuestionAnswered={() => setFillQuestionsAnswered(prev => prev + 1)}
        />

      case 'match':
        return <Match
          dataSet={matchDataSet === 1 ? firstSet : secondSet}
          onComplete={handleMatchComplete}
          currentDataSet={matchDataSet}
          totalDataSets={2}
        />;

      case 'results':
        return <Result />;

      default:
        return <div>Error: Invalid section. Current section: {showSection}</div>;
    }
  };

  return (
    <ErrorBoundary>
      <div className="h-screen flex flex-col w-full">
        {/* Top Content */}
        {(showSection === 'card' || showSection === 'putin' || showSection === 'cards' || showSection === 'join' || showSection === 'Fill' || showSection === 'match') && (
          <div className="flex flex-col items-center justify-center mt-5 w-full">
            {/* Chevron Icon and Progress Bar */}
            <div className="w-full flex items-center gap-4 px-4">
              {/* Chevron Icon */}
              <button
                onClick={handleBack}
                className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full disabled :opacity-50 
            disabled:cursor-not-allowed"
              >
                <X size={24} />
              </button>
              {/* Progress Bar Container */}
              {/* <div className="w-full">
              <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 h-full bg-blue-600 transition-all duration-500"
                  style={{ width: progressWidth }}
                />
              </div>
            </div> */}
              <Progress
                aria-label="Loading..."
                className=" w-full"
                showValueLabel={false}
                size="md"
                value={parseFloat(progressWidth)}
              />
            </div>
          </div>
        )}

        {/* Static Content */}
        <div className="flex flex-col items-center justify-center mt-5 w-full">
          {/* Page Content */}
          {render()}
        </div>

        {/* Bottom Navigation Bar: Modified: Show navigation bar only for 'questions' and 'input' sections 
            showSection === 'card' || showSection === 'putin' || showSection === 'cards' || showSection === 'join' || showSection === 'Fill' || showSection === 'match'
        */}

        {(showSection === 'card' || showSection === 'putin' || showSection === 'cards' || showSection === 'match') && (
          <nav id="navbar" className="fixed bottom-0 z-10 bg-gray-100 w-full py-8 border-t border-gray-300">
            <div className="container mx-auto px-4 flex items-center justify-between">
              {/* First image: hidden on mobile & medium screens, visible on lg+ screens */}
              <div className="hidden lg:flex items-center justify-end w-full">
                <button
                  onClick={handleContinue}
                  className="px-10 py-4 text-white rounded-full transition-colors bg-violet-600 hover:bg-violet-700"
                  disabled={showSection === 'input' && !inputValue}
                >
                  Continue
                </button>
              </div>
              {/* Second image: visible on mobile & medium screens, hidden on lg and above */}
              <div className="flex items-center justify-center lg:hidden w-full">
                <button
                  onClick={handleContinue}
                  className="px-10 py-4 text-white rounded-full transition-colors bg-violet-600 hover:bg-violet-700"
                >
                  Continue
                </button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default function RootLayoutWrapper() {
  return (
    <Suspense fallback={<>loading...</>}>
      <Welcome />
    </Suspense>
  );
}