// @flow

import { normalize } from 'normalizr';
import { ACTION } from '../constants';
import { PhotosAction } from './actionTypes';
import type { PhotosFilter } from '../api/types';
import * as schema from './schema';

export const photosRequested =
  (filter: PhotosFilter): PhotosAction =>
    ({ type: ACTION.FETCH_PHOTOS_REQUESTED, filter });

export const photosLoading = (): PhotosAction => ({ type: ACTION.FETCH_PHOTOS_LOADING });

export const photosSuccess = (response: any, filter: PhotosFilter): PhotosAction =>
  ({ type: ACTION.FETCH_PHOTOS_SUCCESS, response: normalize(response, schema.photos), filter });

export const photosFail = (error: string): PhotosAction =>
  ({ type: ACTION.FETCH_PHOTOS_FAIL, error });
