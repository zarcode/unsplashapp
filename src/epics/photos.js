// @flow
import { Observable, of, from } from 'rxjs';
import {
  switchMap,
  concat,
  map,
  filter,
  catchError,
  takeUntil,
  throttleTime,
} from 'rxjs/operators';

import { ACTION } from '../constants';
import type { Action } from '../action/actionTypes';
import * as photosActions from '../action/photos';
import { asObservable } from './rxUtils';
import api from '../api';
import type { PhotosFilter } from '../api/types';

const perPage = 30;

export const loadPhotosToList = (
  action$: Observable<Action>,
  state: Object,
): Observable<Action> => {
  const photosState = (photosFilter: PhotosFilter) =>
    state.value.photos[photosFilter];
  return (
    action$
      // .ofType(ACTION.FETCH_PHOTOS_REQUESTED)
      .pipe(
        filter((a: Action) =>
          a.type === ACTION.FETCH_PHOTOS_REQUESTED &&
            ((photosState(a.filter).loadingState === 'idle' &&
              !photosState(a.filter).isLastPage) ||
              a.refresh)),
        throttleTime(2000),
        switchMap((a) => {
          const nextPage = !a.refresh
            ? photosState(a.filter).lastLoadedPage + 1
            : 1;
          const loadingAction = of(photosActions.photosLoading(a.filter, a.refresh));
          const request = asObservable(api.fetchPhotos({
            page: nextPage,
            per_page: perPage,
            order_by: a.filter,
          }));
          const requestAction = from(request).pipe(
            // tap(data => { console.log("data", data); }),
            map(data =>
              photosActions.photosSuccess(
                data,
                a.filter,
                nextPage,
                data.length < perPage,
                a.refresh,
              )),
            catchError(e => of(photosActions.photosFail(e.message, a.filter))),
          );
          // requestAction.subscribe(x => console.log("-------",x));
          return loadingAction.pipe(
            concat(requestAction),
            takeUntil(action$.pipe(filter(futureAction =>
              futureAction.type === ACTION.FETCH_PHOTOS_REQUESTED))),
          );
        }),
      )
  );
};

export const moreEpics = '';
