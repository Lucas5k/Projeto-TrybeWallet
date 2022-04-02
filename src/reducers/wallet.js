import { PROMISE_CURRENCIES,
  REQUEST_CURRENCIES, REQUEST_EXPENSES, RESPONSE_ERROR } from '../actions';
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  expenses: [],
  currencies: [],
  id: 0,
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
  case REQUEST_EXPENSES: {
    const newObject = {
      id: state.id,
      ...action.dispesas,
      exchangeRates: action.data,
    };
    return {
      ...state,
      id: state.id + 1,
      expenses: [...state.expenses, newObject],
    };
  }
  // case SUBMIT_FULLEXPENSES: {

  //   return {
  //     ...state,
  //     fullExpenses: [...state.fullExpenses, action.todasDispensas],
  //   };}
  default:
    return state;
  }
};

export default wallet;
