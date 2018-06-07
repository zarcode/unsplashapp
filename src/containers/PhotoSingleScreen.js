/**
 * @flow
 */

import React from 'react';
// import PropTypes from 'prop-types';
import PhotoView from 'react-native-photo-view';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Header } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagePreview: {
    flex: 1,
    width: '100%',
  },
  topLine: {
    position: 'absolute',
    height: Header.HEIGHT,
    justifyContent: 'flex-end',
  },
  backButton: {
    backgroundColor: 'grey',
  },
});

const PhotoSingleScreen = () => (
  <View style={styles.container}>
    <PhotoView
      source={{
        uri:
          'https://images.unsplash.com/photo-1524562596000-38f0dbe5b07a?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjI0NzMwfQ&s=6642c2d7e15fc4a1d2b0d8bd65835e65',
      }}
      minimumZoomScale={0.9}
      maximumZoomScale={3}
      androidScaleType="center"
      onLoad={() => {}}
      style={styles.imagePreview}
    />
    <View style={styles.topLine}>
      <TouchableOpacity style={styles.backButton} />
    </View>
  </View>
);

PhotoSingleScreen.navigationOptions = () => ({
  header: null,
});

export default PhotoSingleScreen;
