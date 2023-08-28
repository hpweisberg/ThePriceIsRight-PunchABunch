/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import PrizeReveal from "./PrizeReveal";

const prizes = [
  { value: '100', count: 5 },
  { value: '250', count: 10 },
  { value: '500', count: 10 },
  { value: '1,000', count: 10 },
  { value: '2,500', count: 8 },
  { value: '5,000', count: 4 },
  { value: '10,000', count: 2 },
  { value: '25,000', count: 1 }
]

const PunchABunchContainer = ({ punchCount, handleUsePunch, handleNewGame }) => {
  const [selectedCircles, setSelectedCircles] = useState([]);
  const [remainingPrizes, setRemainingPrizes] = useState([]);
  console.log('selectedCircles: ', selectedCircles)
  console.log('remainingPrizes: ', remainingPrizes)

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    const initialRemainingPrizes = [];
    prizes.forEach((prize) => {
      for (let i = 0; i < prize.count; i++) {
        initialRemainingPrizes.push(prize.value);
      }
    });
    shuffleArray(initialRemainingPrizes);
    setRemainingPrizes(initialRemainingPrizes);
  }, []);

  const handleCircleClick = (index) => {
    if (punchCount > 0 && !selectedCircles.some((circle) => circle.index === index)) {
      setSelectedCircles([...selectedCircles, { index, value: remainingPrizes[index] }]);
      handleUsePunch();
    }
  };


  if (punchCount === 0) {
    return (
      <PrizeReveal
        selectedCircles={selectedCircles}
        handleNewGame={handleNewGame}
      />
    );
  }



  return (
    <div className="w-full h-full flex justify-center items-center p-2">
      <div className="grid grid-cols-5 gap-1 md:grid-cols-10 md:grid-rows-5"
        style={{
          cursor: `url("data:image/svg+xml;utf8, <svg xmlns='http://www.w3.org/2000/svg' width='42' height='42' style='font-size: 40px'><text y='40'>👊</text></svg>"), auto`
        }}>
        {Array.from({ length: 5 * 10 }).map((_, index) => (
          <div
            key={index}
            className={`w-8 h-8 md:w-14 md:h-14 m-1 flex items-center justify-center rounded-full text-center text-xl md:text-3xl font-bold text-yellow-400 ${selectedCircles.some((circle) => circle.index === index)
              ? 'bg-gradient-to-tr from-black to-gray-700'
              : 'bg-yellow-200/30'
              }`}
            onClick={() => handleCircleClick(index)}
          >
            {selectedCircles.some((circle) => circle.index === index) ? '' : '$'}
          </div>
        ))}
      </div>
    </div>

  );
}

export default PunchABunchContainer;