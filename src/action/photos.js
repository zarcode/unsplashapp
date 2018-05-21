// @flow

import { normalize } from 'normalizr';
import { ACTION } from '../constants';
import { PhotosAction } from './actionTypes';
import type { PhotosFilter } from '../api/types';
import * as schema from './schema';

export const changeFilter = (filter: PhotosFilter): PhotosAction =>
  ({
    type: ACTION.CHANGE_PHOTOS_FILTER,
    filter,
  });

export const photosRequested = (
  filter: PhotosFilter,
  refresh: boolean,
): PhotosAction =>
  ({
    type: ACTION.FETCH_PHOTOS_REQUESTED,
    filter,
    refresh,
  });

export const photosLoading = (
  filter: PhotosFilter,
  refresh: boolean,
): PhotosAction =>
  ({ type: ACTION.FETCH_PHOTOS_LOADING, filter, refresh });

export const photosSuccess = (
  response: any,
  filter: PhotosFilter,
  page: number,
  isLastPage: boolean,
  refresh: boolean,
): PhotosAction =>
  ({
    type: ACTION.FETCH_PHOTOS_SUCCESS,
    response: normalize(response, schema.photos),
    filter,
    page,
    isLastPage,
    refresh,
  });

export const photosFail = (error: string, filter: PhotosFilter): PhotosAction =>
  ({ type: ACTION.FETCH_PHOTOS_FAIL, error, filter });

export const toSinglePhoto = (): PhotosAction => ({ type: ACTION.TO_SINGLE_PHOTO });