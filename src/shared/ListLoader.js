import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  spinnerWrap: {
    paddingVertical: 15,
  },
});

const ListLoader = () => (
  <View style={styles.spinnerWrap}>
    <ActivityIndicator />
  </View>
);

export default ListLoader;
