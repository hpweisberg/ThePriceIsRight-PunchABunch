/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";


const HiLoGame = ({
  item,
  punchCount,
  handleCorrectHiLoGuess,
  hiLoItemCount,
  handleNextHiLoItem,
  handleStartHiLoGame,
  handleStartPunchABunch,
  handleNewGame
}) => {
  //TODO Track state of RealPrice, message, and disable buttons.
  const [showRealPrice, setShowRealPrice] = useState(false);
  const [message, setMessage] = useState(null)
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  //TODO Hide the real price and message on new item.
  useEffect(() => {
    setShowRealPrice(false);
    setMessage(null);
  }, [item]);

  //TODO Handle the user guess: show real price, disable buttons, & set message
  const handleGuess = (guess) => {
    setShowRealPrice(true);
    setButtonsDisabled(true);

    if (
      (guess === 'higher' && item.realPrice > item.fakePrice) ||
      (guess === 'lower' && item.realPrice < item.fakePrice)
    ) {
      handleCorrectHiLoGuess();
      setMessage('Correct!');
    } else {
      setMessage('Incorrect!');
    }
  };

  //TODO Handle the user clicking continue to the next item
  const handleContinue = () => {
    setShowRealPrice(false);
    setButtonsDisabled(false);

    if (hiLoItemCount < 4) {
      handleNextHiLoItem();
    }
  };

  //TODO Handle the user guessing wrong on all 4 items
  const handleTryAgain = () => {
    handleNewGame();
    setButtonsDisabled(false);
  }

  //TODO Handle the start game btn
  if (hiLoItemCount === 0) {
    return (
      <section>
        <button onClick={handleStartHiLoGame} className="w-auto p-4 bg-red-500 text-slate-200 hover:bg-red-600 hover:text-slate-100 transition-colors rounded-md shadow-md">Start Hi-Lo Game</button>
      </section>
    );
  }

  //TODO Display the end game screen if user lost
  if ((hiLoItemCount === 4) && message && (punchCount === 0)) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 text-slate-200">
        <h2 className="text-center text-lg">Better luck next time!</h2>
        <button onClick={handleTryAgain} className="endBtn">Play Again?</button>
      </div>
    )
  }

  return (
    <main className="flex flex-col justify-center gap-1 md:gap-4 text-slate-200 items-center">
      <div className="flex flex-col md:flex-row md:gap-10 text-sm md:text-md items-center">
        <p className={`w-full h-6 md:h-10 text-center text-4xl 
        ${message === "Correct!"
            ? "text-green-500"
            : message === "Incorrect!"
              ? "text-red-500"
              : ""
          }`}
        >
          {message}
        </p>
      </div>
      <section className="flex md:flex-row flex-col gap-4">
        <div className="flex items-center text-center flex-col text-slate-200 w-[300px] h-[250px] md:h-auto md:w-[400px]">
          <img src={item?.image} className="w-[200px] md:w-[250px]" alt={item?.name} />
          <h2 className="text-xs md:text-md">{item?.name}</h2>
        </div>
        <div className="flex flex-col justify-center w-[300px] items-center text-4xl md:border-x-2 border-x-0 md:border-y-0 border-y-2 py-2 md:py-0">
          {!showRealPrice ?
            <p className="text-4xl">${item?.fakePrice}</p>
            :
            <div className="flex flex-col items-center">
              <p className={`text-2xl ${message === 'Correct!' ? 'line-through decoration-green-500 mb-2' : 'line-through decoration-red-500 mb-2'}`}>{item?.fakePrice}</p>
              <p className="text-xs">Actual Retail Price:</p>
              <p className="text-4xl">${item?.realPrice}</p>
            </div>
          }
        </div>
        <div className="flex md:flex-col justify-center md:w-[200px] items-center ">
          {message === null && hiLoItemCount < 5 ? (
            <div className="flex md:flex-col">
              <button
                className="mainBtn"
                onClick={() => handleGuess('higher')}
                disabled={buttonsDisabled}
              >
                HIGHER
              </button>
              <button
                className="mainBtn"
                onClick={() => handleGuess('lower')}
                disabled={buttonsDisabled}
              >
                LOWER
              </button>
            </div>
          ) : (
            <button
              onClick={hiLoItemCount === 4 && message ? handleStartPunchABunch : handleContinue}
              className="mainBtn"
            >
              Continue
            </button>
          )}
        </div>
      </section>
    </main>
  );
};

export default HiLoGame;
