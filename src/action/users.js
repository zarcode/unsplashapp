import { ACTION } from '../constants';
import { UsersAction } from './actionTypes';
import type { User } from '../api/types';

const toUser = (user: User): UsersAction => ({
  type: ACTION.TO_USER,
  user,
});

export default toUser;
