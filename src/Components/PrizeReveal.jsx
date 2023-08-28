/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ConfettiEffect from "./ConfettiEffect";

const PrizeReveal = ({ selectedCircles, handleNewGame }) => {
  //TODO Track state of currentIndex and gameOver
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  //TODO Get value of current prize
  const currentPrize = selectedCircles[currentIndex].value;

  //TODO End game when user is happy with their prize
  const handleKeepPrize = () => {
    console.log(`You chose to keep the prize: ${currentPrize}`);
    setGameOver(true);
  };

  //TODO Continue game when user wants to look at the next prize
  const handleContinue = () => {
    if (currentIndex < selectedCircles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  //TODO Check if there are punches left to continue
  useEffect(() => {
    if ((selectedCircles.length - currentIndex - 1) === 0) {
      setGameOver(true);
    }
  }, [selectedCircles, currentIndex])


  //TODO Handle restarting the game
  const handleRestart = () => {
    setGameOver(false);
    setCurrentIndex(0);
    handleNewGame();
  }

  //TODO Display end game card
  if (gameOver === true) {
    return (
      <div className=" w-full h-full flex flex-col justify-center items-center gap-4">
        <ConfettiEffect />
        <div className="border-2 border-black bg-green-500 rounded-md shadow-md w-4/5 h-2/3 flex flex-col justify-center items-center gap-8 p-4 md:p-8 ">
          <h1 className="md:text-4xl text-xl text-center ">
            YOU WON
          </h1>
          <h1 className="md:text-6xl text-2xl text-center ">
            ${currentPrize}!
          </h1>
        </div>
        <div className=" flex w-4/5 justify-around">
          <button className="border-2 hover:border-black rounded-md shadow-md p-1 px-2 hover:bg-slate-800 bg-blue-500/50 hover:text-slate-300 transition-colors text-xs md:text-md"
            onClick={() => handleRestart()}>Play Again?</button>
        </div>
      </div>
    )
  }


  return (
    <div className=" w-full h-full flex flex-col justify-center items-center gap-4">
      <div className="border-2 border-black bg-green-500 rounded-md shadow-md w-4/5 h-2/3 flex flex-col justify-center items-center gap-8 p-4 md:p-8 ">
        <h2 className="text-xl b-2 text-center md:text-4xl">
          You found {currentPrize}!</h2>
        <p>{`Prizes left ${selectedCircles.length - currentIndex - 1}`}</p>
      </div>

      <div className=" flex w-4/5 justify-around md:flex-row flex-col md:gap-0 gap-4 ">
        <button onClick={handleKeepPrize} className="border-2 hover:border-black rounded-md shadow-md p-1 px-2 hover:bg-slate-800 bg-blue-500/50 hover:text-slate-300 transition-colors text-xs md:text-md">
          Keep Prize
        </button>
        <button onClick={handleContinue} className="border-2 hover:border-black rounded-md shadow-md p-1 px-2 hover:bg-slate-800 bg-blue-500/50 hover:text-slate-300 transition-colors text-xs md:text-md">
          Throw Away Prize
        </button>
      </div>

    </div>
  );
};

export default PrizeReveal;