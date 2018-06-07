// @flow

import logger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import type { Middleware } from 'redux';

import rootEpic from './epics/';
import photos from './reducers/photos';

import nav from './reducers/nav';

export default (navigationMiddleware: Middleware) => {
  const middleWares: Array<*> = [createEpicMiddleware(rootEpic), navigationMiddleware];

  if (__DEV__) { // eslint-disable-line no-undef
    middleWares.push(logger);
  }

  const appReducer = combineReducers({
    nav,
    photos,
  });

  return createStore(appReducer, applyMiddleware(...middleWares));
};
