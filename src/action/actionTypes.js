// @flow
import { ACTION } from '../constants';
import type { PhotosFilter, Photo, User } from '../api/types';

export type KeysAction = {
  type: typeof ACTION.SET_NEW_KEY,
};

export type PhotosAction =
  | {
      type: typeof ACTION.CHANGE_PHOTOS_FILTER,
      filter: PhotosFilter,
    }
  | {
      type: typeof ACTION.FETCH_PHOTOS_REQUESTED,
      filter: PhotosFilter,
      refresh: boolean,
    }
  | {
      type: typeof ACTION.FETCH_PHOTOS_LOADING,
      filter: PhotosFilter,
      refresh: boolean,
    }
  | {
      type: typeof ACTION.FETCH_PHOTOS_FAIL,
      error: string,
      filter: PhotosFilter,
    }
  | {
      type: typeof ACTION.FETCH_PHOTOS_SUCCESS,
      response: {
        entities: {
          users: any,
          photos: any,
        },
        result: Array<string>,
      },
      filter: PhotosFilter,
      page: number,
      isLastPage: boolean,
      refresh: boolean,
    }
  | {
      type: typeof ACTION.TO_SINGLE_PHOTO,
      photo: Photo,
    };

export type UsersAction = {
  type: typeof ACTION.TO_USER,
  user: User,
};

export type UserPhotosAction =
  | {
      type: typeof ACTION.FETCH_USER_PHOTOS_REQUESTED,
      username: PhotosFilter,
      refresh: boolean,
    }
  | {
      type: typeof ACTION.FETCH_USER_PHOTOS_LOADING,
      refresh: boolean,
    }
  | {
      type: typeof ACTION.FETCH_USER_PHOTOS_FAIL,
      error: string,
    }
  | {
      type: typeof ACTION.FETCH_USER_PHOTOS_RESET,
    }
  | {
      type: typeof ACTION.FETCH_USER_PHOTOS_SUCCESS,
      response: {
        entities: {
          users: any,
          photos: any,
        },
        result: Array<string>,
      },
      page: number,
      isLastPage: boolean,
      refresh: boolean,
    };

export type Action = PhotosAction | UsersAction | UserPhotosAction;
