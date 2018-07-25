import React from 'react';
import { shallow } from 'enzyme';
// Note: test renderer must be required after react-native.
import PhotosListScreen from './index';
import AllPhotosList from './AllPhotosList';

it('<PhotosListScreen/> renders correctly', () => {
  const wrapper = shallow(<PhotosListScreen />);
  expect(wrapper.find(AllPhotosList).length).toBe(1);
});
