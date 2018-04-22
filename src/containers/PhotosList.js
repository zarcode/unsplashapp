// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import PhotoSingleScreen from './PhotoSingleScreen';
import { photosRequested } from '../action/photos';
import { getPhotos, getFilter, getErrorMessage, getIsFetching } from '../reducers/photos';
import type { Photo, PhotosFilter } from '../api/types';
import { PHOTOS_FILTERS } from '../constants';
// import {List} from "immutable";
// onPress={() => this.props.navigation.dispatch({ type: 'PhotoSingleScreen' })}

type Props = {
  navigation: any,
  photos: Array<Photo>,
  filter: PhotosFilter,
  actions: {
    photosRequested: (filter: PhotosFilter) => void
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
    this.loadIfRequired(this.props.filter);
  }
  // componentDidUpdate(oldProps) {
  //   if (oldProps.filter !== this.props.filter) {
  //     this.loadIfRequired(this.props.filter);
  //   }
  // }

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

  loadIfRequired = (filter: PhotosFilter) => {
    this.props.actions.photosRequested(filter);
  }

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
      <FlatList
        onLayout={this.onLayout}
        key={this.state.numColumns}
        numColumns={this.state.numColumns}
        data={this.props.photos}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
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
  filter: getFilter(state),
  isFetching: getIsFetching(state),
  getErrorMessage: getErrorMessage(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ photosRequested }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotosList);
