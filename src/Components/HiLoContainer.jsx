/* eslint-disable react/prop-types */
import HiLoGame from "./HiLoGame";



const HiLoContainer = ({ punchCount, handleCorrectHiLoGuess, hiLoItemCount, handleNextHiLoItem, handleStartPunchABunch, getRandomItem, item, handleStartHiLoGame, handleNewGame }) => {

  return (
    <section className="text-slate-200">
      <HiLoGame
        punchCount={punchCount}
        handleCorrectHiLoGuess={handleCorrectHiLoGuess}
        hiLoItemCount={hiLoItemCount}
        handleNextHiLoItem={handleNextHiLoItem}
        handleStartPunchABunch={handleStartPunchABunch}
        getRandomItem={getRandomItem}
        item={item}
        handleStartHiLoGame={handleStartHiLoGame}
        handleNewGame={handleNewGame}
      />
    </section>
  );
};

export default HiLoContainer;