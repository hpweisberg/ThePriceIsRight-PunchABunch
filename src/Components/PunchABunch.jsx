/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import PrizeReveal from "./PrizeReveal";

//! List of all prizes
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

const PunchABunch = ({ punchCount, handleUsePunch, handleNewGame }) => {
  //TODO Track state of selected circles and remaining prizes
  const [selectedCircles, setSelectedCircles] = useState([]);
  const [remainingPrizes, setRemainingPrizes] = useState([]);

  //TODO Shuffel the prizes
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  //TODO Handle the new game
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

  //TODO Handle the circle click
  const handleCircleClick = (index) => {
    if (punchCount > 0 && !selectedCircles.some((circle) => circle.index === index)) {
      setSelectedCircles([...selectedCircles, { index, value: remainingPrizes[index] }]);
      handleUsePunch();
    }
  };

  //TODO Handle the game over if no items were guessed correctly
  if (punchCount === 0) {
    return (
      <PrizeReveal
        selectedCircles={selectedCircles}
        handleNewGame={handleNewGame}
      />
    );
  }


  return (
        <section className="grid grid-cols-5 gap-1 md:grid-cols-10 md:grid-rows-5"
          style={{
            cursor: `url("data:image/svg+xml;utf8, <svg xmlns='http://www.w3.org/2000/svg' width='42' height='42' style='font-size: 40px'><text y='40'>👊</text></svg>"), auto`
          }}>
          {Array.from({ length: 5 * 10 }).map((_, index) => (
            <div
              key={index}
              className={`punchBtn ${selectedCircles.some((circle) => circle.index === index)
                ? 'bg-gradient-to-tr from-black to-gray-700'
                : 'bg-yellow-200/30'
                }`}
              onClick={() => handleCircleClick(index)}
            >
              {selectedCircles.some((circle) => circle.index === index) ? '' : '$'}
            </div>
          ))}
        </section>
  );
}

export default PunchABunch;