// @flow

import { normalize } from 'normalizr';
import { ACTION } from '../constants';
import type { PhotosAction } from './actionTypes';
import type { PhotosFilter, Photo } from '../api/types';
import * as schema from './schema';

export const changeFilter = (filter: PhotosFilter): PhotosAction => ({
  type: ACTION.CHANGE_PHOTOS_FILTER,
  filter,
});

export const photosRequested = (
  filter: PhotosFilter,
  refresh: boolean,
): PhotosAction => ({
  type: ACTION.FETCH_PHOTOS_REQUESTED,
  filter,
  refresh,
});

export const photosLoading = (
  filter: PhotosFilter,
  refresh: boolean,
): PhotosAction => ({
  type: ACTION.FETCH_PHOTOS_LOADING,
  filter,
  refresh,
});

export const photosSuccess = (
  response: any,
  filter: PhotosFilter,
  page: number,
  isLastPage: boolean,
  refresh: boolean,
): PhotosAction => ({
  type: ACTION.FETCH_PHOTOS_SUCCESS,
  response: normalize(response, schema.photos),
  filter,
  page,
  isLastPage,
  refresh,
});

export const photosFail = (
  error: string | null,
  filter: PhotosFilter,
): PhotosAction => ({
  type: ACTION.FETCH_PHOTOS_FAIL,
  error,
  filter,
});

export const toSinglePhoto = (photo: Photo): PhotosAction => ({
  type: ACTION.TO_SINGLE_PHOTO,
  photo,
});
