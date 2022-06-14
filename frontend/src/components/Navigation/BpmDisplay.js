import './Navigation.css';
import bpm_symbol from '../../images/bpm_symbol.svg'
import { BpmSymbol } from '../Logo';
import { useState } from 'react';

const BpmDisplay = ({ bpmCount, idPass }) => {

  return (
    <div id='bpmDisplayDiv'>
      {/* <img src={bpm_symbol} width="14" height="14" className='navIcon'/> */}
      <BpmSymbol idPass={idPass}/>
      <div id='bpmDisplayText'>{bpmCount}</div>
      <div id='bpmDisplayTextDark'>bpm</div>
    </div>
  )
};

export default BpmDisplay;
