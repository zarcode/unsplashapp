import React from 'react';
import { Image, PixelRatio } from 'react-native';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import PhotosList from './PhotosList';
// import type {Photo} from '../api/types';
// import {AppWithNavigationState} from '../Root';
import ListLoader from '../shared/ListLoader';
import PhotoThumb from './PhotoThumb';

jest.mock('Dimensions');
// jest.mock('PixelRatio');
PixelRatio.getPixelSizeForLayoutSize = jest.fn(() => 300);

describe('<PhotosList />', () => {
  const photo = {
    id: '1',
    urls: {
      thumb: 'url',
      small: 'url',
      regular: 'url',
      full: 'url',
    },
  };
  const props = {
    filter: 'latest',
    isLastPage: false,
    loadingState: 'idle',
    lastLoadedPage: 1,
    actions: {
      photosRequested: jest.fn(),
    },
    photos: [photo],
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
      photos: [photo],
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
    const showProps = {
      photos: [photo],
    };

    const showStateWrapper = shallow(<PhotosList {...showProps} />);
    showStateWrapper.setState({ imageDim: 500 });
    expect(showStateWrapper.instance().itemLayout({}, 2)).toEqual({
      length: 500,
      offset: 500 * 2,
      index: 2,
    });
    const call = showStateWrapper.instance().renderItem({ item: photo });
    const stringifyCall = JSON.stringify(call);
    expect(stringifyCall).toEqual(JSON.stringify(<PhotoThumb
      onPress={showStateWrapper.instance().navigateToSingle}
      photo={{
            id: '1',
            url: 'url',
          }}
      size={500 - 2}
    />));
  });
  it('render loader', () => {
    const loadingProps = {
      loadingState: 'loading',
      photos: [photo],
    };

    expect(wrapper.instance().renderFooter()).toEqual(<ListLoader loading={false} />);
    const loadingStateWrapper = shallow(<PhotosList {...loadingProps} />);
    expect(loadingStateWrapper.instance().renderFooter()).toEqual(<ListLoader loading />);
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
          opacity: 0.1,
          width: 150,
        }}
    />);
  });
  it('layout is correct', () => {
    wrapper.instance().onLayout();
    expect(wrapper.instance().state).toEqual({
      alertVisible: false,
      imageDim: 80,
      imagePixels: 300,
      numColumns: 5,
    });
  });
  // it('navigates to single', () => {
  //   wrapper.instance().navigateToSingle(photo)();
  //   expect(props.actions.toSinglePhoto).toBeCalledWith(photo);
  // });
});
