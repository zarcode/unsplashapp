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
import type { PhotosFilter } from '../api/types';

const perPage = 30;

export const loadPhotosToList = (action: Observable<Action>, store: Object): Observable<Action> => {
  const state = (filter: PhotosFilter) => store.getState().photos[filter];
  return action
    // .ofType(ACTION.FETCH_PHOTOS_REQUESTED)
    .filter((a: Action) =>
      a.type === ACTION.FETCH_PHOTOS_REQUESTED &&
      ((state(a.filter).loadingState === 'idle' && !state(a.filter).isLastPage) || a.refresh))
    .mergeMap((a) => {
      const nextPage = !a.refresh ? state(a.filter).lastLoadedPage + 1 : 1;
      const loadingAction = Observable.of(photosActions.photosLoading(a.filter, a.refresh));
      const requestAction = asObservable(api.fetchPhotos({
        page: nextPage,
        per_page: perPage,
        order_by: a.filter,
      }))
        .map(data =>
          photosActions.photosSuccess(
            data,
            a.filter,
            nextPage,
            data.length < perPage,
            a.refresh,
          ))
        .catch(e => Observable.of(photosActions.photosFail(e.message, a.filter)));
      return Observable.concat(loadingAction, requestAction)
        .takeUntil(action
          .filter(futureAction => futureAction.type === ACTION.FETCH_PHOTOS_REQUESTED));
    });
}
