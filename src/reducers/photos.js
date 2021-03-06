// @flow
import { createSelector } from 'reselect';
import { combineReducers } from 'redux';
import { ACTION, PHOTOS_FILTERS } from '../constants';
import type { Filter, Photo, PhotosFilter } from '../api/types';
import type { PhotosAction } from '../action/actionTypes';

export const filters: Array<Filter> = [
  {
    id: PHOTOS_FILTERS.LATEST,
    label: 'Latest',
  },
  {
    id: PHOTOS_FILTERS.POPULAR,
    label: 'Popular',
  },
  {
    id: PHOTOS_FILTERS.OLDEST,
    label: 'Oldest',
  },
];

export const filter = (
  state: PhotosFilter = filters[0].id,
  action: PhotosAction,
) => {
  if (
    action.type === ACTION.FETCH_PHOTOS_REQUESTED ||
    action.type === ACTION.CHANGE_PHOTOS_FILTER
  ) {
    return action.filter;
  }

  return state;
};

export const byId = (selectedFilter: PhotosFilter) => (
  state: { [string]: Photo } = {},
  action: PhotosAction,
) => {
  if (
    action.type === ACTION.FETCH_PHOTOS_SUCCESS &&
    selectedFilter === action.filter
  ) {
    return {
      ...state,
      ...action.response.entities.photos,
    };
  }
  return state;
};

export const ids = (selectedFilter: PhotosFilter) => (
  state: Array<string> = [],
  action: PhotosAction,
) => {
  if (
    action.type === ACTION.FETCH_PHOTOS_SUCCESS &&
    selectedFilter === action.filter
  ) {
    return action.refresh
      ? [...action.response.result]
      : [...state, ...action.response.result];
  }
  return state;
};

export const lastLoadedPage = (selectedFilter: PhotosFilter) => (
  state: number = 0,
  action: PhotosAction,
) => {
  if (
    action.type === ACTION.FETCH_PHOTOS_SUCCESS &&
    selectedFilter === action.filter
  ) {
    return action.page;
  }
  return state;
};

export const isLastPage = (selectedFilter: PhotosFilter) => (
  state: boolean = false,
  action: PhotosAction,
) => {
  if (
    action.type === ACTION.FETCH_PHOTOS_SUCCESS &&
    selectedFilter === action.filter
  ) {
    return action.isLastPage;
  }
  return state;
};

export const loadingState = (selectedFilter: PhotosFilter) => (
  state: 'idle' | 'refreshing' | 'loading' = 'idle',
  action: PhotosAction,
) => {
  if (selectedFilter !== action.filter) {
    return state;
  }
  switch (action.type) {
    case ACTION.FETCH_PHOTOS_LOADING:
      return action.refresh ? 'refreshing' : 'loading';
    case ACTION.FETCH_PHOTOS_SUCCESS:
    case ACTION.FETCH_PHOTOS_FAIL:
      return 'idle';
    default:
      return state;
  }
};

export const errorMessage = (selectedFilter: PhotosFilter) => (
  state: string | null = null,
  action: PhotosAction,
) => {
  if (selectedFilter !== action.filter) {
    return state;
  }
  switch (action.type) {
    case ACTION.FETCH_PHOTOS_FAIL:
      return action.error;
    case ACTION.FETCH_PHOTOS_LOADING:
    case ACTION.FETCH_PHOTOS_SUCCESS:
      return null;
    default:
      return state;
  }
};

const createList = (selectedFilter: PhotosFilter) =>
  combineReducers({
    byId: byId(selectedFilter),
    ids: ids(selectedFilter),
    lastLoadedPage: lastLoadedPage(selectedFilter),
    isLastPage: isLastPage(selectedFilter),
    loadingState: loadingState(selectedFilter),
    errorMessage: errorMessage(selectedFilter),
  });

const photos = combineReducers({
  filter,
  ...filters.reduce((acc, x) => {
    acc[x.id] = createList(x.id);
    return acc;
  }, {}),
});

export default photos;

export const getFilter = (state: any) => state.photos.filter;
export const getById = (state: any) => state.photos[getFilter(state)].byId;
export const getIds = (state: any) => state.photos[getFilter(state)].ids;
export const getIsLastPage = (state: any) =>
  state.photos[getFilter(state)].isLastPage;
export const getLastLoadedPage = (state: *) => (selectedFilter: PhotosFilter) =>
  state.photos[selectedFilter].lastLoadedPage;
export const getLoadingState = (state: any) =>
  state.photos[getFilter(state)].loadingState;
export const getErrorMessage = (state: any) =>
  state.photos[getFilter(state)].errorMessage;

export const getPhotos = createSelector([getIds, getById], (allIds, allById) =>
  allIds.map(id => allById[id]));
