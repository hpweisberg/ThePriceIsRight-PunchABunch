import { useState, useEffect } from "react"
import HiLoContainer from "./Components/HiLoContainer"

import hydrationSystem from './assets/GamePieces/hydrationSystem.png';
import cakeStand from './assets/GamePieces/cakeStand.png';
import slicerAndWedger from './assets/GamePieces/slicerAndWedger.png';
import photoScanner from './assets/GamePieces/photoScanner.png';
import thermometer from './assets/GamePieces/thermometer.png';
import wineSet from './assets/GamePieces/wineSet.png';
import speakers from './assets/GamePieces/speakers.png';
import weights from './assets/GamePieces/weights.png';
import PunchABunchContainer from "./Components/PunchABunchContainer";

const hiLoItems = [
  {
    name: "Beast Blender Hydration System",
    fakePrice: 99,
    realPrice: 175,
    image: hydrationSystem

  },
  {
    name: "Stoneware Cake Stand",
    fakePrice: 75,
    realPrice: 42,
    image: cakeStand
  },
  {
    name: "Pinapple Slicer and Wedger",
    fakePrice: 15,
    realPrice: 25,
    image: slicerAndWedger
  },
  {
    name: "Yummly Wireless Meat Thermometer",
    fakePrice: 135,
    realPrice: 100,
    image: thermometer
  },
  {
    name: "Ivation All in One Wine Set",
    fakePrice: 99,
    realPrice: 70,
    image: wineSet
  },
  {
    name: "Kodak Mini Digital Photo Scanner",
    fakePrice: 230,
    realPrice: 195,
    image: photoScanner
  },
  {
    name: "Bala Ankle and Wrist Weights",
    fakePrice: 35,
    realPrice: 55,
    image: weights
  },
  {
    name: "Surround Sound Bluetooth Speakers",
    fakePrice: 79,
    realPrice: 100,
    image: speakers
  }
]

function App() {
  const [punchCount, setPunchCount] = useState(0)
  const [startPunchABunch, setStartPunchABunch] = useState(false)
  const [hiLoItemCount, setHiLoItemCount] = useState(0)
  const [item, setItem] = useState(null)
  const [usedItems, setUsedItems] = useState({});

  const handleStartPunchABunch = () => {
    if (startPunchABunch === false) {
      setStartPunchABunch(true)
    } else {
      setStartPunchABunch(false)
    }
  }

  const handleCorrectHiLoGuess = () => {
    setPunchCount(punchCount + 1)
  }

  const handleUsePunch = () => {
    setPunchCount(punchCount - 1)
  }


  const getRandomItem = () => {
    const unusedItems = hiLoItems.filter(item => !usedItems[item.name]);

    if (unusedItems.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * unusedItems.length);
    const randomItem = unusedItems[randomIndex];

    setUsedItems(prevUsedItems => ({
      ...prevUsedItems,
      [randomItem.name]: true
    }));

    setItem(randomItem);
  };



  const handleNextHiLoItem = () => {
    if (hiLoItemCount < 4) {
      setHiLoItemCount(hiLoItemCount + 1)
      getRandomItem()
    }
  }

  const handleStartHiLoGame = () => {
    setStartPunchABunch(false)
    setHiLoItemCount(0)
    setItem(null)
    setUsedItems({})
    getRandomItem()
    setHiLoItemCount(hiLoItemCount + 1)
  }

  const handleNewGame = () => {
    setStartPunchABunch(false)
    setHiLoItemCount(0)
    setItem(null)
    setUsedItems({})
  }


  return (
    <main className="flex flex-col items-center justify-around h-screen">
      <div className="h-[10vh] flex flex-col justify-center items-center">
        <h1 className="md:text-4xl text-2xl">PUNCH-A-BUNCH</h1>
        {
          startPunchABunch === false &&
          <h3 className="text-xs md:text-md text-slate-900/70 text-center md:px-0 px-2">Guess the actual retail price of the 4 items to earn punches</h3>
        }
        {punchCount > 0 && startPunchABunch &&
          <h3 className="text-xs md:text-md text-slate-900/70 text-center md:px-0 px-2">Punch Count: {punchCount}</h3>
        }
        {
          punchCount === 0 && startPunchABunch &&
          <h3 className="text-xs md:text-md text-slate-900/70 text-center md:px-0 px-2">You can only keep 1 prize</h3>
        }
      </div>
      <div className="flex justify-center items-center h-[80vh] md:h-[60vh] w-[80vw] bg-slate-900/60 rounded-lg shadow-lg">
        {startPunchABunch ?
          <PunchABunchContainer punchCount={punchCount} handleUsePunch={handleUsePunch} handleNewGame={handleNewGame} />
          :
          <HiLoContainer punchCount={punchCount} handleCorrectHiLoGuess={handleCorrectHiLoGuess} hiLoItemCount={hiLoItemCount} handleNextHiLoItem={handleNextHiLoItem} handleStartPunchABunch={handleStartPunchABunch} getRandomItem={getRandomItem} item={item} handleStartHiLoGame={handleStartHiLoGame} handleNewGame={handleNewGame} />
        }
      </div>
      {punchCount > 0 && startPunchABunch &&
        <div className="flex flex-col md:w-3/5 justify-center items-center md:text-md text-xs md:gap-2">
          <div className="flex gap-2">
            <p>
              <span className="bg-red-400 rounded-full md:p-1 p-[3px] ">1</span>$25,000
            </p>
            <p>
              <span className="bg-red-400 rounded-full md:p-1 p-[3px] ">2</span>$10,000
            </p>
          </div>
          <div className="flex gap-2">
            <p>
              <span className="bg-red-400 rounded-full md:p-1 p-[3px]">4</span>$5,000
            </p>
            <p>
              <span className="bg-red-400 rounded-full md:p-1 p-[3px]">8</span>$2,500
            </p>
            <p>
              <span className="bg-red-400 rounded-full md:p-1 p-[3px]">10</span>$1,000
            </p>
          </div>
          <div className="flex gap-2">
            <p>
              <span className="bg-red-400 rounded-full md:p-1 p-[3px] ">10</span>$500
            </p>
            <p>
              <span className="bg-red-400 rounded-full md:p-1 p-[3px] ">10</span>$250
            </p>
            <p>
              <span className="bg-red-400 rounded-full md:p-1 p-[3px] ">5</span>$100
            </p>
          </div>
        </div>
      }
    </main>
  )
}


export default App
