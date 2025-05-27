'use client';
import React from 'react';
import { useState } from "react";

const joinDataSet1 = [
    {
        word: "kushɛ",
        options: ["Hello"],
        answer: "Hello"
    },
    {
        word: "tenki", 
        options: ["Thank you"],
        answer: "Thank you"
    }
];

const Join = ({ data, dataSet = 1, onComplete }) => {
    const questions = data;
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [movedIndex, setMovedIndex] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [showContinue, setShowContinue] = useState(false);

    const handleOptionClick = (index) => {
        if (movedIndex !== null) return;

        const selected = questions[currentQuestion].phrase;
        const correct =  true;

        setMovedIndex(index);
        setFeedback("correct");
        setShowContinue(true);

        if (correct) {
            setShowContinue(true);
        } else {
            setTimeout(() => {
                setMovedIndex(null);
                setFeedback(null);
            }, 1000);
        }
    };

    const handleContinue = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setMovedIndex(null);
            setFeedback(null);
            setShowContinue(false);
        } else {
            onComplete();
        }
    };

    const getOptionStyle = (index) => {
        let base = "bg-white p-6 border-2 rounded-b-lg cursor-pointer transition-transform duration-500";
        if (movedIndex === index) {
            base += " -translate-y-40";
            if (feedback === "correct") {
                base += " bg-green-200 border-green-500";
            } else if (feedback === "wrong") {
                base += " bg-red-200 border-red-500";
            }
        }
        return base;
    };

    const getTopStyle = () => {
        let base = "bg-white p-6 border-2 rounded-t-lg transition-colors duration-300";
        if (feedback === "correct") {
            base += " bg-green-200 border-green-500";
        } else if (feedback === "wrong") {
            base += " bg-red-200 border-red-500";
        }
        return base;
    };

    return (
        <div className="flex flex-col mt-5 md:mt-3 p-4 items-center">
            <h2 className="text-2xl font-bold text-violet-900 mb-4">
                Join the Words
            </h2>
            
            <div className="mb-4 text-sm text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
            </div>

            <div className={getTopStyle()}>
                <p className="text-violet-600 font-medium text-xl">
                    {data[currentQuestion].translation}
                </p>
            </div>

            <div className="mt-40 flex flex-col gap-4 z-10 w-full max-w-xs">
                {/* Since your data structure doesn't have options array, we'll create a single option */}
                <div
                    className={getOptionStyle(0)}
                    onClick={() => handleOptionClick(0)}
                >
                    <p className="text-violet-600 font-medium text-lg text-center">
                        {data[currentQuestion].phrase}
                    </p>
                </div>
            </div>

            {showContinue && (
                <button
                    onClick={handleContinue}
                    className="mt-8 px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
                >
                    {currentQuestion < questions.length - 1 ? "Continue" : "Finish"}
                </button>
            )}
        </div>
    );
};

export default Join;