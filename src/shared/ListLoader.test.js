import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import ListLoader from './ListLoader';

describe('<ListLoader />', () => {
  const wrapper = shallow(<ListLoader />);
  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
