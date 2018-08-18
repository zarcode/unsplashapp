import { PHOTOS_FILTERS, ACTION } from '../constants/index';
import * as actions from './photos';

describe('photos actions', () => {
  it('should create an action to change photos request filter', () => {
    const filter = PHOTOS_FILTERS.LATEST;
    const expectedAction = {
      type: ACTION.CHANGE_PHOTOS_FILTER,
      filter,
    };
    expect(actions.changeFilter(PHOTOS_FILTERS.LATEST)).toEqual(expectedAction);
  });
  it('should create an action to start photos request', () => {
    const filter = PHOTOS_FILTERS.LATEST;
    const refresh = true;
    const expectedAction = {
      type: ACTION.FETCH_PHOTOS_REQUESTED,
      filter,
      refresh,
    };
    expect(actions.photosRequested(PHOTOS_FILTERS.LATEST, true)).toEqual(expectedAction);
  });
  it('should create an action to mark photos loading', () => {
    const filter = PHOTOS_FILTERS.LATEST;
    const refresh = true;
    const expectedAction = {
      type: ACTION.FETCH_PHOTOS_LOADING,
      filter,
      refresh,
    };
    expect(actions.photosLoading(PHOTOS_FILTERS.LATEST, true)).toEqual(expectedAction);
  });
  it('should create an action to mark photos request failure', () => {
    const filter = PHOTOS_FILTERS.LATEST;
    const error = 'Some error happened';
    const expectedAction = {
      type: ACTION.FETCH_PHOTOS_FAIL,
      error,
      filter,
    };
    expect(actions.photosFail('Some error happened', PHOTOS_FILTERS.LATEST)).toEqual(expectedAction);
  });
  it('should create an action to mark photos request success', () => {
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
      result: ['photoid'],
    };
    const filter = PHOTOS_FILTERS.LATEST;
    const page = 1;
    const isLastPage = false;
    const refresh = true;
    const expectedAction = {
      type: ACTION.FETCH_PHOTOS_SUCCESS,
      response: normalizedRes,
      filter,
      page,
      isLastPage,
      refresh,
    };
    expect(actions.photosSuccess(
      [
        {
          id: 'photoid',
          user: {
            id: 'userid',
          },
        },
      ],
      PHOTOS_FILTERS.LATEST,
      1,
      false,
      true,
    )).toEqual(expectedAction);
  });

  // it('should create an action navigate to single photo screen', () => {
  //   const expectedAction = {
  //     type: ACTION.TO_SINGLE_PHOTO,
  //   };
  //   expect(actions.toSinglePhoto()).toEqual(expectedAction);
  // });
});
