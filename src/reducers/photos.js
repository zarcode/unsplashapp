import { createSelector } from 'reselect';
import { combineReducers } from 'redux';
import { ACTION, PHOTOS_FILTERS } from '../constants';
import type { Filter } from '../api/types';

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
  return state;
};

// const initialListState = {
//   ids: [],
//   isFetching: false,
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
//         isFetching: true,
//       };
//     case ACTION.FETCH_PHOTOS_SUCCESS:
//       return {
//         ...state,
//         ids: [
//           ...state.ids,
//           ...action.response.result,
//         ],
//         errorMessage: null,
//         isFetching: false,
//       };
//     case ACTION.FETCH_PHOTOS_FAIL:
//       return {
//         ...state,
//         errorMessage: action.error,
//         isFetching: false,
//       };
//     default:
//       return state;
//   }
// };

const createList = (selectedFilter: PHOTOS_FILTERS.LATEST | PHOTOS_FILTERS.POPULAR | PHOTOS_FILTERS.OLDEST) => {
  const byId = (state = {}, action) => {
    if (action.response) {
      return {
        ...state,
        ...action.response.entities.photos,
      };
    }
    return state;
  };

  const ids = (state = [], action) => {
    if (action.response) {
      return [
        ...state,
        ...action.response.result,
      ];
    }
    return state;
  };

  const isFetching = (state = false, action) => {
    // if (filter !== action.filter) {
    //   return state;
    // }
    switch (action.type) {
      case ACTION.FETCH_PHOTOS_REQUESTED:
        return true;
      case ACTION.FETCH_PHOTOS_SUCCESS:
      case ACTION.FETCH_PHOTOS_FAIL:
        return false;
      default:
        return state;
    }
  };

  const errorMessage = (state = null, action) => {
    // if (filter !== action.filter) {
    //   return state;
    // }
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
    isFetching,
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
export const getById = state => state.photos[getFilter(state)].byId;
export const getIds = state => state.photos[getFilter(state)].ids;
export const getIsFetching = state => state.photos[getFilter(state)].isFetching;
export const getErrorMessage = state => state.photos[getFilter(state)].errorMessage;

export const getPhotos = createSelector(
  [getIds, getById],
  (ids, byId) => ids.map(id => byId[id]),
)

