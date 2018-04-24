// @flow
import React, { Component } from 'react';
import { TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { photosRequested, toSinglePhoto } from '../action/photos';
import {
  getPhotos,
  getFilter,
  getErrorMessage,
  getIsLastPage,
  getLastLoadedPage,
  getLoadingState,
} from '../reducers/photos';
import type { Photo, PhotosFilter } from '../api/types';
import ListLoader from '../shared/ListLoader';


type Props = {
  photos: Array<Photo>,
  filter: PhotosFilter,
  isLastPage: boolean,
  lastLoadedPage: number,
  loadingState: 'refreshing' | 'loading' | 'idle',
  actions: {
    toSinglePhoto: () => void,
    photosRequested: (filter: PhotosFilter, refresh: boolean) => void
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
    this.onStart();
  }

  onLayout = () => {
    const { width, height } = Dimensions.get('window');
    let columns = 3;
    if (width > 1920) {
      columns = 5;
    }
    if (width > height) {
      columns = 5;
      if (width > 1920) {
        columns = 10;
      }
    }
    this.setState({ numColumns: columns, imageDim: Math.floor(width / columns) });
  };
  onStart = () => {
    const isLoaded = this.props.lastLoadedPage > 0;
    const isIdle = this.props.loadingState === 'idle';
    // const isRestored = this.props.isRestored;
    const isRestored = false;
    if (isIdle && (!isLoaded || isRestored)) {
      this.props.actions.photosRequested(this.props.filter, true);
    }
  };

  refresh = () => {
    this.props.actions.photosRequested(this.props.filter, true);
  };

  loadMore = () => {
    const isLoaded = this.props.lastLoadedPage > 0;
    const isIdle = this.props.loadingState === 'idle';
    const { isLastPage } = this.props;

    if (isLoaded && isIdle && !isLastPage) {
      this.props.actions.photosRequested(this.props.filter, false);
    }
  };

  photoViewModel = item => ({
    id: item.id,
    url: item.urls.small,
  });

  keyExtractor = item => item.id;

  renderItem = ({ item }) => {
    const photo = this.photoViewModel(item);
    return (
      <TouchableOpacity
        style={{
          padding: 1,
        }}
        onPress={this.props.actions.toSinglePhoto}
      >
        <Image
          style={{
            width: this.state.imageDim - 2,
            height: this.state.imageDim - 2,
          }}
          source={{
            uri: photo.url,
          }}
        />
      </TouchableOpacity>
    );
  };

  renderFooter = () => {
    if (this.props.loadingState === 'loading') {
      return <ListLoader />;
    }
    return null;
  }

  render() {
    const loading = this.props.loadingState === 'loading';
    const refreshing = this.props.loadingState === 'refreshing';

    return (
      <FlatList
        getItemLayout={(data, index) => ({
          length: this.state.imageDim,
          offset: this.state.imageDim * index,
          index,
        })}
        loading={loading}
        onLayout={this.onLayout}
        key={this.state.numColumns}
        numColumns={this.state.numColumns}
        data={this.props.photos}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        ListFooterComponent={this.renderFooter}
        refreshing={refreshing}
        onRefresh={this.refresh}
        onEndReachedThreshold={0.5}
        onEndReached={this.loadMore}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const filter = getFilter(state);
  return {
    photos: getPhotos(state),
    filter,
    isLastPage: getIsLastPage(state),
    lastLoadedPage: getLastLoadedPage(state)(filter),
    loadingState: getLoadingState(state),
    getErrorMessage: getErrorMessage(state),
  };
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ photosRequested, toSinglePhoto }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotosList);
