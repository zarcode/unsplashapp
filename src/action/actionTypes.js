import { ACTION } from '../constants';
import type { PhotosFilter } from '../api/types';

export type PhotosAction =
  | {
      type: ACTION.CHANGE_PHOTOS_FILTER,
      filter: PhotosFilter,
    }
  | {
      type: ACTION.FETCH_PHOTOS_REQUESTED,
      filter: PhotosFilter,
      refresh: boolean,
    }
  | {
      type: ACTION.FETCH_PHOTOS_LOADING,
      filter: PhotosFilter,
      refresh: boolean,
    }
  | {
      type: ACTION.FETCH_PHOTOS_FAIL,
      error: string,
      filter: PhotosFilter,
    }
  | {
      type: ACTION.FETCH_PHOTOS_SUCCESS,
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
      type: ACTION.TO_SINGLE_PHOTO,
    };

export type Action = PhotosAction;
