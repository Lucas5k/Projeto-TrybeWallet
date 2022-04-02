import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApiCurrencies, myAllExpenses } from '../actions';
import Header from '../component/Header';
import Select from '../component/Select';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      valor: 0,
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

  handleSubmit = () => {
    const { valor, descrição, pagamento, categoria, moeda } = this.state;
    const { allExpenses } = this.props;
    const objectValue = { valor, descrição, pagamento, categoria, moeda };
    allExpenses(objectValue);
    this.setState({
      valor: 0,
      descrição: '',
      pagamento: '',
      categoria: '',
      moeda: '',
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
          id="moeda"
          name="moeda"
          options={ currencies }
        />
        <label
          data-testid="method-input"
          htmlFor="pagamento"
        >
          Método Pagamento:
          <select
            id="pagamento"
            name="pagamento"
            onChange={ this.handleChange }
            value={ pagamento }
          >
            <option>
              Dinheiro
            </option>
            <option>
              Cartão de crédito
            </option>
            <option>
              Cartão de débito
            </option>
          </select>
        </label>
        <label
          data-testid="tag-input"
          htmlFor="categoria"
        >
          Categoria:
          <select
            id="categoria"
            value={ categoria }
            onChange={ this.handleChange }
            name="categoria"
          >
            <option>
              Alimentação
            </option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
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
        <button
          type="submit"
          onClick={ this.handleSubmit }
        >
          Adicionar despesa
        </button>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchResultsApi: () => dispatch(fetchApiCurrencies()),
  allExpenses: (dispesas) => dispatch(myAllExpenses(dispesas)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

Wallet.propTypes = {
  fetchResultsApi: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  allExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
