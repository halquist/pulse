import './Logo.css';
import bpm_coin from '../../images/bpm_coin.svg';

// Simple Firefox detection so we can skip the coin animation there.
const isFirefox =
  typeof navigator !== 'undefined' &&
  /firefox/i.test(navigator.userAgent || '');

const BpmCoin = ({ classPass }) => {
  if (isFirefox) return null;

  return (
    <>
      <img src={bpm_coin} width="40" height="40" className='bpmCoin' id={`${classPass}1`} alt="" />
      <img src={bpm_coin} width="40" height="40" className='bpmCoin' id={`${classPass}2`} alt="" />
      <img src={bpm_coin} width="40" height="40" className='bpmCoin' id={`${classPass}3`} alt="" />
      <img src={bpm_coin} width="40" height="40" className='bpmCoin' id={`${classPass}4`} alt="" />
      <img src={bpm_coin} width="40" height="40" className='bpmCoin' id={`${classPass}5`} alt="" />
      <img src={bpm_coin} width="40" height="40" className='bpmCoin' id={`${classPass}6`} alt="" />
    </>
  );
};

export default BpmCoin;

