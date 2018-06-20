// @flow

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from 'react-navigation';
import PhotosFilters from './PhotosFilters';
import PhotosList from './PhotosList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: Header.HEIGHT,
    justifyContent: 'flex-end',
    backgroundColor: 'white',
  },
});

const PhotosListScreen = () => (
  <View style={styles.container}>
    <PhotosList />
  </View>
);

PhotosListScreen.navigationOptions = () => ({
  header: (
    <View style={styles.header}>
      <PhotosFilters />
    </View>
  ),
});

export default PhotosListScreen;
