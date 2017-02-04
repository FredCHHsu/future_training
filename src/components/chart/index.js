import React, { PropTypes } from 'react';
// import techan from '../../vendor/techan';
// import * as d3 from 'd3';
import { connect } from 'react-redux';
import Axis from './Axis';
import PriceChart from './PriceChart';
import VolumeChart from './VolumeChart';
import IndicatorChart from './IndicatorChart';
import Crosshair from './Crosshair';

const MainChart = (props) =>
  <svg
    width="100%"
    height="100%"
    viewBox={`0 0 ${props.chartWrapper.width} ${props.chartWrapper.height}`}
    preserveAspectRatio="xMinYMin"
  >
    <g
      id="plot"
      transform={`translate(${props.margin.left},${props.margin.top})`}
    >
      <Axis name="time" type="x" position="top" />
      <Axis name="time" type="x" position="bottom" />
      <PriceChart />
      <Crosshair type="price" />
      <VolumeChart />
      <Crosshair type="volume" />
      <IndicatorChart type="atr" period={10} />
      <Crosshair type="atr" />
    </g>
  </svg>;

MainChart.propTypes = {
  chartWrapper: PropTypes.object,
  margin: PropTypes.object,
};

const mapStateToProps = (state) => ({
  chartWrapper: state.chart.dimension.chartWrapper,
  margin: state.chart.dimension.margin,
});

export default connect(mapStateToProps, null)(MainChart);
