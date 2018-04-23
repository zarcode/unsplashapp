// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import PhotoSingleScreen from './PhotoSingleScreen';
import { photosRequested } from '../action/photos';
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
// import {List} from "immutable";
// onPress={() => this.props.navigation.dispatch({ type: 'PhotoSingleScreen' })}

type Props = {
  navigation: any,
  photos: Array<Photo>,
  filter: PhotosFilter,
  isLastPage: boolean,
  lastLoadedPage: number,
  loadingState: 'refreshing' | 'loading' | 'idle',
  actions: {
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
        columns = 10;
      }
    }
    this.setState({ numColumns: columns, imageDim: Math.floor(width / columns) });
  };

  // onRefresh = () => {
  //   this.loadIfRequired(true);
  //   this.setState({
  //     refreshing: true,
  //   });
  // }
  //
  // onLoadMore = () => {
  //   if (!this.props.loadingState && !this.state.refreshing) {
  //     this.loadIfRequired(false);
  //   }
  // }
  //
  // loadIfRequired = (refresh: boolean): void => {
  //   this.props.actions.photosRequested(this.props.filter, refresh);
  // }

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

PhotosList.propTypes = {
  actions: PropTypes.shape({
    photosRequested: PropTypes.func.isRequired,
  }).isRequired,
};

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
  actions: bindActionCreators({ photosRequested }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotosList);
