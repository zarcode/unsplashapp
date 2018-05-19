import React from 'react';
import { shallow } from 'enzyme';
// Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';
import Root, { AppWithNavigationState } from '../src/Root';

it('<Root /> renders correctly', () => {
  const wrapper = shallow(<Root />);
  expect(wrapper.find(AppWithNavigationState).length).toBe(1);
});
