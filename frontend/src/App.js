import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from './store/session';
import Navigation from "./components/Navigation";
import SideNavigation from './components/SideNavigation';
import PollForm from './components/PollForm';
import PollFocus from './components/PollFocus';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import SplashPage from './components/SplashPage';
import Texture from './components/Texture';
import PollFeed from './components/PollFeed/PollFeed';

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
    <BrowserRouter>
      {/* <Texture /> */}
      <Navigation isLoaded={loaded} />
      {loaded && (
      <div id='mainContainerDiv'>
        <Switch>
          <Route path='/signup' exact={true}>
            <SignupFormPage />
          </Route>
          <Route path='/login' exact={true}>
            <LoginFormPage />
          </Route>
          <ProtectedRoute path='/' exact={true}>
          <SideNavigation />
            <PollFeed type='latest' />
            {/* <SplashPage /> */}
          </ProtectedRoute>
          <ProtectedRoute path='/pollfeed/user' exact={true}>
          <SideNavigation />
            <PollFeed type='user' />
            {/* <SplashPage /> */}
          </ProtectedRoute>
          <ProtectedRoute path='/pollfeed/hot' exact={true}>
          <SideNavigation />
            <PollFeed type='hot' />
            {/* <SplashPage /> */}
          </ProtectedRoute>
          <ProtectedRoute path='/polls/new' exact={true}>
            <SideNavigation />
            <PollForm mode='create' />
          </ProtectedRoute>
          <ProtectedRoute path='/polls/:pollId/edit' exact={true}>
            <SideNavigation />
            <PollForm mode='edit' />
          </ProtectedRoute>
          <ProtectedRoute path='/polls/:pollId' exact={true}>
            <SideNavigation />
            <PollFocus />
          </ProtectedRoute>
          <Route path='*' exact={true}>
            <SideNavigation />
            page not found
          </Route>
        </Switch>
      </div>
      )}
    </BrowserRouter>
  );
}

export default App;
