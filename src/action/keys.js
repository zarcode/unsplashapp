import { ACTION } from '../constants';
import type { KeysAction } from '../action/actionTypes';

const changeKey = (): KeysAction => ({
  type: ACTION.SET_NEW_KEY,
});

export default changeKey;
