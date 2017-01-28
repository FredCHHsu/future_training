import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import techan from '../../vendor/techan';

class PriceChart extends Component {
  constructor(props) {
    super(props);
    this.updateChart = this.updateChart.bind(this);
  }
  componentWillMount() {
  }
  componentDidUpdate() {
    this.updateChart();
  }
  updateChart() {
    const { priceScale,
            data,
            candlestick,
            priceAxisLeft, priceAxisRight,
            trades, tradearrow,
            maPeriods, sma,
          } = this.props;
    priceScale.domain(
      techan.scale.plot.ohlc(data, candlestick.accessor()).domain());
    d3.select('g.candlestick').datum(data).call(candlestick);
    d3.select('g.price.axis.left').call(priceAxisLeft);
    d3.select('g.price.axis.right').call(priceAxisRight);
    d3.select('g.tradearrow').datum(trades).call(tradearrow);
    maPeriods.forEach(period => {
      d3.select(`g.sma.ma-${period}`)
         .datum(techan.indicator.sma().period(period)(data)).call(sma);
    });
  }
  render() {
    return (
      <g className="candlestick">
        <g className="price axis left"></g>
        <g
          className="price axis right"
          transform={`translate(${this.props.dimension.plot.width}, 0)`}
        ></g>
        {this.props.maPeriods.map(period =>
          <g key={`ma-${period}`} className={`indicator sma ma-${period}`}></g>
        )}
        <g className="tradearrow"></g>
      </g>);
  }
}

PriceChart.propTypes = {
  priceScale: PropTypes.func,
  data: PropTypes.array,
  dimension: PropTypes.object,
  candlestick: PropTypes.func,
  priceAxisLeft: PropTypes.func,
  priceAxisRight: PropTypes.func,
  trades: PropTypes.array,
  tradearrow: PropTypes.func,
  maPeriods: PropTypes.array,
  sma: PropTypes.func,
  // timeScale: PropTypes.func,
  // xAxis: PropTypes.func,
  // position: PropTypes.string,
};

const mapStateToProps = (state) => ({
  priceScale: state.chart.priceScale,
  data: state.game.dataOnChart,
  dimension: state.chart.dimension,
  candlestick: state.chart.candlestick,
  priceAxisLeft: state.chart.priceAxisLeft,
  priceAxisRight: state.chart.priceAxisRight,
  tradearrow: state.chart.tradearrow,
  trades: state.trade.log,
  maPeriods: state.chart.maPeriods,
  sma: state.chart.sma,
  // timeScale: state.chart.timeScale,
  // xAxis: state.chart.xAxis[ownProps.position],
});

export default connect(mapStateToProps, null)(PriceChart);
