import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Cabeçalho extends Component {
  reduceInformationName = () => {
    const { expenses } = this.props;
    // const resultReduce = expenses.reduce((_acc, element) => {
    //   const { currency, exchangeRates } = element;
    //   const { name } = Object.values(exchangeRates)
    //     .find((exchange) => exchange.code === currency);
    //   return name;
    // }, '');
    // return resultReduce;
    const resultMap = expenses.map((element) => {
      const { currency, exchangeRates } = element;
      const { name } = Object.values(exchangeRates)
        .find((exchange) => exchange.code === currency);
      return name;
    });
    return resultMap;
  }

  reducerCovertedValue = () => {
    const { expenses } = this.props;
    const resultReduce = expenses.reduce((acc, curr) => {
      const { currency, exchangeRates, value } = curr;
      const { ask } = Object.values(exchangeRates)
        .find((exchange) => exchange.code === currency);
      acc = (+ask * +value);
      return +acc;
    }, 0).toFixed(2);
    return resultReduce;
  }

  reduceInformationAsk = () => {
    const { expenses } = this.props;
    const resultReduce = expenses.reduce((_acc, element) => {
      const { currency, exchangeRates } = element;
      const { ask } = Object.values(exchangeRates)
        .find((exchange) => exchange.code === currency);
      return +ask;
    }, 0).toFixed(2);
    return resultReduce;
  }

  handleInformationValue = () => {
    const { expenses } = this.props;
    const resultMap = expenses.map((element) => {
      const { value } = element;
      return value;
    });
    return Number(resultMap).toFixed(2);
  }

  handleInformationMethod = () => {
    const { expenses } = this.props;
    const resultMap = expenses.map((element) => {
      const { method } = element;
      return method;
    }, '');
    return resultMap;
  }

  handleInformationTag = () => {
    const { expenses } = this.props;
    const resultMap = expenses.map((element) => {
      const { tag } = element;
      return tag;
    });
    return resultMap;
  }

  handleInformationDescription = () => {
    const { expenses } = this.props;
    const result = expenses.map((element) => {
      const { description } = element;
      return description;
    });
    return result;
  }

  render() {
    // const { expenses } = this.props;
    const informationName = this.reduceInformationName();
    const informationCoverted = this.reducerCovertedValue();
    const informationAsk = this.reduceInformationAsk();
    const informationValue = this.handleInformationValue();
    const informationMethod = this.handleInformationMethod();
    const informationTag = this.handleInformationTag();
    const informationDescription = this.handleInformationDescription();
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
          <tr>
            <td role="cell">{ informationDescription }</td>
            <td role="cell">{ informationTag }</td>
            <td role="cell">{ informationMethod }</td>
            <td role="cell">{ informationValue }</td>
            <td role="cell">{ informationName }</td>
            <td role="cell">{ informationAsk }</td>
            <td role="cell">{ informationCoverted }</td>
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
          {/* {
            expenses.map((ele, i) => (
              <tr key={ i }>
                <td role="cell">{ ele.description }</td>
                <td role="cell">{ ele.tag }</td>
                <td role="cell">{ ele.method }</td>
                <td role="cell">{ Number(ele.value).toFixed(2) }</td>
                <td role="cell">{ informationName }</td>
                <td role="cell">{ Number(ele.ask).toFixed(2) }</td>
                <td role="cell">{ informationCoverted }</td>
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
            ))
          } */}
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
