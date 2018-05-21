// import nock from 'nock';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { createEpicMiddleware } from 'redux-observable';
import configureMockStore from 'redux-mock-store';
import { loadPhotosToList } from './photos';
import config from '../config.json';
import { ACTION } from '../constants';
import state from '../../models/state.json';
// import api from '../api';

const epicMiddleware = createEpicMiddleware(loadPhotosToList);
const mockStore = configureMockStore([epicMiddleware]);

const mockApi = new MockAdapter(axios);

describe('fetchUserEpic', () => {
  let store;

  beforeEach(() => {
    store = mockStore(state);
  });

  afterEach(() => {
    // nock.cleanAll();
    epicMiddleware.replaceEpic(loadPhotosToList);
  });

  it('produces the photo model', () => {
    const payload = [{
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
    }];
    const params = {
      page: 1,
      per_page: 30,
      order_by: 'latest',
      client_id: config.client_id,
    };
    // mockApi.onGet(`${config.url}/photos`, {
    //   params,
    // }).reply(200, payload);

    mockApi.onGet(`${config.url}/photos`, { params }).reply(200, payload);

    // api.fetchPhotos(params).then((data) => {
    //   console.log("data", data);
    // });

    // nock(config.url)
    //   .get('/photos')
    //   .query(params)
    //   .reply(200, payload);
    store.dispatch({
      type: ACTION.FETCH_PHOTOS_REQUESTED,
      filter: 'latest',
      refresh: true,
    });

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
        type: ACTION.FETCH_PHOTOS_SUCCESS,
      },
    ]);
  });
});
