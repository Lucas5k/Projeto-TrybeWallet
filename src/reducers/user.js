import { SUBMIT_INFORMATIONS } from '../actions';
// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  if (action.type === SUBMIT_INFORMATIONS) {
    return {
      ...state,
      email: action.formInformation,
    };
  }
  return state;
};

export default user;
