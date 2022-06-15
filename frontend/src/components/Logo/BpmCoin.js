import './Logo.css';
import bpm_coin from '../../images/bpm_coin.svg'


const BpmCoin = ({ classPass }) => {
  return (
    <>
      <img src={bpm_coin} width="40" height="40" className='bpmCoin' id={`${classPass}1`}/>
      <img src={bpm_coin} width="40" height="40" className='bpmCoin' id={`${classPass}2`}/>
      <img src={bpm_coin} width="40" height="40" className='bpmCoin' id={`${classPass}3`}/>
      <img src={bpm_coin} width="40" height="40" className='bpmCoin' id={`${classPass}4`}/>
      <img src={bpm_coin} width="40" height="40" className='bpmCoin' id={`${classPass}5`}/>
      <img src={bpm_coin} width="40" height="40" className='bpmCoin' id={`${classPass}6`}/>
    </>
  )
};

export default BpmCoin;
