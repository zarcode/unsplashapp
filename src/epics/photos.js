// @flow
import { Observable, of } from 'rxjs';
import {
  mergeMap,
  concat,
  map,
  filter,
  catchError,
  takeUntil,
} from 'rxjs/operators';

import { ACTION } from '../constants';
import { Action } from '../action/actionTypes';
import * as photosActions from '../action/photos';
import { asObservable } from './rxUtils';
import api from '../api';
import type { PhotosFilter } from '../api/types';

const perPage = 30;

export const loadPhotosToList = (action: Observable<Action>, store: Object): Observable<Action> => {
  const state = (photosFilter: PhotosFilter) => store.getState().photos[photosFilter];
  return action
  // .ofType(ACTION.FETCH_PHOTOS_REQUESTED)
    .pipe(
      filter((a: Action) =>
        a.type === ACTION.FETCH_PHOTOS_REQUESTED &&
        ((state(a.filter).loadingState === 'idle' && !state(a.filter).isLastPage) || a.refresh)),
      mergeMap((a) => {
        const nextPage = !a.refresh ? state(a.filter).lastLoadedPage + 1 : 1;
        const loadingAction = of(photosActions.photosLoading(a.filter, a.refresh));
        const requestAction = asObservable(api.fetchPhotos({
          page: nextPage,
          per_page: perPage,
          order_by: a.filter,
        }))
          .pipe(
            map(data =>
              photosActions.photosSuccess(
                data,
                a.filter,
                nextPage,
                data.length < perPage,
                a.refresh,
              )),
            catchError(e => of(photosActions.photosFail(e.message, a.filter)))
          );
        return loadingAction
          .pipe(
            concat(requestAction),
            takeUntil(action
              .pipe(filter(futureAction => futureAction.type === ACTION.FETCH_PHOTOS_REQUESTED))),
          );
      }),
    );
}
