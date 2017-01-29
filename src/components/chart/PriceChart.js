import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import techan from '../../vendor/techan';
import Axis from './Axis';

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
    const { data,
            candlestick,
            trades, tradearrow,
            maPeriods, sma,
          } = this.props;
    d3.select('g.candlestick').datum(data).call(candlestick);
    d3.select('g.tradearrow').datum(trades).call(tradearrow);
    maPeriods.forEach(period => {
      d3.select(`g.sma.ma-${period}`)
         .datum(techan.indicator.sma().period(period)(data)).call(sma);
    });
  }
  render() {
    return (
      <g className="candlestick">
        <Axis name="price" type="y" position="left" />
        <Axis name="price" type="y" position="right" />
        {this.props.maPeriods.map(period =>
          <g key={`ma-${period}`} className={`indicator sma ma-${period}`}></g>
        )}
        <g className="tradearrow"></g>
      </g>);
  }
}

PriceChart.propTypes = {
  data: PropTypes.array,
  candlestick: PropTypes.func,
  trades: PropTypes.array,
  tradearrow: PropTypes.func,
  maPeriods: PropTypes.array,
  sma: PropTypes.func,
};

const mapStateToProps = (state) => ({
  data: state.game.dataOnChart,
  candlestick: state.chart.candlestick,
  tradearrow: state.chart.tradearrow,
  trades: state.trade.log,
  maPeriods: state.chart.maPeriods,
  sma: state.chart.sma,
});

export default connect(mapStateToProps, null)(PriceChart);
