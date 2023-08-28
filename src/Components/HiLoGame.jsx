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
  const [userGuess, setUserGuess] = useState(null);
  const [message, setMessage] = useState(null)
  const [buttonsDisabled, setButtonsDisabled] = useState(false);



  useEffect(() => {
    setShowRealPrice(false);
    setUserGuess(null);
    setMessage(null);
  }, [item]);

  const handleGuess = (guess) => {
    setUserGuess(guess);
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
    <main className="flex flex-col justify-center gap-4">
      <div className="flex justify-between gap-20">
        <h3 className="w-1/3 text-center">Punch Count: {punchCount}</h3>
        <p className={`w-1/3 h-10 border-2 text-center text-slate-800 rounded-md shadow-md ${message === 'Correct!' ? 'bg-green-300' : message === 'Incorrect!' ? 'bg-red-300' : ''
          }`}
        >{message}</p>
        <div className="w-1/3">
          {(message && hiLoItemCount < 4) &&
            <button onClick={handleContinue} className="bg-green-500 shadow-md rounded-md h-10 w-20" >
              Continue
            </button>
          }
          {(message && hiLoItemCount === 4) &&
            <button onClick={handleStartPunchABunch} className="bg-green-500 shadow-md rounded-md h-10 w-[200px] text-xs" >
              Start Punch-A-Bunch
            </button>
          }
        </div>
      </div>
      <section className="flex gap-4">
        <div className="flex items-center text-center flex-col text-slate-200 border-2 border-red-500 w-[400px]">
          <img src={item?.image} className="w-[250px]" alt={item?.name} />
          <h2>{item?.name}</h2>
        </div>

        <div className="border-2 border-blue-400 flex flex-col justify-center w-[300px] items-center ">
          <p>${item?.fakePrice}</p>
          {showRealPrice && (
            <div className="flex flex-col">
              <p>Actual Retail Price: ${item?.realPrice}</p>
            </div>
          )}
        </div>

        <div className="border-2 border-yellow-400 flex flex-col justify-center ">
          <button className="w-20 border-2 rounded-md shadow-md m-2" onClick={() => handleGuess('higher')}
            disabled={buttonsDisabled}>HIGHER</button>

          <button className="w-20 border-2 rounded-md shadow-md m-2"
            onClick={() => handleGuess('lower')}
            disabled={buttonsDisabled}>LOWER</button>
        </div>
      </section>
    </main>
  );
};

export default HiLoGame;
