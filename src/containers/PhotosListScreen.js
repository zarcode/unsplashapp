import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import PhotoSingleScreen from './PhotoSingleScreen';
import { photosRequested } from '../action/photos';

class PhotosList extends Component {
  componentDidMount() {
    this.props.actions.photosRequested();
  }
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

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ photosRequested }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotosList);

