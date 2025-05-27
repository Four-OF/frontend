// JoinWords.jsx
import React, { useState } from "react";

const Match = ({ dataSet, onComplete, currentDataSet = 1, totalDataSets = 1 }) => {
//const Match = ({ dataSet, onComplete }) => {
  // const countries = ["France", "Japan", "Brazil", "Canada", "India"];
  // const capitals = ["Tokyo", "Brasília", "New Delhi", "Ottawa", "Paris"];

  const countries = ["santɛm", "Hindolo", "ʌŋ lɔri", "Bawo", "Ebia"];
  const capitals = ["Afternoon", "Boy", "Car", "Hi!", "Maybe"];

  // const correctPairs = {
  //   France: "Paris",
  //   Japan: "Tokyo",
  //   Brazil: "Brasília",
  //   Canada: "Ottawa",
  //   India: "New Delhi",
  // };

  // const correctPairs = {
  //   Santɛm: "Afternoon",
  //   Hindolo: "Boy",
  //   ʌŋ_lɔri: "Car",
  //   Bawo: "Hi!",
  //   Ebia: "Maybe",
  // };

  // Extract phrases and translations from the dataSet
  const phrases = dataSet?.map(item => item.phrase) || [];
  const translations = dataSet?.map(item => item.translation) || [];
  
  // Create correct pairs object from the dataSet
  const correctPairs = {};
  dataSet?.forEach(item => {
    correctPairs[item.phrase] = item.translation;
  });

  const [selected, setSelected] = useState([]);
  const [matches, setMatches] = useState([]);
  const [wrongAttempt, setWrongAttempt] = useState(null);

  // Reset match state when dataset changes
  React.useEffect(() => {
    setSelected([]);
    setMatches([]);
    setWrongAttempt(null);
  }, [currentDataSet]);

  const handleBoxClick = (index) => {
    if (selected.includes(index)) return;
    if (selected.length === 1) {
      const [first] = selected;
      if ((first < phrases.length && index >= phrases.length) || (first >= phrases.length && index < phrases.length)) {
        const phrase = first < phrases.length ? phrases[first] : phrases[index - phrases.length];
        const translation = index >= phrases.length ? translations[index - phrases.length] : translations[first - phrases.length];
        
        if (correctPairs[phrase] === translation) {
          setMatches([...matches, [first, index]]);
          setWrongAttempt(null);
          
          // Check if all matches are complete
          if (matches.length + 1 === phrases.length && onComplete) {
            setTimeout(() => onComplete(), 500);
          }
        } else {
          setWrongAttempt([first, index]);
          setTimeout(() => setWrongAttempt(null), 1000);
        }
        setSelected([]);
      } else {
        setSelected([index]);
        setWrongAttempt(null);
      }
    } else {
      setSelected([index]);
      setWrongAttempt(null);
    }
  };

  const getBoxStyle = (index) => {
    const isSelected = selected.includes(index);
    const isMatched = matches.some(pair => pair.includes(index));
    const isWrong = wrongAttempt && wrongAttempt.includes(index);

    let base = "bg-gray-100 p-4 border-2 border-b-4 rounded-lg cursor-pointer text-center transition-transform duration-600 w-full";
    if (isMatched) base += " bg-green-100 border-green-500 opacity-50";
    else if (isWrong) base += " bg-red-100 border-red-500";
    else if (isSelected) base += " border-violet-500";
    else base += " border-gray-200";

    return base;
  };

  // Show loading if no data
  if (!dataSet || dataSet.length === 0) {
    return (
      <div className="flex flex-col mt-2 md:mt-3 p-4 items-center">
        <p>Loading matching exercise...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-2 md:mt-3 p-4 items-center">
      <h2 className="text-2xl font-bold text-violet-900 mb-4">Match the Words</h2>
      
      {totalDataSets > 1 && (
        <div className="mb-4 text-sm text-gray-600">
          Set {currentDataSet} of {totalDataSets}
        </div>
      )}
      
      <div className="bg-white p-2 rounded-xl">
        <p className="text-lg text-gray-700">Match the words with their meanings.</p>
        <div className="grid grid-cols-2 gap-4 w-full max-w-3xl">
          {phrases.map((phrase, i) => (
            <React.Fragment key={i}>
              <div
                className={getBoxStyle(i)}
                onClick={() => handleBoxClick(i)}
              >
                <p className="text-violet-600 font-medium">{phrase}</p>
              </div>
              <div
                className={getBoxStyle(i + phrases.length)}
                onClick={() => handleBoxClick(i + phrases.length)}
              >
                <p className="text-violet-600 font-medium">{translations[i]}</p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {matches.length === phrases.length && (
        <div className="mt-4 text-center">
          <p className="text-green-600 font-semibold text-lg">
            {currentDataSet < totalDataSets ? `Set ${currentDataSet} complete!` : 'All matches complete!'}
          </p>
          {onComplete && (
            <button
              onClick={onComplete}
              className="mt-2 px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
            >
              {currentDataSet < totalDataSets ? 'Next Set' : 'Continue'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Match;