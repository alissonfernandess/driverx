import types from './types';

export function updateUser(user) {
  return {type: types.UPDATE_USER, user};
}

export function createUser() {
  return {type: types.CREATE_USER};
}
export function checkUser() {
  return {type: types.CHECK_USER};
}
