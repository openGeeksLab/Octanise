import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {reducer as FormReducer} from 'redux-form';
import thunk from 'redux-thunk';
import { Main, Login, Register } from './containers';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { Router, Route, browserHistory } from 'react-router'
import { UserReducer } from './reducers';
import './style/style.css';

  const store = createStore(
  combineReducers({
    user: UserReducer,
    form: FormReducer,
    routing: routerReducer
  }),
  applyMiddleware(thunk)
);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Main}/>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
    </Router>
  </Provider>,
  document.getElementById('container')
)
