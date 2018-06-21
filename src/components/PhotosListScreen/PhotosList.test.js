import React from 'react';
import { Image } from 'react-native';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { PhotosListComponent as PhotosList } from './PhotosList';
// import type {Photo} from '../api/types';
// import {AppWithNavigationState} from '../Root';
import ListLoader from '../shared/ListLoader';
import PhotoThumb from './PhotoThumb';

jest.mock('Dimensions');

describe('<PhotosList />', () => {
  const props = {
    filter: 'latest',
    isLastPage: false,
    loadingState: 'idle',
    lastLoadedPage: 1,
    actions: {
      photosRequested: jest.fn(),
    },
  };
  const photo = {
    id: '1',
    urls: {
      small: 'url',
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
  it('creates photo model', () => {
    expect(wrapper.instance().photoViewModel(photo)).toEqual({
      id: '1',
      url: 'url',
    });
    const photo1 = {
      id: '1',
    };
    expect(wrapper.instance().photoViewModel(photo1)).toEqual({
      id: '1',
      url: null,
    });
  });
  it('render item', () => {
    const toSinglePhoto = jest.fn();
    const showProps = {
      actions: {
        toSinglePhoto,
      },
    };

    const showStateWrapper = shallow(<PhotosList {...showProps} />);
    showStateWrapper.setState({ imageDim: 500 });
    expect(showStateWrapper.instance().itemLayout({}, 2)).toEqual({
      length: 500,
      offset: 500 * 2,
      index: 2,
    });
    expect(showStateWrapper.instance().renderItem({ photo })).toEqual(<PhotoThumb
      onPress={toSinglePhoto}
      photo={{
          id: 0,
          url: null,
        }}
      size={500 - 2}
    />);
  });
  it('render loader', () => {
    const loadingProps = {
      loadingState: 'loading',
    };

    expect(wrapper.instance().renderFooter()).toEqual(null);
    const loadingStateWrapper = shallow(<PhotosList {...loadingProps} />);
    expect(loadingStateWrapper.instance().renderFooter()).toEqual(<ListLoader />);
    expect(loadingStateWrapper.instance().renderEmpty()).toEqual(null);
    expect(toJson(loadingStateWrapper)).toMatchSnapshot();
  });
  it('render empty', () => {
    const emptyProps = {
      loadingState: 'idle',
      photos: [],
      actions: {
        photosRequested: jest.fn(),
      },
    };
    const emptyStateWrapper = shallow(<PhotosList {...emptyProps} />);
    expect(emptyStateWrapper.instance().renderEmpty()).toEqual(<Image
      resizeMode="cover"
      source={{
          testUri: '../../../src/assets/icons/no-images.png',
        }}
      style={{
          height: 150,
          tintColor: 'rgba(255,255,255,0.4)',
          width: 150,
        }}
    />);
  });
  it('layout is correct', () => {
    wrapper.instance().onLayout();
    expect(wrapper.instance().state).toEqual({
      imageDim: 80,
      numColumns: 5,
    });
  });
});
