import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import user_icon from '../../images/user_icon.svg'

function ProfileButton({ user }) {

  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <div onClick={openMenu} id='profileButton'>
        {user.username}
        <img src={user_icon} width="37" height="37" className='navIcon'/>
      </div>
      {showMenu && (
        <ul className="profile-dropdown">
          {/* <img src={user_icon} width="50" height="50" className='navIcon'/> */}
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout} id='logoutButton'>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
