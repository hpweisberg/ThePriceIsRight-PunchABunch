/* eslint-disable react/prop-types */
import logo from '/Punch-A-Bunch-logo.png'


const TopTitle = ({ startPunchABunch, punchCount, item }) => {
  return (
    <div className="md:h-[200px] flex flex-col justify-center items-center md:mb-2">
      <img src={logo} alt="Punch-A-Bunch Logo" className=" h-[100px] md:h-[200px] mt-2" />
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