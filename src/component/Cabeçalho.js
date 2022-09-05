import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpenses } from '../actions';
import styled from '../styled/Cabeçalho.module.css';

class Cabeçalho extends Component {
  render() {
    const { expenses, removeItem } = this.props;
    return (
      <section className={ styled.Cabeçalho__container }>
        <section className={ styled.Cabeçalho__box }>
          <table>
            <thead>
              <tr>
                <th role="columnheader" scope="col">Descrição</th>
                <th role="columnheader" scope="col">Tag</th>
                <th role="columnheader" scope="col">Método de pagamento</th>
                <th role="columnheader" scope="col">Valor</th>
                <th role="columnheader" scope="col">Moeda</th>
                <th role="columnheader" scope="col">Câmbio utilizado</th>
                <th role="columnheader" scope="col">Valor convertido</th>
                <th role="columnheader" scope="col">Moeda de conversão</th>
                <th role="columnheader" scope="col">Excluir</th>
              </tr>
              {
                expenses.map((element) => {
                  const { currency, exchangeRates, value, id } = element;
                  const { name, ask } = Object.values(exchangeRates)
                    .find((exchange) => exchange.code === currency);
                  const sum = (ask * value);
                  return (
                    <tr key={ id }>
                      <td role="cell">{ element.description }</td>
                      <td role="cell">{ element.tag }</td>
                      <td role="cell">{ element.method }</td>
                      <td role="cell">{ Number(element.value).toFixed(2) }</td>
                      <td role="cell">{ name }</td>
                      <td role="cell">{ Number(ask).toFixed(2) }</td>
                      <td role="cell">{ Number(sum).toFixed(2) }</td>
                      <td role="cell">Real</td>
                      <td role="cell">
                        <button
                          type="button"
                          key={ id }
                          data-testid="delete-btn"
                          onClick={ () => removeItem(id) }
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  );
                }, '')
              }
            </thead>
          </table>
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeItem: (id) => dispatch(removeExpenses(id)),
});

Cabeçalho.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeItem: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cabeçalho);
