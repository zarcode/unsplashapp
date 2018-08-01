// @flow
// import { combineReducers } from 'redux';
import { ACTION } from '../constants';
import type { User, UserID } from '../api/types';
import type { UserPhotosAction } from '../action/actionTypes';

export const byId = (
  state: { [string]: User } = {},
  action: UserPhotosAction,
) => {
  if (
    action.type === ACTION.FETCH_PHOTOS_SUCCESS ||
    action.type === ACTION.FETCH_USER_PHOTOS_SUCCESS
  ) {
    return {
      ...state,
      ...action.response.entities.users,
    };
  }
  return state;
};

export default byId;

export const getById = (state: any) => (id: UserID) => state.users[id];
