// @flow

import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../navigation/AppNavigator';

const initialState = AppNavigator.router.getStateForAction(NavigationActions.init());

export const nav = (state: * = initialState, action: *) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  switch (action.type) {
    case 'PhotoSingleScreen':
      return AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'PhotoSingleScreen' }),
        state,
      );
    default:
      return newState || state;
  }
};
