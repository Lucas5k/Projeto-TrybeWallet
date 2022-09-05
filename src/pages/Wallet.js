import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApiCurrencies, myAllExpenses } from '../actions';
import Header from '../component/Header';
import Select from '../component/Select';
import Cabeçalho from '../component/Cabeçalho';
import styled from '../styled/Wallet.module.css';

const CartãoDébito = 'Cartão de débito';
class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '0',
      description: '',
      method: 'Cartão de crédito',
      tag: 'Lazer',
      currency: 'USD',
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
    const { value, description, method, tag, currency } = this.state;
    const { allExpenses } = this.props;
    const objectValue = { value, description, method, tag, currency };
    allExpenses(objectValue);
    this.setState({
      value: 0,
      description: '',
      method: CartãoDébito,
      tag: 'Trabalho',
      currency: 'USD',
    });
  }

  handleUpdateSubmit = () => {
    const { value, description, method, tag, currency } = this.state;
    const objectValue = { value, description, method, tag, currency };
    const { allExpenses } = this.props;
    allExpenses(objectValue);
    this.setState({
      value: 0,
      description: '',
      method: CartãoDébito,
      tag: 'Trabalho',
      currency: 'USD',
    });
  }

  render() {
    const { value, description, method, tag, currency } = this.state;
    const { currencies } = this.props;
    return (
      <>
        <Header />
        <section className={ styled.Wallet__container }>
          <section className={ styled.Wallet__box }>
            <p>Valor:</p>
            <label htmlFor="valorInput">
              <input
                data-testid="value-input"
                id="valorInput"
                name="value"
                type="number"
                value={ value }
                onChange={ this.handleChange }
              />
            </label>
            <p>Moeda:</p>
            <Select
              onChange={ this.handleChange }
              value={ currency }
              label=""
              id="currency"
              name="currency"
              options={ currencies }
            />
            <p>Pagamento:</p>
            <label
              data-testid="method-input"
              htmlFor="pagamento"
            >
              <select
                id="pagamento"
                name="method"
                onChange={ this.handleChange }
                value={ method }
              >
                <option>Dinheiro</option>
                <option>Cartão de crédito</option>
                <option>Cartão de débito</option>
              </select>
            </label>
            <p>Categoria:</p>
            <label
              data-testid="tag-input"
              htmlFor="categoria"
            >
              <select
                id="categoria"
                value={ tag }
                onChange={ this.handleChange }
                name="tag"
              >
                <option>Alimentação</option>
                <option>Lazer</option>
                <option>Trabalho</option>
                <option>Transporte</option>
                <option>Saúde</option>
              </select>
            </label>
            <p>Descrição:</p>
            <label htmlFor="descriptionInput">
              <input
                data-testid="description-input"
                id="descriptionInput"
                name="description"
                value={ description }
                onChange={ this.handleChange }
              />
            </label>
          </section>
          <section className={ styled.button__box }>
            <button
              type="submit"
              onClick={ this.handleSubmit }
            >
              Adicionar despesa
            </button>
          </section>
        </section>
        <Cabeçalho />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchResultsApi: () => dispatch(fetchApiCurrencies()),
  allExpenses: (dispesas) => dispatch(myAllExpenses(dispesas)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  enabledButton: state.wallet.button,
});

Wallet.propTypes = {
  fetchResultsApi: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  allExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
