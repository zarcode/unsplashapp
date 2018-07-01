import { byId, getById } from './users';
// import state from '../../__mocks__/state.json';
import { ACTION } from '../constants/index';

describe('users reducers', () => {
  const normalizedRes = {
    entities: {
      users: {
        userid2: { id: 'userid2' },
      },
      photos: {
        photoid: {
          id: 'photoid',
          user: 'userid2',
        },
      },
    },
    result: ['photoid'],
  };
  it('byId reducer should return the initial state', () => {
    expect(byId(undefined, {})).toEqual({});
  });

  it('byId reducer should handle photos requests', () => {
    expect(byId(
      {
        userid1: {
          id: 'userid1',
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
      userid1: {
        id: 'userid1',
      },
      userid2: {
        id: 'userid2',
      },
    });
  });
  it('getById returns user', () => {
    expect(getById({
      users: {
        userid1: {
          id: 'userid1',
        },
        userid2: {
          id: 'userid2',
        },
      },
    })('userid1')).toEqual({
      id: 'userid1',
    });
  });
});
