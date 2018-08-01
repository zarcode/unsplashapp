import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { PhotoSingleScreen } from './';

describe('<PhotoSingleScreen>', () => {
  it('renders correctly', () => {
    const props = {
      navigation: {
        setParams: jest.fn(),
      },
      photo: {
        url: 'url',
      },
    };
    const wrapper = shallow(<PhotoSingleScreen {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
