import { PROMISE_CURRENCIES, REQUEST_CURRENCIES, RESPONSE_ERROR } from '../actions';
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  expenses: 0,
  currencies: [],
  error: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PROMISE_CURRENCIES:
    return {
      ...state,
    };
  case REQUEST_CURRENCIES:
    return {
      ...state,
      currencies: action.payload.filter((element) => element !== 'USDT'),
    };
  case RESPONSE_ERROR:
    return {
      ...state,
      error: action.error,
    };
  default:
    return state;
  }
};

export default wallet;
