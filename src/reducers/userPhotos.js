// @flow
import { createSelector } from 'reselect';
import { combineReducers } from 'redux';
import { ACTION } from '../constants';
import type { Photo } from '../api/types';
import type { UserPhotosAction } from '../action/actionTypes';

const INITIAL_STATE = {
  byId: {},
  ids: [],
  lastLoadedPage: 0,
  isLastPage: false,
  loadingState: 'idle',
  errorMessage: null,
};

export const byId = (
  state: { [string]: Photo } = INITIAL_STATE.byId,
  action: UserPhotosAction,
) => {
  switch (action.type) {
    case ACTION.FETCH_USER_PHOTOS_SUCCESS:
      return {
        ...state,
        ...action.response.entities.photos,
      };
    case ACTION.FETCH_USER_PHOTOS_RESET:
      return INITIAL_STATE.byId;
    default:
      return state;
  }
};

export const ids = (
  state: Array<string> = INITIAL_STATE.ids,
  action: UserPhotosAction,
) => {
  switch (action.type) {
    case ACTION.FETCH_USER_PHOTOS_SUCCESS:
      return action.refresh
        ? [...action.response.result]
        : [...state, ...action.response.result];
    case ACTION.FETCH_USER_PHOTOS_RESET:
      return INITIAL_STATE.ids;
    default:
      return state;
  }
};

export const lastLoadedPage = (
  state: number = INITIAL_STATE.lastLoadedPage,
  action: UserPhotosAction,
) => {
  switch (action.type) {
    case ACTION.FETCH_USER_PHOTOS_SUCCESS:
      return action.page;
    case ACTION.FETCH_USER_PHOTOS_RESET:
      return INITIAL_STATE.lastLoadedPage;
    default:
      return state;
  }
};

export const isLastPage = (
  state: boolean = INITIAL_STATE.isLastPage,
  action: UserPhotosAction,
) => {
  switch (action.type) {
    case ACTION.FETCH_USER_PHOTOS_SUCCESS:
      return action.isLastPage;
    case ACTION.FETCH_USER_PHOTOS_RESET:
      return INITIAL_STATE.isLastPage;
    default:
      return state;
  }
};

export const loadingState = (
  state: 'idle' | 'refreshing' | 'loading' = INITIAL_STATE.loadingState,
  action: UserPhotosAction,
) => {
  switch (action.type) {
    case ACTION.FETCH_USER_PHOTOS_LOADING:
      return action.refresh ? 'refreshing' : 'loading';
    case ACTION.FETCH_USER_PHOTOS_RESET:
    case ACTION.FETCH_USER_PHOTOS_SUCCESS:
    case ACTION.FETCH_USER_PHOTOS_FAIL:
      return INITIAL_STATE.loadingState;
    default:
      return state;
  }
};

export const errorMessage = (
  state: string | null = INITIAL_STATE.errorMessage,
  action: UserPhotosAction,
) => {
  switch (action.type) {
    case ACTION.FETCH_USER_PHOTOS_FAIL:
      return action.error;
    case ACTION.FETCH_USER_PHOTOS_RESET:
    case ACTION.FETCH_USER_PHOTOS_REQUESTED:
    case ACTION.FETCH_USER_PHOTOS_SUCCESS:
      return INITIAL_STATE.errorMessage;
    default:
      return state;
  }
};

const userPhotos = combineReducers({
  byId,
  ids,
  lastLoadedPage,
  isLastPage,
  loadingState,
  errorMessage,
});

export default userPhotos;

export const getById = (state: any) => state.userPhotos.byId;
export const getIds = (state: any) => state.userPhotos.ids;
export const getIsLastPage = (state: any) => state.userPhotos.isLastPage;
export const getLastLoadedPage = (state: any) =>
  state.userPhotos.lastLoadedPage;
export const getLoadingState = (state: any) => state.userPhotos.loadingState;
export const getErrorMessage = (state: any) => state.userPhotos.errorMessage;

export const getPhotos = createSelector([getIds, getById], (allIds, allById) =>
  allIds.map(id => allById[id]));
