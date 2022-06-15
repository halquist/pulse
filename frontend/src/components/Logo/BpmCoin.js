import './Logo.css';
import bpm_coin from '../../images/bpm_coin.svg'


const BpmCoin = () => {
  return (
    <>
      <img src={bpm_coin} width="40" height="40" className='bpmCoin' id='coin1'/>
      <img src={bpm_coin} width="40" height="40" className='bpmCoin' id='coin2'/>
      <img src={bpm_coin} width="40" height="40" className='bpmCoin' id='coin3'/>
      <img src={bpm_coin} width="40" height="40" className='bpmCoin' id='coin4'/>
      <img src={bpm_coin} width="40" height="40" className='bpmCoin' id='coin5'/>
      <img src={bpm_coin} width="40" height="40" className='bpmCoin' id='coin6'/>
    </>
  )
};

export default BpmCoin;
