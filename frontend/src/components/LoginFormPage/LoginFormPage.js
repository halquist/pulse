import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import TitleBar from '../TitleBar/TitleBar';
import { NavLink } from 'react-router-dom';
import './LoginForm.css';

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to='/' />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if(data && data.errors) setErrors(data.errors);
      });
  }

  const demoLogin = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password1'})).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  }

  return (
    <div id='loginContainer'>
      <TitleBar title='Log In'/>
      <div className='loginFormDiv'>
        <form onSubmit={handleSubmit} id='loginForm'>
          <div id='loginText'>Please log in to continue</div>
          <ul className='errorList'>
            {errors.map((error, idx) => <li key={idx} className='errorText'>{error}</li>)}
          </ul>
          <label>
            Email
          </label>
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              autoFocus={true}
            />
          <label>
            Password
          </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          <div id='demoLoginDiv'>
            <button type="submit" className='pinkButton'>Log In</button>
            <button className='greenButton' onClick={demoLogin}> Demo Log In</button>
          </div>
          <NavLink to='/signup'>
            <div className='bottomText'>Don't have an account? Sign Up!</div>
          </NavLink>
        </form>
      </div>
    </div>
  )
}

export default LoginFormPage
