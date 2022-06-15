import './SideNavigation.css';
import { NavLink } from 'react-router-dom';
import home_icon from '../../images/home_icon.svg'
import plus_icon from '../../images/plus_icon.svg'
import circles_icon from '../../images/circles_icon.svg'
import flame_icon from '../../images/flame_icon.svg'
import bpm_symbol from '../../images/bpm_symbol.svg'
import { useEffect } from 'react';

const SideNavigation = () => {

  return (
    <div id='sideNavScrollContainer'>
      <div id='sideNavDiv'>
        <NavLink exact to="/" className='iconTextNav'>
          <img src={home_icon} width="20" height="20" className='navIcon'/>
          <div className='navText'>Home</div>
        </NavLink>
        <div className='spacerDiv'></div>
        <NavLink exact to="/pollfeed/user" className='iconTextNav'>
          <img src={circles_icon} width="20" height="20" className='navIcon'/>
          <div className='navText'>My Polls</div>
        </NavLink>
        <div className='spacerDiv'></div>
        <NavLink exact to="/pollfeed/hot" className='iconTextNav'>
          <img src={flame_icon} width="20" height="20" className='navIcon'/>
          <div className='navText'>Hot Polls</div>
        </NavLink>
        <div className='spacerDiv'></div>
        <NavLink exact to="/polls/new" className='iconTextNav'>
          <img src={plus_icon} width="20" height="20" className='navIcon'/>
          <div className='navText'>Create Poll</div>
        </NavLink>
        <div className='spacerDiv'></div>
        <NavLink exact to="/store" className='iconTextNav'>
          <img src={bpm_symbol} width="20" height="20" className='navIcon'/>
          <div className='navText'>Store</div>
        </NavLink>
      </div>
    </div>
  )
};

export default SideNavigation;
