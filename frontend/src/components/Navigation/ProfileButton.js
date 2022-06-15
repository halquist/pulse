import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
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
    <div className='dropDownDiv'>
      <div onClick={openMenu} id='profileButton'>
        {user.username}
        <div className='profileIcon' style={{
          backgroundImage: `url(${user.profileImageUrl || user_icon})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}></div>
      </div>
      {showMenu && (
        <>
        <ul className="profile-dropdown">
          {/* <img src={user_icon} width="50" height="50" className='navIcon'/> */}
          <li>
            <div className='profileIconLarge' style={{
            backgroundImage: `url(${user.profileImageUrl || user_icon})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
            }}>
            </div>
        </li>
          <Link to="/pollfeed/user" className='iconTextNav'>
            <li>{user.username}</li>
          </Link>
          <li>{user.email}</li>
          <li>
            <button onClick={logout} id='logoutButton'>Log Out</button>
          </li>
        </ul>
        </>
      )}
    </div>
  );
}

export default ProfileButton;
