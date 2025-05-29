'use client';
import { useState, useEffect } from 'react'; // ⬅️ Add this at the top
import { useSearchParams, useRouter } from 'next/navigation';

import Link from 'next/link';
import { Clock, Star, Trophy, Lock, PlayCircle, CheckCircle } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useClassData } from '../layout';
/**
 * ModuleIconNode Component
 * Renders the circular node with appropriate icon based on module status
 * @param {string} status - The status of the module (completed, in-progress, or locked)
 */


// --- New Component for the Circular Node Icon ---
// This component is solely responsible for rendering the circle node with the correct icon and styling based on the module status.
function ModuleIconNode({ status }) {

  //const moduleProgress = module.status === "completed" ? 100 : 0

  // Determine status colors and icons
  const getNodeStyles = () => {
    switch (status) {
      case "completed":
        return {
          bgColor: "bg-violet-600",
          borderColor: "border-violet-700",
          shadowColor: "shadow-violet-200",
          icon: <CheckCircle size={24} className=" text-white" />,
        }
      case "in-progress":
        return {
          bgColor: "bg-violet-600",
          borderColor: "border-violet-700",
          shadowColor: "shadow-violet-200",
          icon: <PlayCircle size={24} className=" text-white" />,
        }
      default: // locked w-8 h-8
        return {
          bgColor: "bg-gray-200",
          borderColor: "border-gray-300",
          shadowColor: "shadow-gray-100",
          icon: <Lock size={28} className=" text-gray-400" />,
        }
    }
  }

  const styles = getNodeStyles();

  return (
    // This div renders the physical circle node element
    <div
      className={cn(
        "w-16 h-16 rounded-full flex items-center justify-center border-4",
        styles.bgColor,
        styles.borderColor,
        "shadow-lg",
        styles.shadowColor,

      )}
    >
      {styles.icon}
    </div>
  );
}


/**
 * ModuleCardContent Component
 * Renders the content inside each module card
 * @param {Object} module - The module data
 * @param {number} index - The display index of the module
 */

