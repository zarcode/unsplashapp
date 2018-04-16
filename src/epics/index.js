import { combineEpics } from 'redux-observable';
import { loadPhotosToList } from './photos';

export default combineEpics(loadPhotosToList);
