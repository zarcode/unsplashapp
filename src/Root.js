/**
 * @flow
 */

import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { connect, Provider } from 'react-redux';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import type {
  // NavigationDispatch,
  // NavigationEventCallback,
  // NavigationEventPayload,
  NavigationState,
} from 'react-navigation';
import type { Dispatch } from 'redux';
import configureStore from './configureStore';
import AppNavigator from './navigation/AppNavigator';

const navigationMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);

const addListener = createReduxBoundAddListener('root');

type Props = {
  dispatch: Dispatch,
  nav: NavigationState,
};
export const App = (props: Props) => (
  <AppNavigator
    navigation={{
      dispatch: props.dispatch,
      state: props.nav,
      addListener,
    }}
  />
);

const mapStateToProps = state => ({
  nav: state.nav,
});

export const AppWithNavigationState = connect(mapStateToProps)(App);

const store = configureStore(navigationMiddleware);

const Root = () => (
  <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
    <View style={{ flex: 1 }}>
      <Provider style={{ flex: 1 }} store={store}>
        <AppWithNavigationState />
      </Provider>
    </View>
  </SafeAreaView>
);

export default Root;
