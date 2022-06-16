import React from 'react';
import { useState } from 'react';

import './TitleBar.css'

const TitleBar = ({ title, button, callback }) => {

  let buttonType = null;
  if (button === 'comment') {
    buttonType = (
      <div id='editButton' onClick={() => {callback()}}>
        <div id='addText'>Add Comment</div>
      </div>
    );
  } else {
    buttonType = null;
  }


  return (
    <div className='titleBar'>
      <div className='titleText'>{title}</div>
      {buttonType}
    </div>
  )
};

export default TitleBar;
