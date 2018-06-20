import React from 'react';
import { shallow } from 'enzyme';
// Note: test renderer must be required after react-native.
import PhotosListScreen from './PhotosListScreen';
import PhotosList from './PhotosList';

it('<PhotosListScreen/> renders correctly', () => {
  const wrapper = shallow(<PhotosListScreen />);
  expect(wrapper.find(PhotosList).length).toBe(1);
});
