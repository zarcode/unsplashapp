import React from 'react';
// import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { PhotosListComponent as PhotosList } from './PhotosList';

describe('<PhotosFilters />', () => {
  const props = {
    filter: 'latest',
    isLastPage: false,
    loadingState: 'idle',
    lastLoadedPage: 1,
    actions: {
      photosRequested: jest.fn(),
    },
  };
  const wrapper = shallow(<PhotosList {...props} />);
  it('setProps calls componentWillReceiveProps', () => {
    jest.spyOn(PhotosList.prototype, 'componentWillReceiveProps');
    wrapper.setProps({ getErrorMessage: 'Error' });
    expect(PhotosList.prototype.componentWillReceiveProps.mock.calls.length).toBe(1);
  });
  it('componentDidMount calls photosRequested', () => {
    const props1 = {
      loadingState: 'idle',
      lastLoadedPage: 0,
      filter: 'latest',
      actions: {
        photosRequested: jest.fn(),
      },
    };
    jest.spyOn(PhotosList.prototype, 'componentDidMount');
    shallow(<PhotosList {...props1} />);
    // wrapper.instance().onStart();
    expect(PhotosList.prototype.componentDidMount).toBeCalled();
    expect(props1.actions.photosRequested).toBeCalledWith('latest', true);
  });
  it('refresh calls photosRequested', () => {
    wrapper.instance().refresh();
    expect(props.actions.photosRequested).toBeCalledWith('latest', true);
  });
  it('loadMore calls photosRequested', () => {
    wrapper.instance().loadMore();
    expect(props.actions.photosRequested).toBeCalledWith('latest', false);
  });
});
