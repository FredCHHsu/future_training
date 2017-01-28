import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';

class Axis extends Component {
  componentWillMount() {
    const { timeScale, candlestick, xAxis } = this.props;
    if (this.props.data) {
      timeScale.domain(this.props.data.map(candlestick.accessor().d));
      d3.select(`g.x.axis.${this.props.position}`).call(xAxis);
    }
  }
  componentWillUpdate(nextProps) {
    const { timeScale, candlestick, xAxis } = this.props;
    if (nextProps.data) {
      timeScale.domain(nextProps.data.map(candlestick.accessor().d));
      d3.select(`g.x.axis.${this.props.position}`).call(xAxis);
    }
  }
  render() {
    const isTopAxis = this.props.position === 'top';
    return (
      <g
        className={`x axis ${this.props.position}`}
        transform={isTopAxis ? '' : `translate(0, ${this.props.dimension.plot.height})`}
      >
      </g>);
  }
}

Axis.propTypes = {
  data: PropTypes.array,
  dimension: PropTypes.object,
  timeScale: PropTypes.func,
  candlestick: PropTypes.func,
  xAxis: PropTypes.func,
  position: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
  data: state.game.dataOnChart,
  dimension: state.chart.dimension,
  timeScale: state.chart.timeScale,
  candlestick: state.chart.candlestick,
  xAxis: state.chart.xAxis[ownProps.position],
});

export default connect(mapStateToProps, null)(Axis);
