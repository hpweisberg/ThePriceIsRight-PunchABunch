/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import logo from '/Punch-A-Bunch-logo.png'
import hulk from "/Punches/hulksm.png";
import jackieChan from '/Punches/jackieChansm.png'
import OnePunchMan from '/Punches/onePunchMansm.png'
import hulkBig from "/Punches/hulk.png";
import jackieChanBig from '/Punches/jackieChan.png'
import OnePunchManBig from '/Punches/onePunchMan.png'
import emoji from '/Punches/emojiFistsm.png'
import emojiBig from '/Punches/emojiFist.png'





const TopTitle = ({ startPunchABunch, punchCount, item }) => {
  //TODO add cursor options
  const cursorOptions = [
    { image: emoji, name: 'Emoji', display: emojiBig },
    { image: hulk, name: 'Hulk', display: hulkBig },
    { image: OnePunchMan, name: 'One Punch Man', display: OnePunchManBig },
    { image: jackieChan, name: 'Jackie Chan', display: jackieChanBig },
  ]

  //TODO Let user select the cursor
  const handleSetCursor = (cursor) => {
    const selectedMouse = cursorOptions[cursor]
    document.body.style.cursor = `url(${selectedMouse.image}), auto`;
  }

  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 400);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 400);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="md:h-[200px] flex flex-col justify-center items-center md:mb-2">
      <img src={logo} alt="Punch-A-Bunch Logo" className="h-[100px] md:h-[200px] mt-2" />
      {isWideScreen && (
        <div className='cursor-options-container'>
          {
            startPunchABunch === false && (item === null) &&
            <div className='flex items-center'>
              <p className='pr-2'>Choose your cursor:</p>
              {cursorOptions.map((option, index) => (
                <img
                  key={index}
                  onClick={() => handleSetCursor(index)}
                  src={option.display}
                  alt={option.name}
                  className="cursor-option px-1 w-10"
                />
              ))}
            </div>
          }
        </div>
      )}

      {
        startPunchABunch === false && (item != null) &&
        <div className=''>
          <p className='md:text-lg topSubTitle'>Punch Count: {punchCount}</p>
        </div>
      }
      {punchCount > 0 && startPunchABunch &&
        <h3 className="md:text-lg topSubTitle">Punch Count: {punchCount}</h3>
      }
      {
        punchCount === 0 && startPunchABunch &&
        <h3 className="md:text-md topSubTitle">You can only keep 1 prize</h3>
      }
    </div>
  );
}

export default TopTitle;
