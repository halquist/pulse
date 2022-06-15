import './Logo.css';
import { useEffect, useState } from 'react';
import bpm_symbol from '../../images/bpm_symbol.svg'

const SlotSpinner = ({ number, trigger }) => {

  const [displayNum, setDisplayNum] = useState(1);
  // const [counter, setCounter] = useState(0);

  useEffect(() => {
    const winArr = [0, 1, 5, 10, 15, 20, 25, 50, 75, 100, 1000]
    let spinnerTimeout
    let counter = 0;
    spinnerTimeout = setInterval(()=> {
      setDisplayNum(winArr[Math.floor(Math.random() * 11)])
      counter++;
      if (counter === 10) {
        clearInterval(spinnerTimeout);
        setDisplayNum(number);
        trigger();
      }
    }, 500);
  },[])

  return (
    <svg version="1.1" className="spinnerText" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
      width="42px" height="16px" viewBox="15 0 32 16" enableBackground="new 0 0 32 16" >
      <text transform="matrix(1 0 0 1 9.7695 14.9131)" fill="#FFFFFF" fontFamily="'VarelaRound-Regular'" fontSize="16">{displayNum}</text>
    </svg>
    // <svg version="1.1" className="spinnerText" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
    //   width="32px" height="16px" viewBox="0 0 32 16" enableBackground="new 0 0 32 16" >
    //   <text transform="matrix(1 0 0 1 9.7695 14.9131)" fill="#FFFFFF" fontFamily="'VarelaRound-Regular'" fontSize="16">100</text>
    // </svg>
  )
};

export default SlotSpinner;
