// @flow

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import PhotosFilters from './PhotosFilters';
import AllPhotosList from './AllPhotosList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    // height: Header.HEIGHT,
    justifyContent: 'flex-end',
    backgroundColor: 'white',
  },
});

type Props = {
  navigation: any,
};

const PhotosListScreen = (props: Props) => (
  <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
    <View style={styles.container}>
      <View style={styles.header}>
        <PhotosFilters />
      </View>
      <AllPhotosList navigation={props.navigation} />
    </View>
  </SafeAreaView>
);

PhotosListScreen.navigationOptions = () => ({
  header: null,
});

export default PhotosListScreen;
