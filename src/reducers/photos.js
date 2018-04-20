import { combineReducers } from 'redux';
import { ACTION } from '../constants';
// import photo from './photo';

const initialListState = {
  ids: [],
  isFetching: false,
  errorMessage: null,
};

const byId = (state = {}, action) => {
  if (action.response) {
    return {
      ...state,
      ...action.response.entities.photos,
    };
  }
  return state;
};

const list = (state = initialListState, action) => {
  switch (action.type) {
    case ACTION.FETCH_PHOTOS_REQUESTED:
      return {
        ...state,
        errorMessage: null,
      };
    case ACTION.FETCH_PHOTOS_LOADING:
      return {
        ...state,
        isFetching: true,
      }
    case ACTION.FETCH_PHOTOS_SUCCESS:
      return {
        ...state,
        ids: [
          ...state.ids,
          ...action.response.result,
        ],
        errorMessage: null,
        isFetching: false,
      }
    case ACTION.FETCH_PHOTOS_FAIL:
      return {
        ...state,
        errorMessage: action.error,
        isFetching: false,
      }
    default:
      return state;
  }
};

//
// const ids = (state = [], action) => {
//   if (action.response) {
//     return {
//       ...state,
//       ...action.response.result,
//     };
//   }
//   return state;
// };
//
// const isFetching = (state = false, action) => {
//   // if (filter !== action.filter) {
//   //   return state;
//   // }
//   switch (action.type) {
//     case ACTION.FETCH_PHOTOS_REQUESTED:
//       return true;
//     case ACTION.FETCH_PHOTOS_SUCCESS:
//     case ACTION.FETCH_PHOTOS_FAIL:
//       return false;
//     default:
//       return state;
//   }
// };
//
// const errorMessage = (state = null, action) => {
//   // if (filter !== action.filter) {
//   //   return state;
//   // }
//   switch (action.type) {
//     case ACTION.FETCH_PHOTOS_FAIL:
//       return action.error;
//     case ACTION.FETCH_PHOTOS_REQUESTED:
//     case ACTION.FETCH_PHOTOS_SUCCESS:
//       return null;
//     default:
//       return state;
//   }
// };

// const list = combineReducers({
//   ids,
//   isFetching,
//   errorMessage,
// });

const photos = combineReducers({
  byId,
  list,
});

export default photos;

export const getPhotos = state => state.list.ids.map(id => state.byId[id]);
export const getIsFetching = state => state.list.isFetching;
export const getErrorMessage = state => state.list.errorMessage;
