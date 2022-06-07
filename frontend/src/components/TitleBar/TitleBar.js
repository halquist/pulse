import React from 'react';

import './TitleBar.css'

const TitleBar = ({ title, button = null}) => {
  return (
    <div className='titleBar'>
      <div className='titleText'>{title}</div>
    </div>
  )
};

export default TitleBar;
