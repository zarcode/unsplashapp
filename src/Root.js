/**
 * @flow
 */

import React from 'react';
import { View } from 'react-native';
import { connect, Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { addNavigationHelpers } from 'react-navigation';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
// import type {
//   NavigationDispatch,
//   NavigationEventCallback,
//   NavigationEventPayload,
//   NavigationState,
// } from 'react-navigation';
import configureStore from './configureStore';
import { AppNavigator } from './navigation/AppNavigator';

// type Props = {
//   dispatch: NavigationDispatch,
//   nav: NavigationState,
// };

const navigationMiddleware = createReactNavigationReduxMiddleware('root', state => state.nav);
const addListener = createReduxBoundAddListener('root');

const App = props => (
  <AppNavigator
    navigation={addNavigationHelpers({
      dispatch: props.dispatch,
      state: props.nav,
      addListener,
    })}
  />
);

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

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
