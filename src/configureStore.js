// @flow

import logger from "redux-logger";
import {createEpicMiddleware} from "redux-observable";
import {combineReducers, createStore, applyMiddleware} from "redux";

// import rootEpic from "./epics/index";
import photos from "./reducers/photos";

import {nav} from "./reducers/nav";
import type {Middleware} from "redux";

export default (navigationMiddleware: Middleware) => {
	// const epicMiddleware = createEpicMiddleware(rootEpic);

	const middleWares: Array<*> = [
		// epicMiddleware,
		navigationMiddleware
	];

	if (__DEV__) {
		middleWares.push(logger);
	}

	const appReducer = combineReducers({
		nav,
		photos
	});

	return createStore(appReducer, applyMiddleware(...middleWares));
};
