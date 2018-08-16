// @flow
import { Observable, of, from } from 'rxjs';
import {
  switchMap,
  concat,
  map,
  filter,
  catchError,
  takeUntil,
} from 'rxjs/operators';
import propPath from 'crocks/Maybe/propPath';

import { ACTION } from '../constants';
import type { Action } from '../action/actionTypes';
import changeKey from '../action/keys';
import * as photosActions from '../action/userPhotos';
import { asObservable } from './rxUtils';
import api from '../api';
import config from '../config.json';

const perPage = 30;

export const loadUserPhotosToList = (
  action$: Observable<Action>,
  state: Object,
): Observable<Action> => {
  const photosState = () => state.value.userPhotos;
  return action$.pipe(
    filter((a: Action) =>
      a.type === ACTION.FETCH_USER_PHOTOS_REQUESTED &&
        ((photosState().loadingState === 'idle' && !photosState().isLastPage) ||
          a.refresh)),
    switchMap((a) => {
      const nextPage = !a.refresh ? photosState().lastLoadedPage + 1 : 1;
      const loadingAction = of(photosActions.userPhotosLoading(a.refresh));
      const request = asObservable(api.fetchUserPhotos({
        username: a.username,
        page: nextPage,
        per_page: perPage,
        client_id: config.keys[state.value.keys],
      }));
      const requestAction = from(request).pipe(
        // tap(data => { console.log("data", data); }),
        map(data =>
          photosActions.userPhotosSuccess(
            data,
            nextPage,
            data.length < perPage,
            a.refresh,
          )),
        catchError((e) => {
          // console.log(JSON.stringify(e));
          const remaining = propPath(
            ['response', 'headers', 'x-ratelimit-remaining'],
            e,
          ).option(null);
          if (remaining === '0') {
            if (state.value.keys === config.keys.length - 1) {
              return of(photosActions.userPhotosFail('limit'));
            }
            return of(photosActions.userPhotosFail(null)).pipe(concat(
              of(changeKey()),
              of(photosActions.userPhotosFail(a.filter)),
            ));
          }
          return of(photosActions.userPhotosFail(e.message));
        }),
      );
      // requestAction.subscribe(x => console.log("-------",x));
      return loadingAction.pipe(
        concat(requestAction),
        takeUntil(action$.pipe(filter(futureAction =>
          futureAction.type === ACTION.FETCH_USER_PHOTOS_REQUESTED))),
      );
    }),
  );
};

export const moreEpics = '';
