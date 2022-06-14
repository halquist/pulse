import './Navigation.css';
import bpm_symbol from '../../images/bpm_symbol.svg'

const BpmDisplay = ({ bpmCount }) => {
  return (
    <div id='bpmDisplayDiv'>
      <img src={bpm_symbol} width="14" height="14" className='navIcon'/>
      <div id='bpmDisplayText'>{bpmCount}</div>
      <div id='bpmDisplayTextDark'>bpm</div>
    </div>
  )
};

export default BpmDisplay;
