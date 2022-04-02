import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  componentDidMount() {
    console.log(this.handleTest());
  }

  handleTest = () => {
    const { expenses } = this.props;
    if (expenses.length <= 0) {
      return '';
    }
    const allValues = expenses;
    const reduce = allValues.reduce((acc, curr) => {
      return acc[0].valor + curr[0].valor;
    });
    return reduce;
  }

  render() {
    const { email } = this.props;
    console.log(this.handleTest());
    return (
      <header>
        <p data-testid="email-field">{`Email: ${email} `}</p>
        <p data-testid="total-field">{`Despesas total: ${'test'} `}</p>
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