// --- New Component for the Card Content ---
// This component is solely responsible for rendering the content *inside* the card (title, description, progress, buttons, etc.).
function ModuleCardContent({ module, index, arrayIndex, displayIndex, currentIndex }) {
  //const moduleProgress = Math.round((module.completedLessons / module.lessons) * 100);

  // Determine position relationships
  const isFirst = arrayIndex === 0;
  const isCurrent = arrayIndex === currentIndex;
  const isPrevious = currentIndex !== -1 && arrayIndex === currentIndex - 1;

  // Show button only for:
  // - First module if completed (always show first when completed)
  // - Current in-progress module
  // - Directly previous completed module
  const showStartButton =
    (isFirst && module.status === 'completed') ||
    isCurrent ||
    (isPrevious && module.status === 'completed');

  return (
    // This div contains all the details and actions shown within the card
    <div className="space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <h3
            className={cn(
              "text-lg font-bold flex items-center gap-2",
              module.status === "locked" ? "text-gray-500" : "text-gray-900",
            )}
          >
            {/* Module index circle */}
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-xs font-medium">
              {index}
            </span>
            {module.title}
          </h3>
          {/* <p className="text-sm text-gray-500">{module.description}</p> */}
        </div>
      </div>

      {/* Duration and action buttons */}
      <div className="flex justify-between items-center">
        {/* <div className="flex items-center text-xs text-gray-500">
          <Clock className="mr-1 h-3 w-3" />
          {module.duration}
        </div> */}
        <div className="flex gap-2">
          {/* {(module.status === "completed" || module.status === "in-progress") && ( */}
          {/* {showStartButton && ( */}
          {(module.status === "completed" || module.status === "in-progress") && (
            <Button
              size="sm"
              className="text-xs h-8 bg-violet-600 hover:bg-violet-700 text-white"
              disabled={module.status === "locked"}
              asChild
            >
              {/* UPDATED: Pass module.id as a query parameter */}
              <Link href={`/class/lesson?moduleId=${module.id}`}>
                {module.status === "completed" ? "Review Quiz" : "Take Quiz"}
              </Link>
            </Button>
          )}
          {/* )} */}
          {/* )} */}
          {/* <Button${module.id}
            size="sm"
            className={cn(
              "text-xs h-8",
              module.status === "locked"
                ? "bg-gray-200 text-gray-500"
                : "bg-violet-600 hover:bg-violet-700 text-white",
            )}
            disabled={module.status === "locked"}
            asChild
          >
            <Link href={`/module/${module.id}`}>
              {module.status === "completed" ? "Review" : module.status === "in-progress" ? "Continue" : "Start"}
            </Link>
          </Button$> */}
          {module.status === "locked" && (
            <Button size="sm" className="text-xs h-8 bg-gray-200 text-gray-500" disabled>
              Locked
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * LearningPathStep Component
 * Handles the positioning and renders both the ModuleIconNode and Card
 * @param {Object} module - The module data
 * @param {number} index - The display index of the module
 */
// --- Component to orchestrate Node and Card layout for one step ---
// This component handles the positioning (alternating left/right) and renders
// both the ModuleIconNode and the Card containing ModuleCardContent for a single module.
function LearningPathStep({ module, index, arrayIndex, displayIndex, currentIndex }) {
  // Alternate sides for nodes (left/right) based on the index
  const side = index % 2 === 0 ? "right" : "left";

  return (
    // This container uses flexbox to position content left or right.
    // min-w-full prevents horizontal collapse when the card is not present.
    // Added min-h-[8rem] to prevent vertical collapse of this step container
    // when the card is removed. This ensures the absolute node's vertical
    // positioning (top-1/2) is relative to a stable height, maintaining
    // the visual spacing between nodes set by the parent's space-y-24.
    <div className={`flex ${side === "left" ? "justify-start" : "justify-end"} relative min-w-full min-h-[8rem]`}>
      {/* Node Container - absolute top-1/2 -translate-y-1/2 */}
      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <ModuleIconNode status={module.status} /> {/* The node itself (w-16 h-16) has fixed size */}
      </div>

      {/* Content card */}
      <Card
        className={cn(
          "w-[calc(55%-2rem)] p-4 shadow-md transition-all",
          module.status === "locked" ? "opacity-60" : "hover:shadow-lg",
          side === "left" ? "mr-6" : "ml-6",
        )}
      >

        {/* <ModuleCardContent module={module} index={index} /> */}
        <ModuleCardContent module={module} index={index} arrayIndex={arrayIndex} displayIndex={displayIndex} currentIndex={currentIndex} />
      </Card>
    </div>

  );
}

export default function LearningPathProgress({
  //modules = defaultModules,
  //initialModules = defaultModules,
  title = "Web Development Fundamentals",
  description = "Master the core concepts of modern web development through hands-on projects and interactive lessons.",
  points = 560,
  streak = 5,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [modules, setModules] = useState([]);
  const [currentModuleId, setCurrentModuleId] = useState("");
  const [initialized, setInitialized] = useState(false);

  // ADDED: Access languageData and userLanguage from context
  // const { userLanguage, languageData } = useClassData();
  // console.log({ userLanguage, languageData });
  // Add state for confirmation dialog
  //const [showConfirmReset, setShowConfirmReset] = useState(false);

  // console.log("LearningPathProgress initialized with userLanguage:", userLanguage);

  const defaultModules = [
    {
      id: "use-basic-phrases",
      title: "Use basic phrases",
      description: "Learn the building blocks of conversation.",
      status: "in-progress",
      lessons: 8,
      completedLessons: 0,
    },
    {
      id: "greet-people",
      title: "Greet people",
      description: "Master core greetings.",
      status: "locked",
      lessons: 12,
      completedLessons: 0,
    },
    {
      id: "introduce-yourself",
      title: "Introduce yourself",
      description: "Learn how to introduce yourself.",
      status: "locked",
      lessons: 6,
      completedLessons: 0,
    },
    {
      id: "refer-to-family-members",
      title: "Refer to family members",
      description: "Learn terms for family members.",
      status: "locked",
      lessons: 10,
      completedLessons: 0,
    },
    {
      id: "review-and-test",
      title: "Review and test",
      description: "Test your knowledge.",
      status: "locked",
      lessons: 10,
      completedLessons: 0,
    },
  ];

  // Function to get the correct localStorage key
  // const getStorageKey = () => {
  //   return userLanguage ? `quizProgress_${userLanguage}` : 'quizProgress';
  // };
  // Function to load progress from localStorage
  useEffect(() => {
    
    // Only load progress on client-side
    loadProgress();
  }, []); // Empty dependency array means this runs once on mount
const loadProgress = () => {
      try {
        const storedProgress = localStorage.getItem('quizProgress');
        if (storedProgress) {
          const progress = JSON.parse(storedProgress);
          setModules(progress.modules || defaultModules);
          setCurrentModuleId(progress.currentModuleId || defaultModules[0]?.id || "");
        } else {
          setModules(defaultModules);
          setCurrentModuleId(defaultModules[0]?.id || "");
          const initialProgress = {
            modules: defaultModules,
            currentModuleId: defaultModules[0]?.id || "",
          };
          localStorage.setItem('quizProgress', JSON.stringify(initialProgress));
        }
      } catch (error) {
        console.error('Error loading progress from localStorage:', error);
        // Fallback to default values if localStorage fails
        setModules(defaultModules);
        setCurrentModuleId(defaultModules[0]?.id || "");
      }
    };
  // Initialize quiz progress on component mount
  useEffect(() => {
    if (!initialized) {
      loadProgress();
      setInitialized(true);
    }
  }, [initialized]);
  // [initialized, userLanguage]);

  // Listen for focus events to reload progress when returning to the page
  useEffect(() => {
    const handleFocus = () => {
      loadProgress();
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // Check for URL parameter that indicates completion
  useEffect(() => {
    const completedModule = searchParams.get('complete');
    if (completedModule) {
      loadProgress();
    }
  }, [searchParams]);

  // Navigate to the quiz page for the current module
  const handleStartQuiz = () => {
    router.push("/class/lesson");
  };

  /**
   * Reset all progress and start over
   */
  // const defaultModules = [
  //   {
  //     id: "use-basic-phrases",
  //     title: "Use basic phrases",
  //     description: "Learn the building blocks of Spanish conversation.",
  //     status: "in-progress",
  //     lessons: 8,
  //     completedLessons: 0,
  //   },
  //   {
  //     id: "greet-people",
  //     title: "Greet people",
  //     description: "Master core Spanish greetings.",
  //     duration: "3.5 hours",
  //     status: "locked",
  //     lessons: 12,
  //     completedLessons: 0,
  //   },
  //   {
  //     id: "introduce-yourself",
  //     title: "Introduce yourself",
  //     description: "Learn how to introduce yourself in Spanish.",
  //     duration: "2.5 hours",
  //     status: "locked",
  //     lessons: 6,
  //     completedLessons: 0,
  //   },
  //   {
  //     id: "refer-to-family-members",
  //     title: "Refer to family members",
  //     description: "Learn Spanish terms for family members.",
  //     duration: "4 hours",
  //     status: "locked",
  //     lessons: 10,
  //     completedLessons: 0,
  //   },
  //   {
  //     id: "review-and-test",
  //     title: "Review and test",
  //     description: "Test your Spanish knowledge.",
  //     duration: "4 hours",
  //     status: "locked",
  //     lessons: 10,
  //     completedLessons: 0,
  //   },
  // ];

  // Reset all progress and start over
  const handleResetProgress = () => {
    const modulesToReset = defaultModules; // Use defaultModules as fallback
    setModules(modulesToReset);
    setCurrentModuleId(modulesToReset[0]?.id || "");
    const resetProgress = {
      modules: modulesToReset,
      currentModuleId: modulesToReset[0]?.id || "",
    };
    // localStorage.setItem(getStorageKey(), JSON.stringify(resetProgress));
    // Only access localStorage in useEffect or after component mounts
    if (typeof window !== 'undefined') {
      localStorage.setItem('quizProgress', JSON.stringify(resetProgress));
    }
  };



  // Calculate overall progress
  const totalLessons = modules.reduce((acc, module) => acc + module.lessons, 0)
  const completedLessons = modules.reduce(
    (acc, module) => acc + (module.status === "completed" ? module.lessons : 0),
    0,
  )
  const overallProgress = Math.round((completedLessons / totalLessons) * 100)

  if (!initialized) {
    return <div className="flex justify-center items-center h-64">Loading progress...</div>;
  }
  // Calculate overall progress
  // const totalLessons = modules.reduce((acc, module) => acc + module.lessons, 0)
  // const completedLessons = modules.reduce(
  //   (acc, module) => acc + (module.status === "completed" ? module.lessons : 0),
  //   0,
  // )

  return (
    <div className="w-full max-w-4xl mx-auto pt-10 overflow-hidden">
      <button
        onClick={handleResetProgress}
        className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Reset Progress
      </button>
      {/* Learning path container */}
      {/* Added min-h-screen to ensure this container is at least the viewport height. */}
      {/* This prevents the absolutely positioned SVG (h-full of parent) from collapsing */}
      {/* if the flow content (the module steps) is removed or very short. */}
      <div className="relative pb-16 pt-8 min-h-screen">
        {/* Curvy path line using SVG */}
        <svg
          className="absolute left-0 top-0 w-full h-full z-0"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
          style={{
            // This height calculation is crucial for the SVG's internal scaling and aspect ratio,
            // mapping the viewBox/path coordinates correctly.
            // The actual *rendered* height of the SVG element on screen is controlled by its parent container's
            // height (which we've set to a minimum of 100vh) and the SVG's own h-full class.
            height: `${modules.length * 24 + 8}rem`, // Adjust height based on number of modules
            overflow: "visible",
          }}
        >
          <path
            d="M50,0 C65,10 35,20 50,30 C65,40 35,50 50,60 C65,70 35,80 50,90 C65,100 35,110 50,120"
            stroke="#e5e7eb" // gray-200
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            className="path-line"
          />
        </svg>
        {/* Modules rendered as steps along the path */}
        {/* We now map over modules and render a LearningPathStep for each */}
        {/* The space-y-24 adds vertical gaps between these step containers. */}
        <div className="relative z-10 space-y-12">
          {modules.map((module, index) => (
            <LearningPathStep
              key={module.id}
              module={module}
              index={index + 1}
              arrayIndex={index}
              displayIndex={index + 1}
              currentIndex={modules.findIndex(m => m.status === 'in-progress')}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Sample data (remains the same)
// const defaultModules = [
//   {
//     id: "use-basic-phrases",
//     title: "Use basic phrases",
//     description: "Learn the building blocks of web pages and styling.",
//     //duration: "2 hours",
//     status: "in-progress",
//     lessons: 8,
//     completedLessons: 0,
//   },
//   {
//     id: "greet-people",
//     title: "Greet people",
//     description: "Master core JavaScript concepts and DOM manipulation.",
//     duration: "3.5 hours",
//     status: "locked",
//     lessons: 12,
//     completedLessons: 0,
//   },
//   {
//     id: "introduce-yourself",
//     title: "Introduce yourself",
//     description: "Create websites that work on any device and screen size.",
//     duration: "2.5 hours",
//     status: "locked",
//     lessons: 6,
//     completedLessons: 0,
//   },
//   {
//     id: "refer-to-family-members",
//     title: "Refer to family members",
//     description: "Build modern web applications with React and Next.js.",
//     duration: "4 hours",
//     status: "locked",
//     lessons: 10,
//     completedLessons: 0,
//   },
//   {
//     id: "review-and-test",
//     title: "Review and test",
//     description: "Build modern web applications with React and Next.js.",
//     duration: "4 hours",
//     status: "locked",
//     lessons: 10,
//     completedLessons: 0,
//   },
// ]