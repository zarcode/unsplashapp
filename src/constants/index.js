// @flow
export const API = {
  URL: 'https://api.unsplash.com',
};

export const ACTION = {
  CHANGE_PHOTOS_FILTER: 'CHANGE_PHOTOS_FILTER',
  FETCH_PHOTOS_REQUESTED: 'FETCH_PHOTOS_REQUESTED',
  FETCH_PHOTOS_LOADING: 'FETCH_PHOTOS_LOADING',
  FETCH_PHOTOS_SUCCESS: 'FETCH_PHOTOS_SUCCESS',
  FETCH_PHOTOS_FAIL: 'FETCH_PHOTOS_FAIL',
  TO_SINGLE_PHOTO: 'TO_SINGLE_PHOTO',
  TO_USER: 'TO_USER',
  FETCH_USER_PHOTOS_REQUESTED: 'FETCH_USER_PHOTOS_REQUESTED',
  FETCH_USER_PHOTOS_LOADING: 'FETCH_USER_PHOTOS_LOADING',
  FETCH_USER_PHOTOS_SUCCESS: 'FETCH_USER_PHOTOS_SUCCESS',
  FETCH_USER_PHOTOS_FAIL: 'FETCH_USER_PHOTOS_FAIL',
  FETCH_USER_PHOTOS_RESET: 'FETCH_USER_PHOTOS_RESET',
};

export const PHOTOS_FILTERS = {
  LATEST: 'latest',
  POPULAR: 'popular',
  OLDEST: 'oldest',
};
