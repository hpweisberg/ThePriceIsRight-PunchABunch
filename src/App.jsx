import { useState } from "react";

import HiLoGame from "./Components/HiLoGame";
import PrizeValues from "./Components/PrizeValues";
import TopTitle from "./Components/TopTitle";
import HiLoRules from "./Components/HiLoRules";
import PunchABunch from "./Components/PunchABunch";

import cakeStand from './assets/GamePieces/cakeStand.png';
import hydrationSystem from './assets/GamePieces/hydrationSystem.png';
import photoScanner from './assets/GamePieces/photoScanner.png';
import slicerAndWedger from './assets/GamePieces/slicerAndWedger.png';
import speakers from './assets/GamePieces/speakers.png';
import thermometer from './assets/GamePieces/thermometer.png';
import weights from './assets/GamePieces/weights.png';
import wineSet from './assets/GamePieces/wineSet.png';


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
  //TODO Track Punches, Start Punch-A-Bunch, HiLo Item Count, Item, usedItems
  const [punchCount, setPunchCount] = useState(0)
  const [startPunchABunch, setStartPunchABunch] = useState(false)
  const [hiLoItemCount, setHiLoItemCount] = useState(0)
  const [item, setItem] = useState(null)
  const [usedItems, setUsedItems] = useState({});

  //TODO Start the HiLo Game
  const handleStartHiLoGame = () => {
    setStartPunchABunch(false)
    setHiLoItemCount(0)
    setItem(null)
    setUsedItems({})
    getRandomItem()
    setHiLoItemCount(hiLoItemCount + 1)
  }

  //TODO Return to Start Screen
  const handleNewGame = () => {
    setStartPunchABunch(false)
    setHiLoItemCount(0)
    setItem(null)
    setUsedItems({})
  }

  //TODO Start Punch-A-Bunch
  const handleStartPunchABunch = () => {
    if (startPunchABunch === false) {
      setStartPunchABunch(true)
    } else {
      setStartPunchABunch(false)
    }
  }

  //TODO Add Punch
  const handleCorrectHiLoGuess = () => {
    setPunchCount(punchCount + 1)
  }

  //TODO Use Punch
  const handleUsePunch = () => {
    setPunchCount(punchCount - 1)
  }

  //TODO Find random HiLo item, prevent used items from re-appearing
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


  //TODO Display the next Item
  const handleNextHiLoItem = () => {
    if (hiLoItemCount < 4) {
      setHiLoItemCount(hiLoItemCount + 1)
      getRandomItem()
    }
  }


  return (
    <main className="flex flex-col items-center gap-1 md:gap-4 h-screen">
      <TopTitle
        startPunchABunch={startPunchABunch}
        punchCount={punchCount}
        handleStartHiLoGame={handleStartHiLoGame}
        item={item}
      />
      <div className="flex justify-center items-center h-[600px] md:h-[500px] w-[90%] md:w-[1000px] bg-slate-900/60 rounded-lg shadow-lg">
        {startPunchABunch ?
          <PunchABunch
            punchCount={punchCount}
            handleUsePunch={handleUsePunch}
            handleNewGame={handleNewGame}
          />
          :
          <HiLoGame
            punchCount={punchCount}
            handleCorrectHiLoGuess={handleCorrectHiLoGuess}
            hiLoItemCount={hiLoItemCount}
            handleNextHiLoItem={handleNextHiLoItem}
            handleStartPunchABunch={handleStartPunchABunch}
            getRandomItem={getRandomItem} item={item}
            handleStartHiLoGame={handleStartHiLoGame}
            handleNewGame={handleNewGame}
          />
        }
      </div>
      {!startPunchABunch && item != null &&
        <HiLoRules />
      }
      {punchCount > 0 && startPunchABunch &&
        <PrizeValues />
      }
    </main>
  )
}


export default App
