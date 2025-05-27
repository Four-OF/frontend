//Legacy code
"use client"
import Link from "next/link"
import { Clock, Star, Trophy, LockIcon, PlayCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function LearningPathProgress({
  modules = defaultModules,
  title = "Web Development Fundamentals",
  description = "Master the core concepts of modern web development through hands-on projects and interactive lessons.",
  points = 560,
  streak = 5,
}) {
  // Calculate overall progress
  const totalLessons = modules.reduce((acc, module) => acc + module.lessons, 0)
  const completedLessons = modules.reduce((acc, module) => acc + module.completedLessons, 0)
  const overallProgress = Math.round((completedLessons / totalLessons) * 100)

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 min-h-screen py-12 bg-violet-50 dark:bg-gray-900">
      {/* Header with stats */}
      <div className="bg-violet-600 text-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <Star className="w-8 h-8 text-purple-400 fill-purple-400" />
            </div>
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
          <Button className="bg-white text-violet-600 hover:bg-gray-100 hover:text-violet-700">Continue</Button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <Trophy className="w-5 h-5 text-purple-400" />
          </div>
          <span className="text-gray-500">0</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
            <div className="w-5 h-5 bg-indigo-500 rounded text-white flex items-center justify-center text-xs font-bold">
              XP
            </div>
          </div>
          <span className="text-indigo-500 font-bold">{points}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
            <div className="text-pink-500">❤️</div>
          </div>
          <span className="text-pink-500 font-bold">{streak}</span>
        </div>
      </div>

      {/* Learning path with curvy line */}
      <div className="relative pb-16 pt-8">
        {/* Curvy path line using SVG */}
        <svg
          className="absolute left-0 top-0 w-full h-full z-0"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
          style={{
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

        {/* Modules as nodes */}
        <div className="relative z-10 space-y-24">
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
  )
}

function ModuleNode({ module, index, isFirst, isLast }) {
  const moduleProgress = Math.round((module.completedLessons / module.lessons) * 100)

  // Determine status colors and icons
  const getNodeStyles = () => {
    switch (module.status) {
      case "completed":
        return {
          bgColor: "bg-violet-600",
          textColor: "text-white",
          borderColor: "border-violet-700",
          shadowColor: "shadow-violet-200",
          icon: <Star className="w-8 h-8 text-purple-300 fill-purple-300" />,
        }
      case "in-progress":
        return {
          bgColor: "bg-violet-600",
          textColor: "text-white",
          borderColor: "border-violet-700",
          shadowColor: "shadow-violet-200",
          icon: <PlayCircle className="w-8 h-8 text-white" />,
        }
      default:
        return {
          bgColor: "bg-gray-200",
          textColor: "text-gray-500",
          borderColor: "border-gray-300",
          shadowColor: "shadow-gray-100",
          icon: <LockIcon className="w-6 h-6 text-gray-400" />,
        }
    }
  }

  const styles = getNodeStyles()

  // Alternate sides for nodes (left/right)
  const side = index % 2 === 0 ? "right" : "left"

  return (
    <div className={`flex ${side === "left" ? "justify-start" : "justify-end"} relative`}>
      {/* Node */}
      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
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
      </div>

      {/* Content card */}
      <Card
        className={cn(
          "w-[calc(50%-2rem)] p-4 shadow-md transition-all",
          module.status === "locked" ? "opacity-60" : "hover:shadow-lg",
          side === "left" ? "mr-8" : "ml-8",
        )}
      >
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h3
                className={cn(
                  "text-lg font-bold flex items-center gap-2",
                  module.status === "locked" ? "text-gray-500" : "text-gray-900",
                )}
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-xs font-medium">
                  {index}
                </span>
                {module.title}
              </h3>
              <p className="text-sm text-gray-500">{module.description}</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>
                {module.completedLessons} of {module.lessons} lessons
              </span>
              <span>{moduleProgress}%</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full",
                  module.status === "completed"
                    ? "bg-violet-600"
                    : module.status === "in-progress"
                      ? "bg-violet-600"
                      : "bg-gray-200",
                )}
                style={{ width: `${moduleProgress}%` }}
              ></div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="mr-1 h-3 w-3" />
              {module.duration}
            </div>
            <div className="flex gap-2">
              {(module.status === "completed" || module.status === "in-progress") && (
                <Button variant="outline" size="sm" className="text-xs h-8" asChild>
                  <Link href={`/quiz/${module.id}`}>Quiz</Link>
                </Button>
              )}
              <Button
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
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

// Sample data for demonstration
const defaultModules = [
  {
    id: "html-css-basics",
    title: "HTML & CSS Fundamentals",
    description: "Learn the building blocks of web pages and styling.",
    duration: "2 hours",
    status: "completed",
    lessons: 8,
    completedLessons: 8,
  },
  {
    id: "javascript-essentials",
    title: "JavaScript Essentials",
    description: "Master core JavaScript concepts and DOM manipulation.",
    duration: "3.5 hours",
    status: "in-progress",
    lessons: 12,
    completedLessons: 7,
  },
  {
    id: "responsive-design",
    title: "Responsive Web Design",
    description: "Create websites that work on any device and screen size.",
    duration: "2.5 hours",
    status: "locked",
    lessons: 6,
    completedLessons: 0,
  },
  {
    id: "nextjs-foundations",
    title: "Next.js Foundations",
    description: "Build modern web applications with React and Next.js.",
    duration: "4 hours",
    status: "locked",
    lessons: 10,
    completedLessons: 0,
  },
]

