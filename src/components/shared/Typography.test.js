import React from 'react';
import { Text } from 'react-native';
import { shallow } from 'enzyme';
import { AppText } from './Typography';

describe('Typography', () => {
  it('<AppText> renders correctly', () => {
    const wrapperAppText = shallow(<AppText />);
    expect(wrapperAppText.find(Text).length).toBe(1);
  });
});
