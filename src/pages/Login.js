import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { informationLogin } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      buttonDisabled: true,
      redirect: false,
      typePassword: 'password',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.handleValidation);
  }

  handleSubmit = () => {
    const { dispatchPropStore } = this.props;
    const { email } = this.state;
    dispatchPropStore(email);
    this.setState({ redirect: true });
  }

  handleValidation = () => {
    const { email, password } = this.state;
    const THREE = 3;
    const SIX = 6;
    const ONEHUNDREDTWENTY = 120;
    const NINETY = 90;
    const ZERO = 0;
    const pattern = /\S+@\S+\.\S+/;

    if (
      email.length > THREE && password.length >= SIX
      && Number(email.length) > ZERO && Number(email.length) < ONEHUNDREDTWENTY
      && Number(password.length) >= SIX && Number(password.length) < NINETY
      && pattern.test(email)
    ) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  }

  handlePassword = () => {
    const { typePassword } = this.state;
    if (typePassword === 'password') {
      this.setState({ typePassword: 'text' });
    } else {
      this.setState({ typePassword: 'password' });
    }
  }

  render() {
    const { email, password, buttonDisabled, redirect, typePassword } = this.state;
    if (redirect) return <Redirect to="/carteira" />;
    return (
      <section>
        <label htmlFor="emailInput">
          Email:
          <input
            data-testid="email-input"
            id="emailInput"
            name="email"
            type="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="passwordInput">
          Password:
          <input
            data-testid="password-input"
            id="passwordInput"
            name="password"
            type={ typePassword }
            value={ password }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="submit"
          onClick={ this.handlePassword }
        >
          { typePassword === 'password' ? <FaEye /> : <FaEyeSlash /> }
        </button>
        <button
          type="button"
          disabled={ buttonDisabled }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchPropStore: (formInformation) => dispatch(informationLogin(formInformation)),
});

Login.propTypes = {
  dispatchPropStore: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
