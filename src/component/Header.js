import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  // handleTest = () => {
  //   const { expenses } = this.props;
  //   // if (expenses.length <= 0) {
  //   //   return 0;
  //   // }
  //   const total = expenses.reduce((acc, curr) => {
  //     const { value, currency, exchangeRates } = curr;
  //     // const { ask } = curr.exchangeRates;
  //     const testAsk = Object.values(exchangeRates)
  //       .find((ele) => ele.code === currency);
  //     acc += (+testAsk * +value);
  //     console.log(acc);
  //     console.log('aqui', testAsk);
  //     console.log(curr.exchangeRates);
  //     return +acc;
  //   }, 0).toFixed(2);
  //   return reduce;
  // }

  getTotal = () => {
    const { expenses } = this.props;
    console.log(expenses);
    const total = expenses.reduce((acc, curr) => {
      const { currency, exchangeRates, value } = curr;
      const { ask } = Object.values(exchangeRates)
        .find((exchange) => exchange.code === currency);
      acc += (+ask * +value);
      return +acc;
    }, 0).toFixed(2);

    return total;
  }

  render() {
    const { email } = this.props;
    const retornoFunção = this.getTotal();
    return (
      <header>
        <p data-testid="email-field">{`Email: ${email} `}</p>
        <p data-testid="total-field">{retornoFunção}</p>
        <p data-testid="header-currency-field">câmbio: BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Header);
