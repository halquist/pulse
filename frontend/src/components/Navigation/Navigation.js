import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import BpmDisplay from './BpmDisplay';
import Logo from '../Logo';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [idPass, setIdPass] = useState(null);

  useEffect(() => {
    setIdPass('bpm_svg_animate')
    const idPassTimeout = setTimeout(()=> setIdPass(null), 5000);
  },[sessionUser?.bpm])

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <BpmDisplay bpmCount={sessionUser.bpm} idPass={idPass}/>
        <div id='profileButton'>
          <ProfileButton user={sessionUser} />
        </div>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <div></div>
        {/* <LoginFormModal /> */}
        {/* <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink> */}
      </>
    );
  }

  return (
    <div className='navBar'>
      <ul className='navContainer'>
        <li className='navContent'>
          <Logo />
          {/* <NavLink exact to="/" className='homeText'>Home</NavLink> */}
          {/* <NavLink exact to="/polls/new" className='homeText'>New Poll</NavLink> */}
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
