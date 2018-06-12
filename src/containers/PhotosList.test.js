import React from 'react';
// import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { PhotosListComponent as PhotosList } from './PhotosList';

describe('<PhotosFilters />', () => {
  it('setProps calls componentWillReceiveProps', () => {
    const props = {
      loadingState: 'idle',
      lastLoadedPage: 0,
      actions: {
        photosRequested: jest.fn(),
      },
    };
    jest.spyOn(PhotosList.prototype, 'componentWillReceiveProps');
    const wrapper = shallow(<PhotosList {...props} />);
    wrapper.setProps({ getErrorMessage: 'Error' });
    expect(PhotosList.prototype.componentWillReceiveProps.mock.calls.length).toBe(1);
  });
  it('componentDidMount calls photosRequested', () => {
    const props = {
      loadingState: 'idle',
      lastLoadedPage: 0,
      filter: 'latest',
      actions: {
        photosRequested: jest.fn(),
      },
    };
    jest.spyOn(PhotosList.prototype, 'componentDidMount');
    shallow(<PhotosList {...props} />);
    // wrapper.instance().onStart();
    expect(PhotosList.prototype.componentDidMount).toBeCalled();
    expect(props.actions.photosRequested).toBeCalledWith('latest', true);
  });
  it('refresh calls photosRequested', () => {
    const props = {
      filter: 'latest',
      actions: {
        photosRequested: jest.fn(),
      },
    };
    const wrapper = shallow(<PhotosList {...props} />);
    wrapper.instance().refresh();
    expect(props.actions.photosRequested.mock.calls.length).toBe(1);
    expect(props.actions.photosRequested.mock.calls[0][0]).toBe('latest');
  });
});
