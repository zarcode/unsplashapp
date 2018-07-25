// @flow

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import PhotosList from './PhotosList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const UserScreen = () => (
  <View style={styles.container}>
    <Text>Hello</Text>
  </View>
);

UserScreen.navigationOptions = () => ({
  header: null,
});

export default UserScreen;
