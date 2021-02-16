import AsyncStorage from '@react-native-async-storage/async-storage';
import {all, put, select, call, takeLatest} from 'redux-saga/effects';

import {navigate} from '../../../routes/rootNavigation';
import api from '../../../services/api';
import types from './types';

import {updateUser, updateRide} from './actions';

export function* checkUser() {
  try {
    // get INITIAL_STATE reducer
    const {user} = yield select((state) => state.user);

    const reponse = yield call(api.post, '/ckeck-user', {email: user.email});

    const res = reponse.data;

    if (res.error) {
      alert(res.message);
      return false;
    }

    if (res.user) {
      // updating user reducer
      yield put(updateUser(res.user));

      // save user AsyncStorage
      yield call(AsyncStorage.setItem, '@user', JSON.stringify(res.user));

      navigate('Home');
    } else {
      navigate('Type');
    }
  } catch (err) {
    alert(err.message);
  }
}

export function* createUser() {
  try {
    // get INITIAL_STATE
    const {user, paymentMethod, car} = yield select((state) => state.app);

    const response = yield call(api.post, '/signup', {
      user,
      paymentMethod,
      car,
    });

    const res = response.data;

    if (res.error) {
      alert(res.message);
      return false;
    }

    // update user reducer
    yield put(updateUser(res.user));

    // save user AsyncStorage
    yield call(AsyncStorage.setItem, '@user', JSON.stringify(res.user));

    navigate('Home');
  } catch (err) {
    alert(err.message);
  }
}

export function* getRideInfos({origin, destination}) {
  try {
    const response = yield call(api.post, '/pre-ride', {origin, destination});
    const res = response.data;

    if (res.error) {
      alert(res.message);
      return false;
    }

    yield put(updateRide({info: res.info}));
    navigate('Home');
  } catch (err) {
    alert(err.message);
  }
}

export default all([
  takeLatest(types.CHECK_USER, checkUser),
  takeLatest(types.CREATE_USER, createUser),
  takeLatest(types.GET_RIDE_INFOS, getRideInfos),
]);
