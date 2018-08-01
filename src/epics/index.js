import { combineEpics } from 'redux-observable';
import { loadPhotosToList } from './photos';
import { loadUserPhotosToList } from './userPhotos';

export default combineEpics(
  loadPhotosToList,
  loadUserPhotosToList,
);
