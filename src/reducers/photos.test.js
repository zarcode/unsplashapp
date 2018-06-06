import {
  filter,
  filters,
  byId,
  ids,
  lastLoadedPage,
  isLastPage,
  loadingState,
  errorMessage,
  getFilter,
} from './photos';
import state from '../../models/state.json';
import { ACTION } from '../constants/index';

const normalizedRes = {
  entities: {
    users: {
      userid: { id: 'userid' },
    },
    photos: {
      photoid: {
        id: 'photoid',
        user: 'userid',
      },
    },
  },
  result: [
    'photoid',
  ],
};

describe('photos reducers', () => {
  it('filter reducer should return the initial state', () => {
    expect(filter(undefined, {})).toEqual(filters[0].id);
  });

  it('filter reducer should handle filter changes', () => {
    expect(filter(
      'latest',
      {
        type: ACTION.FETCH_PHOTOS_REQUESTED,
        filter: 'popular',
        refresh: true,
      },
    )).toEqual('popular');
    expect(filter(
      'latest',
      {
        type: ACTION.CHANGE_PHOTOS_FILTER,
        filter: 'popular',
      },
    )).toEqual('popular');
  });

  it('byId reducer should handle request success', () => {
    expect(byId('latest')(
      {},
      {
        type: ACTION.FETCH_PHOTOS_SUCCESS,
        response: normalizedRes,
        filter: 'latest',
        page: 1,
        isLastPage: false,
        refresh: false,
      },
    )).toEqual({
      photoid: {
        id: 'photoid',
        user: 'userid',
      },
    });
    expect(byId('latest')(
      {
        photoid1: {
          id: 'photoid1',
          user: 'userid',
        },
      },
      {
        type: ACTION.FETCH_PHOTOS_SUCCESS,
        response: normalizedRes,
        filter: 'latest',
        page: 1,
        isLastPage: false,
        refresh: false,
      },
    )).toEqual({
      photoid1: {
        id: 'photoid1',
        user: 'userid',
      },
      photoid: {
        id: 'photoid',
        user: 'userid',
      },
    });
    expect(byId('latest')(
      {},
      {
        type: ACTION.FETCH_PHOTOS_SUCCESS,
        response: normalizedRes,
        filter: 'popular',
        page: 1,
        isLastPage: false,
        refresh: false,
      },
    )).toEqual({});
  });

  it('ids reducer should handle request success', () => {
    expect(ids('latest')(
      [],
      {
        type: ACTION.FETCH_PHOTOS_SUCCESS,
        response: normalizedRes,
        filter: 'latest',
        page: 1,
        isLastPage: false,
        refresh: false,
      },
    )).toEqual([
      'photoid',
    ]);
    expect(ids('latest')(
      [],
      {
        type: ACTION.FETCH_PHOTOS_SUCCESS,
        response: normalizedRes,
        filter: 'popular',
        page: 1,
        isLastPage: false,
        refresh: false,
      },
    )).toEqual([]);
    expect(ids('latest')(
      [
        'photoid1',
      ],
      {
        type: ACTION.FETCH_PHOTOS_SUCCESS,
        response: normalizedRes,
        filter: 'latest',
        page: 1,
        isLastPage: false,
        refresh: false,
      },
    )).toEqual([
      'photoid1',
      'photoid',
    ]);
    expect(ids('latest')(
      [
        'photoid1',
      ],
      {
        type: ACTION.FETCH_PHOTOS_SUCCESS,
        response: normalizedRes,
        filter: 'latest',
        page: 1,
        isLastPage: false,
        refresh: true,
      },
    )).toEqual([
      'photoid',
    ]);
  });

  it('lastLoadedPage reducer should handle request success', () => {
    expect(lastLoadedPage('latest')(
      0,
      {
        type: ACTION.FETCH_PHOTOS_SUCCESS,
        response: normalizedRes,
        filter: 'latest',
        page: 2,
        isLastPage: false,
        refresh: false,
      },
    )).toEqual(2);
  });

  it('isLastPage reducer should handle request success', () => {
    expect(isLastPage('latest')(
      false,
      {
        type: ACTION.FETCH_PHOTOS_SUCCESS,
        response: normalizedRes,
        filter: 'latest',
        page: 2,
        isLastPage: true,
        refresh: false,
      },
    )).toEqual(true);
  });

  it('loadingState reducer should handle request success', () => {
    expect(loadingState('latest')(
      'loading',
      {
        type: ACTION.FETCH_PHOTOS_SUCCESS,
        response: normalizedRes,
        filter: 'latest',
        page: 2,
        isLastPage: true,
        refresh: false,
      },
    )).toEqual('idle');
  });

  it('loadingState reducer should handle request failure', () => {
    expect(loadingState('latest')(
      'loading',
      {
        type: ACTION.FETCH_PHOTOS_FAIL,
        error: 'Some error',
        filter: 'latest',
      },
    )).toEqual('idle');
  });

  it('loadingState reducer should handle request loading', () => {
    expect(loadingState('latest')(
      'idle',
      {
        type: ACTION.FETCH_PHOTOS_LOADING,
        filter: 'latest',
        refresh: false,
      },
    )).toEqual('loading');
    expect(loadingState('latest')(
      'idle',
      {
        type: ACTION.FETCH_PHOTOS_LOADING,
        filter: 'latest',
        refresh: true,
      },
    )).toEqual('refreshing');
  });

  it('errorMessage reducer should handle request failure', () => {
    expect(errorMessage('latest')(
      null,
      {
        type: ACTION.FETCH_PHOTOS_FAIL,
        error: 'Some error',
        filter: 'latest',
      },
    )).toEqual('Some error');
  });

  it('errorMessage reducer should handle request success', () => {
    expect(errorMessage('latest')(
      'Some error',
      {
        type: ACTION.FETCH_PHOTOS_SUCCESS,
        response: normalizedRes,
        filter: 'latest',
        page: 2,
        isLastPage: true,
        refresh: false,
      },
    )).toEqual(null);
  });
  // selectors
  it('getFilter selector returns filter', () => {
    expect(getFilter(state)).toEqual('latest');
  });
});
