import { useState, useEffect } from "react";
import PrizeReveal from "./PrizeReveal";

const prizes = [
  { value: 100, count: 5 },
  { value: 250, count: 10 },
  { value: 500, count: 10 },
  { value: 1000, count: 10 },
  { value: 2500, count: 8 },
  { value: 5000, count: 4 },
  { value: 10000, count: 2 },
  { value: 25000, count: 1 }
]

const PunchABunchContainer = ({ handleUsePunch }) => {
  // 
  const [punchCount, setPunchCount] = useState(4);
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
      setPunchCount(punchCount - 1);
    }
  };


  if (punchCount === 0) {
    return (
      <PrizeReveal
        remainingPrizes={remainingPrizes}
        handleUsePunch={handleUsePunch}
      />
    );
  }



  return (
    <div className="border-2 border-red-400 w-full h-full grid grid-cols-5 gap-1 md:grid-cols-10 md:grid-rows-5 p-2">
      {Array.from({ length: 5 * 10 }).map((_, index) => (
        <div
          key={index}
          className={`border-2 border-blue-400 w-6 h-6 md:w-12 md:h-12 rounded-full text-center ${selectedCircles.includes(index) ? 'selected' : ''
            }`}
          onClick={() => handleCircleClick(index)}
        >
          {selectedCircles.some((circle) => circle.index === index) ? '' : '?'}
        </div>
      ))}
    </div>

  );
}


export default PunchABunchContainer;