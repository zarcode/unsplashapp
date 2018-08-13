// @flow
import React, { Component } from 'react';
import { FlatList, Dimensions, StyleSheet, Image, Alert } from 'react-native';
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
  actions: {
    toSinglePhoto: (photo: Photo) => void,
    photosRequested: (filter: PhotosFilter, refresh: boolean) => void,
    resetPhotos?: () => void,
  },
};

type State = {
  numColumns: number,
  imageDim: number,
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

    this.state = {
      numColumns: 3,
      imageDim: Math.floor(Dimensions.get('window').width / 3),
    };
  }

  state: State;

  componentDidMount() {
    this.onStart();
  }
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.getErrorMessage) {
      Alert.alert(
        'Sorry, something went wrong',
        'Please, try refreshing the list',
        [{ text: 'OK', onPress: null }],
      );
    }
  }
  componentWillUnmount() {
    if (this.props.actions.resetPhotos) this.props.actions.resetPhotos();
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
    this.setState({
      numColumns: columns,
      imageDim: Math.floor(width / columns),
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

  photoViewModel = (item: Photo): PhotoViewModel => ({
    id: propPath(['id'], item).option(''),
    url: propPath(['urls', 'small'], item).option(null),
  });

  keyExtractor = (item: Photo) => item.id;

  navigateToSingle = (item: Photo) => () =>
    this.props.actions.toSinglePhoto(item);

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
    const errorHappend =
      this.props.loadingState === 'idle' && this.props.getErrorMessage;
    return (
      <FlatList
        contentContainerStyle={
          (errorHappend || this.props.photos.length === 0) &&
          styles.listContainer
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
        onEndReachedThreshold={0.5}
        onEndReached={this.loadMore}
      />
    );
  }
}
