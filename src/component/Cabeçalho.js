import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Cabeçalho extends Component {
  // reduceInformationName = () => {
  //   const { expenses } = this.props;
  //   // const resultReduce = expenses.reduce((_acc, element) => {
  //   //   const { currency, exchangeRates } = element;
  //   //   const { name } = Object.values(exchangeRates)
  //   //     .find((exchange) => exchange.code === currency);
  //   //   return name;
  //   // }, '');
  //   // return resultReduce;
  //   const resultMap = expenses.map((element) => {
  //     const { currency, exchangeRates } = element;
  //     const { name } = Object.values(exchangeRates)
  //       .find((exchange) => exchange.code === currency);
  //     return name;
  //   });
  //   return resultMap;
  // }

  // reducerCovertedValue = () => {
  //   const { expenses } = this.props;
  //   const resultReduce = expenses.reduce((acc, curr) => {
  //     const { currency, exchangeRates, value } = curr;
  //     const { ask } = Object.values(exchangeRates)
  //       .find((exchange) => exchange.code === currency);
  //     acc = (+ask * +value);
  //     return +acc;
  //   }, 0).toFixed(2);
  //   return resultReduce;
  // }

  // reduceInformationAsk = () => {
  //   const { expenses } = this.props;
  //   const resultReduce = expenses.reduce((_acc, element) => {
  //     const { currency, exchangeRates } = element;
  //     const { ask } = Object.values(exchangeRates)
  //       .find((exchange) => exchange.code === currency);
  //     return +ask;
  //   }, 0).toFixed(2);
  //   return resultReduce;
  // }

  // handleInformationValue = () => {
  //   const { expenses } = this.props;
  //   const resultMap = expenses.map((element) => {
  //     const { value } = element;
  //     return value;
  //   });
  //   return Number(resultMap).toFixed(2);
  // }

  // handleInformationMethod = () => {
  //   const { expenses } = this.props;
  //   const resultMap = expenses.map((element) => {
  //     const { method } = element;
  //     return method;
  //   }, '');
  //   return resultMap;
  // }

  // handleInformationTag = () => {
  //   const { expenses } = this.props;
  //   const resultMap = expenses.map((element) => {
  //     const { tag } = element;
  //     return tag;
  //   });
  //   return resultMap;
  // }

  // handleInformationDescription = () => {
  //   const { expenses } = this.props;
  //   const result = expenses.map((element) => {
  //     const { description } = element;
  //     return description;
  //   });
  //   return result;
  // }

  render() {
    const { expenses } = this.props;
    return (
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
            <th role="columnheader" scope="col">Editar/Excluir</th>
          </tr>
          {
            expenses.map((element, i) => {
              const { currency, exchangeRates, value } = element;
              const { name, ask } = Object.values(exchangeRates)
                .find((exchange) => exchange.code === currency);
              const sum = (ask * value);
              return (
                <tr key={ i }>
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
                      type="reset"
                      data-testid="delete-btn"
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
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Cabeçalho.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Cabeçalho);
