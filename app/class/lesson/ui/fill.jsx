import { useState } from "react";

// const fillData = [
//   {
//     sentence: "kushɛ ___ yu de?",
//     answer: "aw",
//     translation: "Hello, how are you?",
//   },
//   {
//     sentence: "___ yu nem?",
//     answer: "wetin",
//     translation: "What is your name?",
//   },
//   {
//     sentence: "a ___ fine",
//     answer: "de",
//     translation: "I am fine",
//   },
//   {
//     sentence: "___ dey cam?",
//     answer: "udat",
//     translation: "Who is coming?",
//   },
//   {
//     sentence: "tenki yu ___ much",
//     answer: "so",
//     translation: "Thank you so much",
//   },
//   {
//     sentence: "a want go ___ market",
//     answer: "na",
//     translation: "I want to go to the market",
//   },
//   {
//     sentence: "dis ___ fine house",
//     answer: "na",
//     translation: "This is a fine house",
//   },
//   {
//     sentence: "wi de ___ skul",
//     answer: "na",
//     translation: "We are at school",
//   },
//   {
//     sentence: "dat ___ my book",
//     answer: "na",
//     translation: "That is my book",
//   },
//   {
//     sentence: "im ___ doctor",
//     answer: "na",
//     translation: "He/She is a doctor",
//   },
// ];

const FillInTheBlanks = ({ data, onComplete, onQuestionAnswered }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showingAnswer, setShowingAnswer] = useState(false);


  const fillData = data || [];

  const handleAnswerClick = () => {
    if (isAnswered) return;

    setIsAnswered(true);
    setShowingAnswer(true);
    onQuestionAnswered();
  };

  const handleContinue = () => {
    if (currentIndex < fillData.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsAnswered(false);
      setShowingAnswer(false);
    } else {
      // Directly call completion without delays
      onComplete();
    }
  };


  const getBlankStyle = () => {
    let base = "border-b-2 min-w-[100px] text-center text-lg font-medium px-2 py-1";
    return showingAnswer
      ? `${base} text-green-700 border-green-500 bg-green-50`
      : `${base} text-violet-700 border-gray-500`;
  };

  const getButtonStyle = () => {
    let base = "p-4 border-2 rounded-lg transition-colors cursor-pointer font-medium text-lg min-w-[120px]";
    return showingAnswer
      ? `${base} bg-green-200 border-green-500 text-green-700`
      : `${base} bg-slate-200 border-slate-300 hover:bg-slate-300`;
  };


  // Add safety check for empty data
  if (!fillData || fillData.length === 0) {
    return (
      <div className="flex flex-col mt-5 md:mt-3 p-4 justify-center items-center">
        <p>Loading fill-in-the-blanks questions...</p>
      </div>
    );
  }

  // Check if current item has the required properties
  const currentItem = fillData[currentIndex];
  if (!currentItem || (!currentItem.sentence && !currentItem.phrase)) {
    return (
      <div className="flex flex-col mt-5 md:mt-3 p-4 justify-center items-center">
        <p>Invalid question data...</p>
      </div>
    );
  }

  // Use sentence if available, otherwise use phrase with a placeholder blank
  const sentenceToSplit = currentItem.sentence || `${currentItem.phrase} ___`;
  const sentenceParts = sentenceToSplit.split("___"); // Corrected line

  return (
    <div className="flex flex-col mt-5 md:mt-3 p-4 justify-center items-center">
      <h2 className="text-2xl font-bold text-violet-900 mb-4">
        Fill in the Blanks
      </h2>

      <div className="mb-4 text-sm text-gray-600">
        Question {currentIndex + 1} of {fillData.length}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 mb-4 text-lg">
        <span className="text-violet-800 font-medium">{sentenceParts[0]}</span>
        <div className={getBlankStyle()}>
          {showingAnswer ? fillData[currentIndex].translation : "___"}
        </div>
        {sentenceParts[1] && (
          <span className="text-violet-800 font-medium">{sentenceParts[1]}</span>
        )}
      </div>

      <div className="mb-6 text-center">
        <p className="text-sm text-gray-600 italic">
          "{fillData[currentIndex].translation}"
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4 items-center">
        <button
          className={getButtonStyle()}
          onClick={handleAnswerClick}
          disabled={isAnswered}
        >
          {fillData[currentIndex].translation}
        </button>

        {showingAnswer && (
          <button
            onClick={handleContinue}
            className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            {currentIndex < fillData.length - 1 ? "Next Question" : "Continue"}
          </button>
        )}
      </div>
    </div>
  );
};

export default FillInTheBlanks;