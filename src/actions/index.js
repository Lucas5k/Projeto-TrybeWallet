// Coloque aqui suas actions
export const SUBMIT_INFORMATIONS = 'SUBMIT_INFORMATIONS';
// action user
export const PROMISE_CURRENCIES = 'PROMISE_CURRENCIES';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RESPONSE_ERROR = 'RESPONSE_ERROR';
// action wallet request api
export const REMOVEID = 'REMOVEID';
export const ENABLED_BUTTON = 'ENABLED_BUTTON';
// action dispesas wallet
export const PROMISE_EXPENSES = 'PROMISE_EXPENSES';
export const REQUEST_EXPENSES = 'REQUEST_EXPENSES';
// action wallet request api dispesas

export const informationLogin = (formInformation) => (
  { type: SUBMIT_INFORMATIONS, formInformation });

const promiseCurrencies = () => ({ type: PROMISE_CURRENCIES });

// https://pt.stackoverflow.com/questions/362777/index-ou-chave-no-objeto-javascript
const requestCurrencies = (data) => ({ type: REQUEST_CURRENCIES,
  payload: Object.keys(data) });

const requestError = (error) => ({ type: RESPONSE_ERROR, error });

export function fetchApiCurrencies() {
  return async (dispatch) => {
    dispatch(promiseCurrencies());
    try {
      return fetch('https://economia.awesomeapi.com.br/json/all')
        .then((response) => response.json())
        .then((data) => dispatch(requestCurrencies(data)));
    } catch (error) {
      dispatch(requestError(error));
    }
  };
}

const promiseExpenses = () => ({ type: PROMISE_EXPENSES });

const requestExpenses = (data, dispesas) => ({ type: REQUEST_EXPENSES, data, dispesas });

export function myAllExpenses(dispesas) {
  return async (dispatch) => {
    dispatch(promiseExpenses());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => dispatch(requestExpenses(data, dispesas)));
  };
}

export const removeExpenses = (state) => ({ type: REMOVEID, state });

export const enabledButton = (state) => ({ type: ENABLED_BUTTON, state });
