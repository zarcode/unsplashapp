import { ACTION } from '../constants';
import type { PhotosFilter } from '../api/types';

export type PhotosAction =
	{
		type: ACTION.FETCH_PHOTOS_REQUESTED,
		filter: PhotosFilter,
	} |
  { type: string }

export type Action = PhotosAction;
