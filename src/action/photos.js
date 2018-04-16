// @flow
import { ACTION } from '../constants';
import { PhotosAction } from './actionTypes';

export const photosRequested = (): PhotosAction => ({ type: ACTION.PHOTOS_REQUESTED });

export const photosLoading = (): PhotosAction => ({ type: ACTION.PHOTOS_LOADING });

export const photosSuccess = (data: string): PhotosAction =>
  ({ type: ACTION.PHOTOS_SUCCESS, data });

export const photosFail = (error): PhotosAction => ({ type: ACTION.PHOTOS_FAIL, error });
