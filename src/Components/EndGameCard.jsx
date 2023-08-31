/* eslint-disable react/prop-types */
import ConfettiEffect from "./ConfettiEffect";

const EndGameCard = ({ currentPrize, handleRestart }) => {
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
  );
}

export default EndGameCard;