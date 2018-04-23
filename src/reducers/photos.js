import { createSelector } from 'reselect';
import { combineReducers } from 'redux';
import { ACTION, PHOTOS_FILTERS } from '../constants';
import type { Filter, PhotosFilter } from '../api/types';

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

const filter = (state = filters[0].id, action) => {
  if (
    action.type === ACTION.FETCH_PHOTOS_REQUESTED ||
    action.type === ACTION.CHANGE_PHOTOS_FILTER
  ) {
    return action.filter;
  }

  return state;
};

// const initialListState = {
//   ids: [],
//   loadingState: false,
//   errorMessage: null,
// };
// const list = (state = initialListState, action) => {
//   switch (action.type) {
//     case ACTION.FETCH_PHOTOS_REQUESTED:
//       return {
//         ...state,
//         errorMessage: null,
//       };
//     case ACTION.FETCH_PHOTOS_LOADING:
//       return {
//         ...state,
//         loadingState: true,
//       };
//     case ACTION.FETCH_PHOTOS_SUCCESS:
//       return {
//         ...state,
//         ids: [
//           ...state.ids,
//           ...action.response.result,
//         ],
//         errorMessage: null,
//         loadingState: false,
//       };
//     case ACTION.FETCH_PHOTOS_FAIL:
//       return {
//         ...state,
//         errorMessage: action.error,
//         loadingState: false,
//       };
//     default:
//       return state;
//   }
// };

const createList = (selectedFilter: PhotosFilter) => {
  const byId = (state = {}, action) => {
    if (action.type === ACTION.FETCH_PHOTOS_SUCCESS && selectedFilter === action.filter) {
      return {
        ...state,
        ...action.response.entities.photos,
      };
    }
    return state;
  };

  const ids = (state = [], action) => {
    if (action.type === ACTION.FETCH_PHOTOS_SUCCESS && selectedFilter === action.filter) {
      return action.refresh ?
        [...action.response.result] :
        [
          ...state,
          ...action.response.result,
        ];
    }
    return state;
  };

  const lastLoadedPage = (state = 0, action) => {
    if (action.type === ACTION.FETCH_PHOTOS_SUCCESS && selectedFilter === action.filter) {
      return action.page;
    }
    return state;
  };

  const isLastPage = (state = false, action) => {
    if (action.type === ACTION.FETCH_PHOTOS_SUCCESS && selectedFilter === action.filter) {
      return action.isLastPage;
    }
    return state;
  };

  const loadingState = (state = 'idle', action) => {
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

  const errorMessage = (state = null, action) => {
    if (selectedFilter !== action.filter) {
      return state;
    }
    switch (action.type) {
      case ACTION.FETCH_PHOTOS_FAIL:
        return action.error;
      case ACTION.FETCH_PHOTOS_REQUESTED:
      case ACTION.FETCH_PHOTOS_SUCCESS:
        return null;
      default:
        return state;
    }
  };

  return combineReducers({
    byId,
    ids,
    lastLoadedPage,
    isLastPage,
    loadingState,
    errorMessage,
  });
}

const photos = combineReducers({
  filter,
  [PHOTOS_FILTERS.LATEST]: createList(PHOTOS_FILTERS.LATEST),
  [PHOTOS_FILTERS.POPULAR]: createList(PHOTOS_FILTERS.POPULAR),
  [PHOTOS_FILTERS.OLDEST]: createList(PHOTOS_FILTERS.OLDEST),
});

export default photos;

export const getFilter = state => state.photos.filter;
const getById = state => state.photos[getFilter(state)].byId;
const getIds = state => state.photos[getFilter(state)].ids;
export const getIsLastPage = state => state.photos[getFilter(state)].isLastPage;
export const getLastLoadedPage = state =>
  selectedFilter => state.photos[selectedFilter].lastLoadedPage;
export const getLoadingState = state => state.photos[getFilter(state)].loadingState;
export const getErrorMessage = state => state.photos[getFilter(state)].errorMessage;

export const getPhotos = createSelector(
  [getIds, getById],
  (ids, byId) => ids.map(id => byId[id]),
)

