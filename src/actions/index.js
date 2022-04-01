// Coloque aqui suas actions
export const SUBMIT_INFORMATIONS = 'SUBMIT_INFORMATIONS';
export const PROMISE_CURRENCIES = 'PROMISE_CURRENCIES';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RESPONSE_ERROR = 'RESPONSE_ERROR';

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
