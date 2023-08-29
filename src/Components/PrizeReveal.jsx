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
  if (gameOver) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center gap-4">
        <ConfettiEffect />
        <div className="prizeContainer">
          <h1 className="md:text-4xl text-xl text-center ">
            YOU WON
          </h1>
          <h1 className="md:text-6xl text-2xl text-center ">
            ${currentPrize}!
          </h1>
        </div>
        <div className=" flex justify-around">
          <div className="endBtn"
            onClick={() => handleRestart()}>Play Again?</div>
        </div>
      </div>
    )
  }


  return (
    <div className=" w-full h-full flex flex-col justify-center items-center gap-4">
      <div className="prizeContainer">
        <h2 className="text-xl b-2 text-center md:text-4xl">
          You found {currentPrize}!</h2>
        <p>{`Prizes left ${selectedCircles.length - currentIndex - 1}`}</p>
      </div>

      <div className=" flex w-4/5 justify-around md:flex-row flex-col md:gap-0 gap-4 ">
        <div onClick={handleKeepPrize} className="endBtn md:text-md">
          Keep Prize
        </div>
        <div onClick={handleContinue} className="endBtn md:text-md">
          Throw Away Prize
        </div>
      </div>

    </div>
  );
};

export default PrizeReveal;