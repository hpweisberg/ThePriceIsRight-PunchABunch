import { useState } from "react"
import HiLoContainer from "./Components/HiLoContainer"

import hydrationSystem from './assets/GamePieces/hydrationSystem.png';
import cakeStand from './assets/GamePieces/cakeStand.png';
import slicerAndWedger from './assets/GamePieces/slicerAndWedger.png';
import photoScanner from './assets/GamePieces/photoScanner.png';
import thermometer from './assets/GamePieces/thermometer.png';
import wineSet from './assets/GamePieces/wineSet.png';
import speakers from './assets/GamePieces/speakers.png';
import weights from './assets/GamePieces/weights.png';

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


  console.log('punchCount: ', punchCount)
  console.log('startPunchABunch: ', startPunchABunch)
  console.log('hiLoItemCount: ', hiLoItemCount)
  console.log('item: ', item)

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
    setUsedItems({})
    getRandomItem()
    setHiLoItemCount(hiLoItemCount + 1)
    // console.log('hiLoItemCount: ', hiLoItemCount)
    // console.log('item: ', item)
  }

  return (
    <main className="flex flex-col items-center justify-around h-screen">
      <div className="h-[10vh] border-2 border-blue-400 flex justify-center items-center">
        <h1 className="md:text-4xl text-2xl">PUNCH-A-BUNCH</h1>
      </div>
      <div className="flex justify-center items-center h-[60vh] w-[80vw] border-2 border-red-400 bg-slate-900/60 rounded-lg shadow-lg">
        <HiLoContainer punchCount={punchCount} handleCorrectHiLoGuess={handleCorrectHiLoGuess} hiLoItemCount={hiLoItemCount} handleNextHiLoItem={handleNextHiLoItem} handleStartPunchABunch={handleStartPunchABunch} getRandomItem={getRandomItem} item={item} handleStartHiLoGame={handleStartHiLoGame} />
      </div>
    </main>
  )
}


export default App
