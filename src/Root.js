/**
 * @flow
 */

import React from 'react';
import { View } from 'react-native';
import { connect, Provider } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
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
import { AppNavigator } from './navigation/AppNavigator';

const navigationMiddleware = createReactNavigationReduxMiddleware('root', state => state.nav);
const addListener = createReduxBoundAddListener('root');

type Props = {
  dispatch: Dispatch,
  nav: NavigationState,
}
export const App = (props:Props) => (
  <AppNavigator
    navigation={addNavigationHelpers({
      dispatch: props.dispatch,
      state: props.nav,
      addListener,
    })}
  />
);

const mapStateToProps = state => ({
  nav: state.nav,
});

export const AppWithNavigationState = connect(mapStateToProps)(App);

const store = configureStore(navigationMiddleware);

const Root = () => (
  <View style={{ flex: 1 }}>
    <Provider style={{ flex: 1 }} store={store}>
      <AppWithNavigationState />
    </Provider>
  </View>
);

export default Root;
