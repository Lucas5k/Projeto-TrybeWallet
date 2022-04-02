import { ALLEXPENSES, PROMISE_CURRENCIES,
  REQUEST_CURRENCIES, RESPONSE_ERROR } from '../actions';
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  expenses: [],
  currencies: [],
  error: '',
  // fullExpenses: [],
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
  case ALLEXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.dispesas],
    };
  // case SUBMIT_FULLEXPENSES:
  //   return {
  //     ...state,
  //     fullExpenses: [...state.fullExpenses, action.todasDispensas],
  //   };
  default:
    return state;
  }
};

export default wallet;
