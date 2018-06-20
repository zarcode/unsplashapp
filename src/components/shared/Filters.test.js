import React from 'react';
import { TouchableOpacity } from 'react-native';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import Filters from './Filters';
import { filters } from '../../reducers/photos';

describe('<Filters />', () => {
  const props = {
    allFilters: filters,
    onFilterSelect: jest.fn(),
    currentFilter: filters[1],
  };

  const wrapper = shallow(<Filters {...props} />);
  const filterButtons = wrapper.find(TouchableOpacity);
  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('has 3 touchable components', () => {
    expect(filterButtons.length).toBe(3);
  });
  it('onPress triggers the action', () => {
    filterButtons.first().simulate('press');
    expect(props.onFilterSelect).toHaveBeenCalledWith(filters[0].id);
  });
});
