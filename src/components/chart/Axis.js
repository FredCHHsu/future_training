import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import techan from '../../vendor/techan';

class Axis extends Component {
  componentWillUpdate(nextProps) {
    const { name, type, position, scale, candlestick, axis } = this.props;
    if (nextProps.data) {
      if (name === 'time') {
        scale.domain(nextProps.data.map(candlestick.accessor().d));
      } else if (name === 'price') {
        scale.domain(techan.scale.plot.ohlc(nextProps.data, candlestick.accessor()).domain());
      }
      d3.select(`g.axis.${name}.${type}.${position}`).call(axis);
    }
  }
  render() {
    const { name, type, position, dimension } = this.props;
    const isBottomAxis = position === 'bottom';
    const isRightAxis = position === 'right';
    return (
      <g
        className={`axis ${name} ${type} ${position}`}
        // eslint-disable-next-line max-len
        transform={`translate(${isRightAxis ? dimension.plot.width : 0}, ${isBottomAxis ? dimension.plot.height : 0})`}
      >
      </g>);
  }
}

Axis.propTypes = {
  data: PropTypes.array,
  dimension: PropTypes.object,
  scale: PropTypes.func,
  candlestick: PropTypes.func,
  axis: PropTypes.func,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired, // x or y
  position: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  data: state.game.dataOnChart,
  dimension: state.chart.dimension,
  candlestick: state.chart.candlestick,
  scale: state.chart.axis[ownProps.name].scale,
  axis: state.chart.axis[ownProps.name][ownProps.position],
});

export default connect(mapStateToProps, null)(Axis);
