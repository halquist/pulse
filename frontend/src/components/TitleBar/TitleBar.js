import React from 'react';

import './TitleBar.css'

const TitleBar = ({ title, button = null}) => {

  const buttonType = () => {
    return (
      <div className='editButton'></div>
    )
  }


  return (
    <div className='titleBar'>
      <div className='titleText'>{title}</div>
    </div>
  )
};

export default TitleBar;
