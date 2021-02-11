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

export default all([takeLatest(types.CHECK_USER, checkUser)]);
