import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import PhotoSingleScreen from './PhotoSingleScreen';

class PhotosList extends Component {
  render() {
    return (
      <View>
        <Text>List</Text>
        <TouchableOpacity
          onPress={() =>
						this.props.navigation.dispatch({
							type: 'PhotoSingleScreen',
						})
					}
        >
          <Text>To single</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

PhotosList.propTypes = {};
PhotosList.defaultProps = {};

export default PhotosList;
