// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import PhotoSingleScreen from './PhotoSingleScreen';
import { photosRequested } from '../action/photos';
import { getPhotos, getErrorMessage, getIsFetching } from '../reducers/photos';
import type { Photo } from '../api/types';
import PhotosFilters from './PhotosFilters';
// import {List} from "immutable";
// onPress={() => this.props.navigation.dispatch({ type: 'PhotoSingleScreen' })}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

type Props = {
  navigation: any,
  photos: Array<Photo>, // todo
  actions: {
    photosRequested: () => void
  }
};

type State = {
  numColumns: number,
  imageDim: number,
};

class PhotosList extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      numColumns: 3,
      imageDim: Math.floor(Dimensions.get('window').width / 3),
    };
  }

  state: State;

  componentDidMount() {
    this.props.actions.photosRequested();
  }

  onPress = () => {}

  onLayout = () => {
    const { width, height } = Dimensions.get('window');
    let columns = 3;
    if (width > 1920) {
      columns = 5;
    }
    if (width > height) {
      columns = 5;
      if (width > 1920) {
        columns = 7;
      }
    }
    this.setState({ numColumns: columns, imageDim: Math.floor(width / columns) });
  };

  photoViewModel = item => ({
    id: item.id,
    url: item.urls.small,
  });

  keyExtractor = item => item.id;

  renderItem = ({ item }) => {
    const photo = this.photoViewModel(item);
    return (
      <TouchableOpacity onPress={this.onPress}>
        <Image
          style={{
            width: this.state.imageDim,
            height: this.state.imageDim,
          }}
          source={{
            uri: photo.url,
          }}
        />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View
        onLayout={this.onLayout}
        style={styles.container}
      >
        <PhotosFilters />
        <FlatList
          key={this.state.numColumns}
          numColumns={this.state.numColumns}
          data={this.props.photos}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

PhotosList.propTypes = {
  actions: PropTypes.shape({
    photosRequested: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  photos: getPhotos(state),
  isFetching: getIsFetching(state),
  getErrorMessage: getErrorMessage(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ photosRequested }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotosList);
