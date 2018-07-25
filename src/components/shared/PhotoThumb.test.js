import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import PhotoThumb from './PhotoThumb';

describe('<PhotoThumb>', () => {
  it('renders correctly', () => {
    const props = {
      photo: {
        url: 'url',
      },
    };
    const wrapper = shallow(<PhotoThumb {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
