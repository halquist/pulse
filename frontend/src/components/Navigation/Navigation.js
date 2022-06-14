import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import BpmDisplay from './BpmDisplay';
import Logo from '../Logo';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <BpmDisplay bpmCount={sessionUser.bpm} />
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
