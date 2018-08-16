// @flow

import logger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import type { Middleware } from 'redux';

import rootEpic from './epics/';
import photos from './reducers/photos';
import users from './reducers/users';
import userPhotos from './reducers/userPhotos';
import keys from './reducers/keys';

import nav from './reducers/nav';

export default (navigationMiddleware: Middleware) => {
  const middleWares: Array<*> = [
    createEpicMiddleware(rootEpic),
    navigationMiddleware,
  ];

  // eslint-disable-next-line no-undef
  if (__DEV__) {
    middleWares.push(logger);
  }

  const appReducer = combineReducers({
    nav,
    photos,
    users,
    userPhotos,
    keys,
  });

  return createStore(appReducer, applyMiddleware(...middleWares));
};
