"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, CheckCircle, HelpCircle, Home, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

// Add the back button at the beginning of the component, before the Card
export default function QuizComponent({
  moduleId = "javascript-essentials",
  moduleTitle = "JavaScript Essentials",
  questions = defaultQuestions,
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  const handleAnswerSelect = (value) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: value,
    })
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleRetake = () => {
    setSelectedAnswers({})
    setCurrentQuestionIndex(0)
    setShowResults(false)
  }

  // Calculate score
  const calculateScore = () => {
    let correctCount = 0
    questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctCount++
      }
    })
    return {
      score: correctCount,
      total: questions.length,
      percentage: Math.round((correctCount / questions.length) * 100),
    }
  }

  return (
    <div className="space-y-4 w-full max-w-3xl mx-auto">
      <div className="flex justify-start">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="flex items-center gap-1 text-violet-600 hover:text-violet-700 hover:bg-violet-50"
        >
          <Link href="/">
            <Home className="h-4 w-4" />
            <span>Back to Learning Path</span>
          </Link>
        </Button>
      </div>

      {showResults ? (
        <Card className="border-violet-100">
          <CardHeader className="bg-violet-50 border-b border-violet-100">
            <CardTitle className="text-2xl text-violet-900">Quiz Results</CardTitle>
            <CardDescription className="text-violet-700">{moduleTitle} - Assessment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2 text-violet-600">{calculateScore().percentage}%</div>
              <p className="text-lg text-violet-800">
                You scored {calculateScore().score} out of {calculateScore().total} questions correctly
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-violet-900">Question Review</h3>
              {questions.map((question, index) => {
                const isCorrect = selectedAnswers[question.id] === question.correctAnswer
                return (
                  <div key={question.id} className="border rounded-lg p-4 border-violet-100">
                    <div className="flex items-start gap-2">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-pink-500 mt-0.5" />
                      )}
                      <div>
                        <p className="font-medium text-violet-900">
                          Question {index + 1}: {question.question}
                        </p>
                        <p className="text-sm mt-1">
                          Your answer:{" "}
                          <span className={isCorrect ? "text-purple-600" : "text-pink-600"}>
                            {selectedAnswers[question.id] || "Not answered"}
                          </span>
                        </p>
                        {!isCorrect && (
                          <p className="text-sm mt-1">
                            Correct answer: <span className="text-purple-600">{question.correctAnswer}</span>
                          </p>
                        )}
                        {question.explanation && <p className="text-sm mt-2 text-violet-600">{question.explanation}</p>}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
          <CardFooter className="flex gap-3 bg-violet-50 border-t border-violet-100">
            <Button variant="outline" asChild className="flex-1 border-violet-200 text-violet-700 hover:bg-violet-100">
              <Link href="/">Return to Learning Path</Link>
            </Button>
            <Button onClick={handleRetake} className="flex-1 bg-violet-600 hover:bg-violet-700 text-white">
              Retake Quiz
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="border-violet-100">
          <CardHeader className="bg-violet-50 border-b border-violet-100">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-violet-900">{moduleTitle} Quiz</CardTitle>
                <CardDescription className="text-violet-700">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-violet-400" />
                <span className="text-sm text-violet-600">Assessment</span>
              </div>
            </div>
            <Progress value={progress} className="h-2 mt-2 bg-violet-100">
              <div className="h-full bg-violet-600" style={{ width: `${progress}%` }} />
            </Progress>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4 text-violet-900">{currentQuestion.question}</h3>
                <RadioGroup
                  value={selectedAnswers[currentQuestion.id] || ""}
                  onValueChange={handleAnswerSelect}
                  className="space-y-3"
                >
                  {currentQuestion.options.map((option) => (
                    <div
                      key={option}
                      className={cn(
                        "flex items-center space-x-2 rounded-lg border p-4 cursor-pointer transition-colors",
                        selectedAnswers[currentQuestion.id] === option
                          ? "bg-violet-50 border-violet-300"
                          : "hover:bg-violet-50/50 border-violet-100",
                      )}
                      onClick={() => handleAnswerSelect(option)}
                    >
                      <RadioGroupItem value={option} id={option} className="text-violet-600" />
                      <Label htmlFor={option} className="flex-grow cursor-pointer font-normal text-violet-800">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between bg-violet-50 border-t border-violet-100">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="border-violet-200 text-violet-700 hover:bg-violet-100"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!selectedAnswers[currentQuestion.id]}
              className="bg-violet-600 hover:bg-violet-700 text-white"
            >
              {currentQuestionIndex < questions.length - 1 ? (
                <>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                "Finish Quiz"
              )}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

// Sample quiz questions
const defaultQuestions = [
  {
    id: "q1",
    question: "Which of the following is NOT a JavaScript data type?",
    options: ["String", "Boolean", "Float", "Symbol"],
    correctAnswer: "Float",
    explanation:
      "JavaScript has Number type which includes both integers and floating-point numbers. There is no separate Float type.",
  },
  {
    id: "q2",
    question: "What will console.log(typeof []) output?",
    options: ["array", "object", "undefined", "null"],
    correctAnswer: "object",
    explanation: "In JavaScript, arrays are actually objects, so typeof [] returns 'object'.",
  },
  {
    id: "q3",
    question: "Which method is used to add elements to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correctAnswer: "push()",
    explanation:
      "push() adds elements to the end of an array, while pop() removes from the end, shift() removes from the beginning, and unshift() adds to the beginning.",
  },
  {
    id: "q4",
    question: "What is the correct way to check if a variable is an array?",
    options: [
      "typeof variable === 'array'",
      "variable instanceof Array",
      "Array.isArray(variable)",
      "variable.isArray()",
    ],
    correctAnswer: "Array.isArray(variable)",
    explanation: "Array.isArray() is the recommended way to check if a variable is an array in JavaScript.",
  },
  {
    id: "q5",
    question: "What does the '===' operator do in JavaScript?",
    options: [
      "Checks for equality, with type conversion",
      "Checks for equality, without type conversion",
      "Assigns a value to a variable",
      "Checks if a variable exists",
    ],
    correctAnswer: "Checks for equality, without type conversion",
    explanation:
      "The strict equality operator (===) checks both value and type without conversion, unlike the loose equality operator (==).",
  },
]
