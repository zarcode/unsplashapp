// @flow

import React from 'react';
import { View, StyleSheet } from 'react-native';
import PhotosFilters from './PhotosFilters';
import PhotosList from './PhotosList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const PhotosListScreen = () => (
  <View
    style={styles.container}
  >
    <PhotosFilters />
    <PhotosList />
  </View>
);

export default PhotosListScreen;
