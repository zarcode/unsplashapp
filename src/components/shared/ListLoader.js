import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  spinnerWrap: {
    height: 50,
    paddingVertical: 15,
  },
});

const ListLoader = ({ loading }: boolean) => (
  <View style={styles.spinnerWrap}>{loading && <ActivityIndicator />}</View>
);

export default ListLoader;
