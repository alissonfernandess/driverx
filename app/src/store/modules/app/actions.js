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

export function updateCar(car) {
  return {type: types.UPDATE_CAR, car};
}

export function updatePayment(payment) {
  return {type: types.UPDATE_PAYMENT, payment};
}
