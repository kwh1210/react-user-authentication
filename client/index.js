/*

import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from './routes';

render(<Router history={browserHistory} routes={routes}/>, document.getElementById('app'))

*/

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, browserHistory, Switch } from 'react-router-dom';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {createStore , applyMiddleware,compose} from 'redux';
import rootReducer from './rootReducer';
import setAuthorizationToken from './utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode'
import {setCurrentUser} from './actions/authActions'



//Component import
import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import NewEventPage from './components/events/NewEventPage'

import requireAuth from './utils/requireAuth'

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f=>f
  )
);

if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)))

}

render((
  <Provider store={store}>
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={Greetings} />
          <Route path="/signup" component={SignupPage} />
          <Route path ='/login' component={LoginPage} />
          <Route path ='/new-event' component={requireAuth(NewEventPage)}/>
        </Switch>
      </App>
    </Router>
  </Provider>
), document.getElementById('app'));﻿