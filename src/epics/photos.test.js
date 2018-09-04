// import nock from 'nock';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { createEpicMiddleware } from 'redux-observable';
import configureMockStore from 'redux-mock-store';
import { loadPhotosToList } from './photos';
import config from '../config.json';
import { ACTION, API } from '../constants/index';
import state from '../../__mocks__/state.json';
// import api from '../api';
const mockApi = new MockAdapter(axios);

describe('fetch photos epic', () => {
  let store;
  let epicMiddleware;
  const failActionsArray = [
    {
      filter: 'latest',
      refresh: true,
      type: ACTION.FETCH_PHOTOS_REQUESTED,
    },
    {
      filter: 'latest',
      refresh: true,
      type: ACTION.FETCH_PHOTOS_LOADING,
    },
    {
      filter: 'latest',
      error: 'Request failed with status code 500',
      type: ACTION.FETCH_PHOTOS_FAIL,
    },
  ];

  beforeEach(() => {
    epicMiddleware = createEpicMiddleware(loadPhotosToList);
    const mockStore = configureMockStore([epicMiddleware]);
    store = mockStore(state);
  });

  afterEach(() => {
    // nock.cleanAll();
    epicMiddleware.replaceEpic(loadPhotosToList);
  });

  it('produces the photo model', (done) => {
    const payload = [
      {
        id: 'f_IGFcYncfQ',
        created_at: '2018-05-18T09:47:08-04:00',
        updated_at: '2018-05-19T04:25:34-04:00',
        width: 4027,
        height: 2334,
        color: '#C9906B',
        description: null,
        sponsored: false,
        likes: 19,
        liked_by_user: false,
        slug: null,
      },
    ];
    const normalizedResponse = {
      entities: {
        photos: {
          f_IGFcYncfQ: {
            id: 'f_IGFcYncfQ',
            created_at: '2018-05-18T09:47:08-04:00',
            updated_at: '2018-05-19T04:25:34-04:00',
            width: 4027,
            height: 2334,
            color: '#C9906B',
            description: null,
            sponsored: false,
            likes: 19,
            liked_by_user: false,
            slug: null,
          },
        },
      },
      result: ['f_IGFcYncfQ'],
    };
    const params = {
      page: 1,
      per_page: 30,
      order_by: 'latest',
      client_id: config.keys[0],
    };

    mockApi.onGet(`${API.URL}/photos`, { params }).reply(200, payload);

    // api.fetchPhotos(params).then((data) => {
    //   console.log("data", data);
    // });

    // nock(API.URL)
    //   .get('/photos')
    //   .query(params)
    //   .reply(200, payload);
    store.dispatch({
      type: ACTION.FETCH_PHOTOS_REQUESTED,
      filter: 'latest',
      refresh: true,
    });
    setImmediate(() => {
      expect(store.getActions()).toEqual([
        {
          filter: 'latest',
          refresh: true,
          type: ACTION.FETCH_PHOTOS_REQUESTED,
        },
        {
          filter: 'latest',
          refresh: true,
          type: ACTION.FETCH_PHOTOS_LOADING,
        },
        {
          filter: 'latest',
          refresh: true,
          response: normalizedResponse,
          page: 1,
          isLastPage: true,
          type: ACTION.FETCH_PHOTOS_SUCCESS,
        },
      ]);
      done();
    });
  });
  it('produces fail', (done) => {
    const params = {
      page: 1,
      per_page: 30,
      order_by: 'latest',
      client_id: config.keys[0],
    };

    mockApi.onGet(`${API.URL}/photos`, { params }).reply(500);
    store.dispatch({
      type: ACTION.FETCH_PHOTOS_REQUESTED,
      filter: 'latest',
      refresh: true,
    });
    setImmediate(() => {
      expect(store.getActions()).toEqual(failActionsArray);
      done();
    });
  });
  // it('throttle works', (done) => {
  //   const params = {
  //     page: 1,
  //     per_page: 30,
  //     order_by: 'latest',
  //     client_id: config.keys[0],
  //   };

  //   mockApi.onGet(`${API.URL}/photos`, { params }).reply(500);

  //   // first trigger
  //   store.dispatch({
  //     type: ACTION.FETCH_PHOTOS_REQUESTED,
  //     filter: 'latest',
  //     refresh: true,
  //   });

  //   setTimeout(() => {
  //     // second trigger after one second
  //     store.dispatch({
  //       type: ACTION.FETCH_PHOTOS_REQUESTED,
  //       filter: 'latest',
  //       refresh: true,
  //     });
  //     setImmediate(() => {
  //       expect(store.getActions()).toEqual([
  //         ...failActionsArray,
  //         {
  //           filter: 'latest',
  //           refresh: true,
  //           type: ACTION.FETCH_PHOTOS_REQUESTED,
  //         },
  //       ]);
  //       done();
  //     });
  //   }, 1000);

  //   setTimeout(() => {
  //     // third trigger after two seconds
  //     store.dispatch({
  //       type: ACTION.FETCH_PHOTOS_REQUESTED,
  //       filter: 'latest',
  //       refresh: true,
  //     });
  //     setImmediate(() => {
  //       expect(store.getActions()).toEqual([
  //         ...failActionsArray,
  //         {
  //           filter: 'latest',
  //           refresh: true,
  //           type: ACTION.FETCH_PHOTOS_REQUESTED,
  //         },
  //         {
  //           type: '@@redux-observable/EPIC_END',
  //         },
  //         ...failActionsArray,
  //       ]);
  //       done();
  //     });
  //   }, 2005);
  // });
});
