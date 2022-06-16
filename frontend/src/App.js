import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import PulseStore from './components/PulseStore';

function App() {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setLoaded(true));
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
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
          <Route path='/' exact={true}>
           {sessionUser ?
            <>
              <SideNavigation />
              <PollFeed type='latest' title='Latest Polls' />
            </>
             :
             <SplashPage />
            }
          </Route>
          <ProtectedRoute path='/pollfeed/user' exact={true}>
            <SideNavigation />
            <PollFeed type='user' title='My Polls' />
          </ProtectedRoute>
          <ProtectedRoute path='/pollfeed/:otherUserId/user' exact={true}>
            <SideNavigation />
            <PollFeed type='otherUser' title="User's Polls" />
          </ProtectedRoute>
          <ProtectedRoute path='/pollfeed/hot' exact={true}>
            <SideNavigation />
            <PollFeed type='hot' title='Hottest Polls' />
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
            <PollFocus type='focus' title='Poll Focus'/>
          </ProtectedRoute>
          <ProtectedRoute path='/store' exact={true}>
            <SideNavigation />
            <PulseStore />
          </ProtectedRoute>
          <Route path='*' exact={true}>
            <SideNavigation />
            page not found
          </Route>
        </Switch>
        <Texture />
      </div>
      )}
    </BrowserRouter>
  );
}

export default App;
