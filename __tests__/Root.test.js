import React from 'react';
// import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
// Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';
import AppNavigator from '../src/navigation/AppNavigator';
import Root from '../src/Root';
// App,

it('<Root /> renders correctly', () => {
  const wrapper = shallow(<Root />);
  expect(wrapper.find(AppNavigator).length).toBe(1);
});
