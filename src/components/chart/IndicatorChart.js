import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import techan from '../../vendor/techan';
import Axis from './Axis';

class IndicatorChart extends Component {
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
    const { type, indicatorData, scale, getDomain, indicator } = this.props;
    scale.domain(getDomain(indicatorData));
    d3.select(`g.indicator.${type}`).datum(indicatorData).call(indicator);
  }
  render() {
    const { indicatorData, type } = this.props;
    return (
      <g className={`indicator ${type}`}>
        <Axis data={indicatorData} name={type} type="y" position="left" />
        <Axis data={indicatorData} name={type} type="y" position="right" />
      </g>);
  }
}

IndicatorChart.propTypes = {
  indicatorData: PropTypes.array,
  indicator: PropTypes.func,
  scale: PropTypes.func,
  getDomain: PropTypes.func,
  type: PropTypes.string.isRequired,
  period: PropTypes.number,
};

const mapStateToProps = (state, ownProps) => ({
  // data: state.game.dataOnChart,
  indicatorData: techan.indicator.atr().period(ownProps.period)(state.game.dataOnChart || []),
  indicator: state.chart.indicator[ownProps.type],
  scale: state.chart.axis[ownProps.type].scale,
  getDomain: state.chart.axis[ownProps.type].domain,
});

export default connect(mapStateToProps, null)(IndicatorChart);
