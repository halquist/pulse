import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import TitleBar from '../TitleBar';
import { NavLink } from 'react-router-dom';



import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      try {
        return dispatch(sessionActions.signup({ email, username, password }))
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          });
      } catch (error) {
        return
      }
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

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
      <TitleBar title='Sign Up' />
      <div className='formDiv'>
        <form onSubmit={handleSubmit} id='loginForm'>
          <ul className='errorList'>
            {errors.map((error, idx) => <li key={idx} className='errorText'>{error}</li>)}
          </ul>
          <label>
            Email
          </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus={true}
            />
          <label>
            Username
          </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          <label>
            Password
          </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          <label>
            Confirm Password
          </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          <div id='demoLoginDiv'>
            <button type="submit" className='pinkButton'>Create Account</button>
            <button className='greenButton' onClick={demoLogin}>Demo Log In</button>
          </div>
          <NavLink to='/login'>
            <div className='bottomText'>Already have an account? Log In!</div>
          </NavLink>
        </form>
      </div>
    </div>
  );
}

export default SignupFormPage;
