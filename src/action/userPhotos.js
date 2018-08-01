// @flow

import { normalize } from 'normalizr';
import { ACTION } from '../constants';
import type { UserPhotosAction } from './actionTypes';
import * as schema from './schema';

export const userPhotosRequested = (
  username: string,
  refresh: boolean,
): UserPhotosAction => ({
  type: ACTION.FETCH_USER_PHOTOS_REQUESTED,
  username,
  refresh,
});

export const userPhotosLoading = (refresh: boolean): UserPhotosAction => ({
  type: ACTION.FETCH_USER_PHOTOS_LOADING,
  refresh,
});

export const userPhotosSuccess = (
  response: any,
  page: number,
  isLastPage: boolean,
  refresh: boolean,
): UserPhotosAction => ({
  type: ACTION.FETCH_USER_PHOTOS_SUCCESS,
  response: normalize(response, schema.photos),
  page,
  isLastPage,
  refresh,
});

export const userPhotosFail = (error: string): UserPhotosAction => ({
  type: ACTION.FETCH_USER_PHOTOS_FAIL,
  error,
});

export const resetUserPhotos = (): UserPhotosAction => ({
  type: ACTION.FETCH_USER_PHOTOS_RESET,
});
