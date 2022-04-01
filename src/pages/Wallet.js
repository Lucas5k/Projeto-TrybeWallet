import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApiCurrencies } from '../actions';
import Header from '../component/Header';
import Select from '../component/Select';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      valor: '',
      descrição: '',
      pagamento: '',
      categoria: '',
      moeda: '',
    };
  }

  componentDidMount() {
    const { fetchResultsApi } = this.props;
    fetchResultsApi();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { valor, descrição, pagamento, categoria, moeda } = this.state;
    const { currencies } = this.props;
    return (
      <section>
        <Header />
        <label htmlFor="valorInput">
          Valor:
          <input
            data-testid="value-input"
            id="valorInput"
            name="valor"
            type="number"
            value={ valor }
            onChange={ this.handleChange }
          />
        </label>
        <Select
          onChange={ this.handleChange }
          value={ moeda }
          label="Moeda: "
          id="moedaInput"
          name="moedaInput"
          options={ currencies }
        />
        <label
          data-testid="method-input"
          htmlFor="paymentInput"
        >
          Método Pagamento:
          <select
            id="paymentInput"
          >
            <option
              value={ pagamento }
              onChange={ this.handleChange }
            >
              Dinheiro
            </option>
            <option value={ pagamento }>Cartão de crédito</option>
            <option value={ pagamento }>Cartão de débito</option>
          </select>
        </label>
        <label
          data-testid="tag-input"
          htmlFor="dropdownInput"
        >
          Categoria:
          <select
            id="dropdownInput"
          >
            <option
              value={ categoria }
              onChange={ this.handleChange }
            >
              Alimentação
            </option>
            <option value={ categoria }>Lazer</option>
            <option value={ categoria }>Trabalho</option>
            <option value={ categoria }>Transporte</option>
            <option value={ categoria }>Saúde</option>
          </select>
        </label>
        <label htmlFor="descriptionInput">
          Descrição:
          <input
            data-testid="description-input"
            id="descriptionInput"
            name="descrição"
            value={ descrição }
            onChange={ this.handleChange }
          />
        </label>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchResultsApi: () => dispatch(fetchApiCurrencies()),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

Wallet.propTypes = {
  fetchResultsApi: PropTypes.func.isRequired,
  currencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
