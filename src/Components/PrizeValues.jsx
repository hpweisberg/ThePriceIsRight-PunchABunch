const PrizeValues = () => {
  return (
    <div className="flex flex-col md:w-3/5 justify-center items-center text-xs md:gap-1">
      <div className="flex gap-2">
        <p>
          <span className="prizeValueCircle">1</span>$25,000
        </p>
        <p>
          <span className="prizeValueCircle">2</span>$10,000
        </p>
      </div>
      <div className="flex gap-2">
        <p>
          <span className="prizeValueCircle">4</span>$5,000
        </p>
        <p>
          <span className="prizeValueCircle">8</span>$2,500
        </p>
        <p>
          <span className="prizeValueCircle">10</span>$1,000
        </p>
      </div>
      <div className="flex gap-2">
        <p>
          <span className="prizeValueCircle">10</span>$500
        </p>
        <p>
          <span className="prizeValueCircle">10</span>$250
        </p>
        <p>
          <span className="prizeValueCircle">5</span>$100
        </p>
      </div>
    </div>
  );
}

export default PrizeValues;