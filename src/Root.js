/**
 * @flow
 */

import React, {Component} from "react";
import {View, Text} from "react-native";
import configureStore from "./configureStore";
import {AppNavigator} from "./navigation/AppNavigator";
import {connect, Provider} from "react-redux";
import type {
    NavigationDispatch,
    NavigationEventCallback,
    NavigationEventPayload,
    NavigationState
} from "react-navigation";
import {addNavigationHelpers} from "react-navigation";
import {
    createReduxBoundAddListener,
    createReactNavigationReduxMiddleware
} from "react-navigation-redux-helpers";

type Props = {
    dispatch: NavigationDispatch,
    nav: NavigationState
};

const navigationMiddleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav
);
const addListener = createReduxBoundAddListener("root");

const App = props => (
    <AppNavigator
        navigation={addNavigationHelpers({
            dispatch: props.dispatch,
            state: props.nav,
            addListener
        })}
    />
);

const mapStateToProps = state => ({
    nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(App);

const store = configureStore(navigationMiddleware);

export const Root = (props: *) => (
	<View style={{flex: 1}}>
		<Provider
			style={{
				flex: 1
			}}
			store={store}
		>
            <AppWithNavigationState/>
		</Provider>
	</View>
);

export default Root;
