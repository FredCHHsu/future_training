import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import Axis from './Axis';

class VolumeChart extends Component {
  constructor(props) {
    super(props);
    this.updateChart = this.updateChart.bind(this);
  }
  componentDidMount() {
    if (this.props.data) {
      this.updateChart();
    }
  }
  componentDidUpdate() {
    this.updateChart();
  }
  updateChart() {
    const { data, volume } = this.props;
    d3.select('g.volume').datum(data).call(volume);
  }
  render() {
    return (
      <g className="volume">
        <Axis name="volume" type="y" position="left" />
        <Axis name="volume" type="y" position="right" />
      </g>);
  }
}

VolumeChart.propTypes = {
  data: PropTypes.array,
  volume: PropTypes.func,
};

const mapStateToProps = (state) => ({
  data: state.game.dataOnChart,
  volume: state.chart.indicator.volume,
});

export default connect(mapStateToProps, null)(VolumeChart);
