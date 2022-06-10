import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from './store/session';
import Navigation from "./components/Navigation";
import PollDisplay from './components/PollDisplay';
import PollForm from './components/PollForm';
import PollFocus from './components/PollFocus';
import SplashPage from './components/SplashPage';
import Texture from './components/Texture';

function App() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setLoaded(true));
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      {/* <Texture /> */}
      <Navigation isLoaded={loaded} />
      {loaded && (
      <Switch>
        <Route path='/' exact={true}>
          <SplashPage />
        </Route>
        <Route path='/signup' exact={true}>
          <SignupFormPage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginFormPage />
        </Route>
        <Route path='/polls/new' exact={true}>
          <PollForm mode='create' />
        </Route>
        <Route path='/polls/:pollId/edit' exact={true}>
          <PollForm mode='edit' />
        </Route>
        <Route path='/polls/:pollId' exact={true}>
          <PollFocus />
        </Route>
        <Route path='*' exact={true}>
          page not found
        </Route>
      </Switch>
      )}
    </>
  );
}

export default App;
