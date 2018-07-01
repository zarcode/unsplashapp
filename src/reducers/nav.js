// @flow

import { NavigationActions } from 'react-navigation';
import AppNavigator from '../navigation/AppNavigator';
import { ACTION } from '../constants';

const initialState = AppNavigator.router.getStateForAction(NavigationActions.init());

const nav = (state: * = initialState, action: *) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  switch (action.type) {
    case ACTION.TO_SINGLE_PHOTO:
      return AppNavigator.router.getStateForAction(
        NavigationActions.navigate({
          routeName: 'PhotoSingleScreen',
          params: {
            photo: action.photo,
          },
        }),
        state,
      );
    default:
      return newState || state;
  }
};

export default nav;
