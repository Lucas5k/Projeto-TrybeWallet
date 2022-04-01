import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApiCurrencies } from '../actions';
import Header from '../component/Header';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchResultsApi } = this.props;
    fetchResultsApi();
  }

  render() {
    return (
      <section>
        <Header />
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchResultsApi: () => dispatch(fetchApiCurrencies()),
});

Wallet.propTypes = {
  fetchResultsApi: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Wallet);
