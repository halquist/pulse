import React from 'react';

import './TitleBar.css'

const TitleBar = ({ title, button = null}) => {

  let buttonType;
  if (button = 'comment') {
    buttonType = (
      <div id='editButton'>Add Comment</div>
    );
  } else {
    buttonType = null
  }


  return (
    <div className='titleBar'>

      <div className='titleText'>{title}</div>
      {buttonType}
    </div>
  )
};

export default TitleBar;
