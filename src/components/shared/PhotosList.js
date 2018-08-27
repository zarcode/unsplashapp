// @flow
import React, { Component } from 'react';
import {
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  Alert,
  PixelRatio,
} from 'react-native';
import propPath from 'crocks/Maybe/propPath';

import type { Photo, PhotosFilter, PhotoID } from '../../api/types';
import ListLoader from '../shared/ListLoader';
import PhotoThumb from './PhotoThumb';

const noImages = require('../../assets/icons/no-images.png');

type Props = {
  photos: Array<Photo>,
  filter: PhotosFilter,
  isLastPage: boolean,
  lastLoadedPage: number,
  loadingState: 'refreshing' | 'loading' | 'idle',
  getErrorMessage: string,
  navigation: any,
  actions: {
    // toSinglePhoto: (photo: Photo) => void,
    photosRequested: (filter: PhotosFilter, refresh: boolean) => void,
    resetPhotos?: () => void,
  },
};

type State = {
  numColumns: number,
  imageDim: number,
  imagePixels: number,
  alertVisible: boolean,
};

export type PhotoViewModel = {
  id: PhotoID,
  url: string,
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class PhotosListComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const imageDim = Dimensions.get('window').width / 3;
    this.state = {
      numColumns: 3,
      imageDim: Math.floor(imageDim),
      imagePixels: PixelRatio.getPixelSizeForLayoutSize(imageDim),
      alertVisible: false,
    };
  }

  state: State;

  componentDidMount() {
    this.onStart();
  }
  componentWillReceiveProps(nextProps: Props) {
    if (
      this.props.getErrorMessage === null &&
      nextProps.getErrorMessage &&
      !this.state.alertVisible
    ) {
      this.setState({ alertVisible: true });
      if (nextProps.getErrorMessage === 'limit') {
        Alert.alert(
          'Usage limit exceeded',
          'This is just a code showcase app. Try it again in one hour.',
          [{ text: 'OK', onPress: this.onCloseAlert }],
        );
      } else {
        Alert.alert(
          'Sorry, something went wrong',
          'Please, try refreshing the list',
          [{ text: 'OK', onPress: this.onCloseAlert }],
        );
      }
    }
  }
  componentWillUnmount() {
    if (this.props.actions.resetPhotos) this.props.actions.resetPhotos();
  }
  onCloseAlert = () => {
    this.setState({ alertVisible: false });
  };
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
    const imageDim = Math.floor(width / columns);
    this.setState({
      numColumns: columns,
      imageDim,
      imagePixels: PixelRatio.getPixelSizeForLayoutSize(imageDim),
    });
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
  itemLayout = (_: *, index: number) => ({
    length: this.state.imageDim,
    offset: this.state.imageDim * index,
    index,
  });
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

  photoViewModel = (item: Photo): PhotoViewModel => {
    const { imagePixels } = this.state;
    return {
      id: propPath(['id'], item).option(''),
      url: propPath(
        ['urls', imagePixels > 200 ? 'small' : 'thumb'],
        item,
      ).option(null),
    };
  };

  keyExtractor = (item: Photo) => item.id;

  navigateToSingle = (item: Photo) => () => {
    this.props.navigation.navigate('PhotoSingleScreen', {
      photo: item,
    });
  };

  renderItem = ({ item }: Photo) => {
    const photo: PhotoViewModel = this.photoViewModel(item);
    return (
      <PhotoThumb
        onPress={this.navigateToSingle(item)}
        photo={photo}
        size={this.state.imageDim - 2}
      />
    );
  };

  renderFooter = () => {
    if (this.props.loadingState === 'loading') {
      return <ListLoader />;
    }
    return null;
  };

  renderEmpty = () => {
    if (this.props.loadingState !== 'idle') {
      return null;
    }

    return (
      <Image
        style={{
          width: 150,
          height: 150,
          opacity: 0.1,
        }}
        resizeMode="cover"
        source={noImages}
      />
    );
  };

  render() {
    const loading = this.props.loadingState === 'loading';
    const refreshing = this.props.loadingState === 'refreshing';
    return (
      <FlatList
        contentContainerStyle={
          this.props.photos.length === 0 && styles.listContainer
        }
        getItemLayout={this.itemLayout}
        loading={loading}
        onLayout={this.onLayout}
        key={this.state.numColumns}
        numColumns={this.state.numColumns}
        data={this.props.photos}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        ListEmptyComponent={this.renderEmpty}
        ListFooterComponent={this.renderFooter}
        refreshing={refreshing}
        onRefresh={this.refresh}
        onEndReachedThreshold={0.2}
        onEndReached={this.loadMore}
      />
    );
  }
}
