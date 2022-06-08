import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from './store/session';
import Navigation from "./components/Navigation";
import PollDisplay from './components/PollDisplay';
import PollForm from './components/PollForm';
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
        {/* <Route path='/' exact>
          <PollDisplay />
        </Route> */}
        <Route path='/signup' exact>
          <SignupFormPage />
        </Route>
        <Route path='/login' exact>
          <LoginFormPage />
        </Route>
        <Route path='/polls/new' exact>
          <PollForm />
        </Route>
        <Route path='/polls/:pollId' exact>
          <PollDisplay />
        </Route>
      </Switch>
      )}
    </>
  );
}

export default App;
