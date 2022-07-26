import { ENABLED_BUTTON, PROMISE_CURRENCIES,
  REMOVEID,
  REQUEST_CURRENCIES, REQUEST_EXPENSES } from '../actions';
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  expenses: [],
  currencies: [],
  id: 0,
  button: true,
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
  case REMOVEID:
    return {
      ...state,
      expenses: state.expenses
        .filter(({ id }) => id !== action.state),
    };
  case ENABLED_BUTTON:
    return {
      ...state,
      button: action.state,
    };
  default:
    return state;
  }
};

export default wallet;
