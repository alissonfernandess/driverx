import types from './types';
import produce from 'immer';

const INITIAL_STATE = {
  user: {
    fbId: null,
    nome: null,
    email: null,
    tipo: 'M',
    acessToken: null,
  },
  car: {placa: null, marca: null, modelo: null, cor: null},
  paymentMethod: {nome: null, numero: null, validade: null, cvv: null},
};

function app(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.UPDATE_USER: {
      return produce(state, (draft) => {
        draft.user = {...state.user, ...action.user};
      });
    }
    case types.UPDATE_CAR: {
      return produce(state, (draft) => {
        draft.car = {...state.car, ...action.car};
      });
    }

    default:
      return state;
  }
}

export default app;
