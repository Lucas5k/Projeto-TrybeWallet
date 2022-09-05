import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import styled from '../styled/Header.module.css';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      redirect: false,
    };
  }

  resultsExpenses = () => {
    const { expenses } = this.props;
    const reducer = expenses.reduce((acc, curr) => {
      const { currency, exchangeRates, value } = curr;
      const { ask } = Object.values(exchangeRates)
        .find((exchange) => exchange.code === currency);
      acc += (+ask * +value);
      return +acc;
    }, 0).toFixed(2);

    return reducer;
  }

  handleGoBack = () => {
    this.setState({ redirect: true });
  }

  render() {
    const { email } = this.props;
    const { redirect } = this.state;
    if (redirect) return <Redirect to="/" />;
    const retornoFunção = this.resultsExpenses();
    return (
      <section className={ styled.Header__container }>
        <section className={ styled.Header__totalAndCambio }>
          <p data-testid="total-field">{`Total: ${retornoFunção}`}</p>
          <p data-testid="header-currency-field">câmbio: BRL</p>
        </section>
        <section className={ styled.Header__emailAndVoltar }>
          <p data-testid="email-field">{`Email: ${email} `}</p>
          <button
            type="button"
            onClick={ this.handleGoBack }
          >
            Sair
          </button>
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
