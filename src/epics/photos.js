// @flow
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeUntil';

import { ACTION } from '../constants';
import { Action } from '../action/actionTypes';
import * as photosActions from '../action/photos';
import { asObservable } from './rxUtils';
import api from '../api';

export const loadPhotosToList = (action: Observable<Action>): Observable<Action> =>
  action.ofType(ACTION.FETCH_PHOTOS_REQUESTED).mergeMap(() => {
    const loadingAction = Observable.of(photosActions.photosLoading());
    const requestAction = asObservable(api.fetchPhotos({}))
      .map(data => photosActions.photosSuccess(data))
      .catch(e => Observable.of(photosActions.photosFail(e.message)));
    return Observable.concat(loadingAction, requestAction).takeUntil(action.filter(futureAction => futureAction.type === ACTION.PHOTOS_REQUESTED));
  });
