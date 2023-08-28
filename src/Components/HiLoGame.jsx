/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";


const HiLoGame = ({
  item,
  punchCount,
  handleCorrectHiLoGuess,
  hiLoItemCount,
  handleNextHiLoItem,
  // setCurrentItemIndex,
  handleStartHiLoGame,
  handleStartPunchABunch
}) => {
  const [showRealPrice, setShowRealPrice] = useState(false);
  const [message, setMessage] = useState(null)
  const [buttonsDisabled, setButtonsDisabled] = useState(false);



  useEffect(() => {
    setShowRealPrice(false);
    setMessage(null);
  }, [item]);

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

  //TODO this need to transfer to punch a bunch
  const handleContinue = () => {
    setShowRealPrice(false);
    setButtonsDisabled(false);

    if (hiLoItemCount < 4) {
      handleNextHiLoItem();
    } else {
      // setCurrentItemIndex(null); // No more items, stop displaying
    }
  };

  if (hiLoItemCount === 0) {
    return (
      <section>
        <button onClick={handleStartHiLoGame} className="w-auto  p-4 bg-red-500 rounded-md shadow-md">Start Hi-Lo Game</button>
      </section>
    );
  }

  return (
    <main className="flex flex-col justify-center md:gap-4 gap-2">
      <div className="flex flex-col md:flex-row md:justify-between md:gap-20 md:text-md text-sm items-center">
        <h3 className="w-full md:w-1/3 text-center text-lg">Punch Count: {punchCount}</h3>
        <p className={`w-full md:w-1/3 h-6 md:h-10  text-center text-4xl alig-center text-slate-800 
        ${message === "Correct!"
            ? "text-green-300 mb-2"
            : message === "Incorrect!"
              ? "text-red-300 mb-2"
              : ""
          }`}

        >{message}</p>
        <div className=" md:w-1/3">
          {/* {(message && hiLoItemCount === 4) &&
            <button onClick={handleStartPunchABunch} className="bg-green-500 shadow-md rounded-md h-10 w-full md:w-[200px] text-xs mt-2 md:mt-0"
            >
              Start Punch-A-Bunch
            </button>
          } */}
        </div>
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
              <p className={`text-4xl ${message === 'Correct!' ? 'line-through decoration-green-500 mb-2' : 'line-through decoration-red-500 mb-2'}`}>{item?.fakePrice}</p>
              <p className="text-sm">Actual Retail Price:</p>
              <p className="text-4xl">${item?.realPrice}</p>
            </div>
          }

        </div>

        <div className="flex md:flex-col justify-center md:w-1/6 w-full">
          {message === null && hiLoItemCount < 5 ? (
            <div className="flex md:flex-col">
              <button
                className="w-20 border-2 rounded-md shadow-md m-2 hover:bg-slate-800 hover:transition-colors"
                onClick={() => handleGuess('higher')}
                disabled={buttonsDisabled}
              >
                HIGHER
              </button>
              <button
                className="w-20 border-2 rounded-md shadow-md m-2 hover:bg-slate-800 hover:transition-colors"
                onClick={() => handleGuess('lower')}
                disabled={buttonsDisabled}
              >
                LOWER
              </button>
            </div>
          ) : (
            <button
              onClick={hiLoItemCount === 4 && message ? handleStartPunchABunch : handleContinue}
              className="w-20 border-2 rounded-md shadow-md m-2 h-10  hover:bg-slate-800 hover:transition-colors"
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
