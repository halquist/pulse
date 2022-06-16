import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import BpmDisplay from './BpmDisplay';
import Logo from '../Logo';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const dispatch = useDispatch();


  const sessionUser = useSelector(state => state.session.user);
  const [idPass, setIdPass] = useState(null);
  const [bpmScrollUp, setBpmScrollUp] = useState(sessionUser?.bpm);
  const [profileImage, setProfileImage] = useState(sessionUser?.profileImageUrl);

  useEffect(()=>{
    dispatch(sessionActions.restoreUser())
  },[sessionUser?.profileImageUrl, profileImage])

  useEffect(() => {
    setBpmScrollUp(sessionUser?.bpm)
  },[sessionUser?.id])

  useEffect(() => {
    setIdPass('bpm_svg_animate')
    const idPassTimeout = setTimeout(()=> setIdPass(null), 5000);
  },[sessionUser?.bpm])

  // increments or decrements the bpm total by 1 bpm at a time for visual purposes
  useEffect(() => {
    let bpmScrollTimeout;
    if (sessionUser) {
      if (sessionUser.bpm > bpmScrollUp) {
      bpmScrollTimeout = setTimeout(()=> setBpmScrollUp((prev)=> prev + 1), 80);
      } else if (sessionUser.bpm < bpmScrollUp) {
      bpmScrollTimeout = setTimeout(()=> setBpmScrollUp((prev)=> prev - 1), 80);
      } else {
        clearTimeout(bpmScrollTimeout);
      }
    }
  },[sessionUser?.bpm, bpmScrollUp])

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <BpmDisplay bpmCount={bpmScrollUp} idPass={idPass}/>
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
          <Link to={`/`} >
            <Logo />
          </Link>
          {/* <NavLink exact to="/" className='homeText'>Home</NavLink> */}
          {/* <NavLink exact to="/polls/new" className='homeText'>New Poll</NavLink> */}
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
