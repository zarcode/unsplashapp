import { ACTION } from '../constants';
import type { KeysAction } from '../action/actionTypes';
import config from '../config.json';

const keys = (state: number = 0, action: KeysAction) => {
  if (action.type === ACTION.SET_NEW_KEY) {
    return state + 1 > config.length - 1 ? 0 : state + 1;
  }

  return state;
};

export default keys;
