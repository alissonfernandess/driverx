import {combineReducers} from 'redux';

import app from '../modules/app/reducer';

// combinar todos os reducer da aplicação
export default combineReducers({
  app,
});
