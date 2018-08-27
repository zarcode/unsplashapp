/**
 * @flow
 */

import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import store from './configureStore';
import AppNavigator from './navigation/AppNavigator';

const Root = () => (
  <View style={{ flex: 1 }}>
    <Provider style={{ flex: 1 }} store={store}>
      <AppNavigator />
    </Provider>
  </View>
);

export default Root;
