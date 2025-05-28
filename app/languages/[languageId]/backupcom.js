'use client';

import Link from 'next/link';
import { Clock, Star, Trophy, LockIcon, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function LearningPathProgress({
  modules = defaultModules,
  title = 'Web Development Fundamentals',
  description = 'Master the core concepts of modern web development through hands-on projects and interactive lessons.',
  points = 560,
  streak = 5,
}) {
  // Calculate overall progress
  const totalLessons = modules.reduce((acc, module) => acc + module.lessons, 0);
  const completedLessons = modules.reduce((acc, module) => acc + module.completedLessons, 0);
  const overallProgress = Math.round((completedLessons / totalLessons) * 100);

  return (
    // Changed from `w-full max-w-4xl mx-auto min-h-screen bg-violet-50 dark:bg-gray-900` to `space-y-6`
    // - Removed `w-full max-w-4xl mx-auto` to fit layout’s `max-w-2xl mx-auto`
    // - Removed `min-h-screen` as layout’s `<div className="flex-1 ... min-h-screen">` handles height
    // - Removed `bg-violet-50` to use layout’s `bg-white`
    // - Removed `dark:bg-gray-900` (no dark mode in layout)
    // - Used `space-y-6` for consistent spacing within `<main>`
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="bg-violet-600 text-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              {/* Changed Star color from `text-purple-400 fill-purple-400` to `text-violet-600 fill-violet-600` */}
              {/* - Matches layout’s violet scheme (e.g., `text-violet-600` in navbar) */}
              <Star className="w-8 h-8 text-violet-600 fill-violet-600" />
            </div>
            {/* Reduced `text-2xl` to `text-xl` for consistency with layout’s headers */}
            <h1 className="text-xl font-bold text-white">{title}</h1>
          </div>
          {/* Updated button colors to match layout’s violet scheme */}
          {/* - `hover:bg-gray-100` → `hover:bg-violet-100` for consistency */}
          <Button className="bg-white text-violet-600 hover:bg-violet-100 hover:text-violet-700">
            Continue
          </Button>
        </div>
      </div>

      {/* Stats bar */}
      {/* Changed background colors (`purple-100`, `indigo-100`, `pink-100`) to `bg-violet-100` */}
      {/* - Ensures uniformity with layout’s `bg-violet-100` (e.g., in `/class` chapters) */}
      <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
            {/* Changed `text-purple-400` to `text-violet-600` */}
            <Trophy className="w-5 h-5 text-violet-600" />
          </div>
          {/* Changed `text-gray-500` to `text-violet-700` to match layout’s text */}
          <span className="text-violet-700">0</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
            {/* Changed `bg-indigo-500` to `bg-violet-600` */}
            <div className="w-5 h-5 bg-violet-600 rounded text-white flex items-center justify-center text-xs font-bold">
              XP
            </div>
          </div>
          {/* Changed `text-indigo-500` to `text-violet-600` */}
          <span className="text-violet-600 font-bold">{points}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
            {/* Changed `text-pink-500` to `text-violet-600` */}
            <div className="text-violet-600">❤️</div>
          </div>
          {/* Changed `text-pink-500` to `text-violet-600` */}
          <span className="text-violet-600 font-bold">{streak}</span>
        </div>
      </div>

      {/* Learning path with curvy line */}
      {/* Reduced padding: `pt-8 pb-16` → `pt-4 pb-8` */}
      {/* - Prevents excess spacing since layout adds `p-4` in `<main>` */}
      <div className="relative pt-4 pb-8">
        {/* Curvy path line using SVG */}
        <svg
          className="absolute left-0 top-0 w-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
          style={{
            // Changed height: `${modules.length * 24 + 8}rem` → `${modules.length * 20}rem`
            // - Tighter spacing to reduce vertical stretch
            // - Fits better within layout’s scrollable `<main>`
            height: `${modules.length * 20}rem`,
            // Added `maxHeight: '100vh'` to cap SVG and prevent page-specific scrollbar
            maxHeight: '100vh',
          }}
        >
          <path
            d="M50,0 C65,10 35,20 50,30 C65,40 35,50 50,60 C65,70 35,80 50,90 C65,100 35,110 50,120"
            stroke="#e5e7eb"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* Modules as nodes */}
        {/* Reduced `space-y-24` → `space-y-16` */}
        {/* - Keeps modules compact to avoid triggering unnecessary scrollbars */}
        <div className="relative z-10 space-y-16">
          {modules.map((module, index) => (
            <ModuleNode
              key={module.id}
              module={module}
              index={index + 1}
              isFirst={index === 0}
              isLast={index === modules.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ModuleNode({ module, index, isFirst, isLast }) {
  const moduleProgress = Math.round((module.completedLessons / module.lessons) * 100);

  // Determine status colors and icons
  const getNodeStyles = () => {
    switch (module.status) {
      case 'completed':
        return {
          bgColor: 'bg-violet-600',
          textColor: 'text-white',
          borderColor: 'border-violet-700',
          shadowColor: 'shadow-violet-200',
          // Changed `text-purple-300 fill-purple-300` to `text-violet-200 fill-violet-200`
          // - Matches layout’s lighter violet tones
          icon: <Star className="w-8 h-8 text-violet-200 fill-violet-200" />,
        };
      case 'in-progress':
        return {
          bgColor: 'bg-violet-600',
          textColor: 'text-white',
          borderColor: 'border-violet-700',
          shadowColor: 'shadow-violet-200',
          icon: <PlayCircle className="w-8 h-8 text-white" />,
        };
      default:
        return {
          bgColor: 'bg-gray-200',
          textColor: 'text-gray-500',
          borderColor: 'border-gray-300',
          shadowColor: 'shadow-gray-100',
          icon: <LockIcon className="w-6 h-6 text-gray-400" />,
        };
    }
  };

  const styles = getNodeStyles();
  const side = index % 2 === 0 ? 'right' : 'left';

  return (
    <div className={`flex ${side === 'left' ? 'justify-start' : 'justify-end'} relative`}>
      {/* Node */}
      {/* Reduced `w-16 h-16` to `w-12 h-12` for better scaling within `max-w-2xl` */}
      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div
          className={cn(
            'w-12 h-12 rounded-full flex items-center justify-center border-4',
            styles.bgColor,
            styles.borderColor,
            'shadow-lg',
            styles.shadowColor,
          )}
        >
          {styles.icon}
        </div>
      </div>

      {/* Content card */}
      {/* Changed `w-[calc(50%-2rem)]` to `w-full sm:w-5/12` */}
      {/* - `w-full` on mobile for full-width cards */}
      {/* - `sm:w-5/12` (~40% of `max-w-2xl`) for left/right alignment on larger screens */}
      {/* Changed `mr-8`/`ml-8` to `sm:mr-8`/`sm:ml-8` */}
      {/* - Disables margins on mobile to prevent overflow */}
      <Card
        className={cn(
          'w-full sm:w-5/12 p-4 shadow-md transition-all',
          module.status === 'locked' ? 'opacity-60' : 'hover:shadow-lg',
          side === 'left' ? 'sm:mr-8' : 'sm:ml-8',
        )}
      >
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h3
                className={cn(
                  'text-lg font-bold flex items-center gap-2',
                  // Changed `text-gray-900` to `text-violet-900` for unlocked
                  // - Matches layout’s primary text color
                  module.status === 'locked' ? 'text-gray-500' : 'text-violet-900',
                )}
              >
                {/* Changed `bg-purple-100` to `bg-violet-100`, added `text-violet-900` */}
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-violet-100 text-xs font-medium text-violet-900">
                  {index}
                </span>
                {module.title}
              </h3>
              {/* Changed `text-gray-500` to `text-violet-700` */}
              <p className="text-sm text-violet-700">{module.description}</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-1">
            {/* Changed `text-gray-500` to `text-violet-700` */}
            <div className="flex justify-between text-xs text-violet-700">
              <span>
                {module.completedLessons} of {module.lessons} lessons
              </span>
              <span>{moduleProgress}%</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className={cn(
                  'h-full rounded-full',
                  module.status === 'completed' ? 'bg-violet-600' : module.status === 'in-progress' ? 'bg-violet-600' : 'bg-gray-200',
                )}
                style={{ width: `${moduleProgress}%` }}
              ></div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            {/* Changed `text-gray-500` to `text-violet-700` */}
            <div className="flex items-center text-xs text-violet-700">
              <Clock className="mr-1 h-3 w-3" />
              {module.duration}
            </div>
            <div className="flex gap-2">
              {(module.status === 'completed' || module.status === 'in-progress') && (
                <Button variant="outline" size="sm" className="text-xs h-8" asChild>
                  {/* Changed to sub-route `/class/quiz/[id]` */}
                  {/* - Matches layout’s `/class/*` pattern */}
                  <Link href={`/class/quiz/${module.id}`}>Quiz</Link>
                </Button>
              )}
              <Button
                size="sm"
                className={cn(
                  'text-xs h-8',
                  module.status === 'locked'
                    ? 'bg-gray-200 text-gray-500'
                    : 'bg-violet-600 hover:bg-violet-700 text-white',
                )}
                disabled={module.status === 'locked'}
                asChild
              >
                {/* Changed to sub-route `/class/module/[id]` */}
                <Link href={`/class/module/${module.id}`}>
                  {module.status === 'completed' ? 'Review' : module.status === 'in-progress' ? 'Continue' : 'Start'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Sample data
const defaultModules = [
  {
    id: 'html-css-basics',
    title: 'HTML & CSS Fundamentals',
    description: 'Learn the building blocks of web pages and styling.',
    duration: '2 hours',
    status: 'completed',
    lessons: 8,
    completedLessons: 8,
  },
  {
    id: 'javascript-essentials',
    title: 'JavaScript Essentials',
    description: 'Master core JavaScript concepts and DOM manipulation.',
    duration: '3.5 hours',
    status: 'in-progress',
    lessons: 12,
    completedLessons: 7,
  },
  {
    id: 'responsive-design',
    title: 'Responsive Web Design',
    description: 'Create websites that work on any device and screen size.',
    duration: '2.5 hours',
    status: 'locked',
    lessons: 6,
    completedLessons: 0,
  },
  {
    id: 'nextjs-foundations',
    title: 'Next.js Foundations',
    description: 'Build modern web applications with React and Next.js.',
    duration: '4 hours',
    status: 'locked',
    lessons: 10,
    completedLessons: 0,
  },
];