// @flow

import { normalize } from 'normalizr';
import { ACTION } from '../constants';
import { PhotosAction } from './actionTypes';
import * as schema from './schema';

export const photosRequested = (): PhotosAction => ({ type: ACTION.FETCH_PHOTOS_REQUESTED });

export const photosLoading = (): PhotosAction => ({ type: ACTION.FETCH_PHOTOS_LOADING });

export const photosSuccess = (response: any): PhotosAction =>
  ({ type: ACTION.FETCH_PHOTOS_SUCCESS, response: normalize(response, schema.photos) });

export const photosFail = (error: string): PhotosAction =>
  ({ type: ACTION.FETCH_PHOTOS_FAIL, error });
