import {all} from 'redux-saga/effects';

import app from './app/sagas';

// combinar todos os sagas da aplicação
export default function* rootSaga() {
  return yield all([app]);
}
