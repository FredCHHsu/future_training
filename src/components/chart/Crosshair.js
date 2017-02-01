import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import techan from '../../vendor/techan';

class Crosshair extends Component {
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
    const { type, crosshair } = this.props;
    d3.select(`g.crosshair.${type}`).call(crosshair);
  }
  render() {
    const { type } = this.props;
    return (<g className={`crosshair ${type}`}></g>);
  }
}

Crosshair.propTypes = {
  type: PropTypes.string.isRequired,
  crosshair: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ({
  crosshair: techan.plot.crosshair()
            .xScale(state.chart.axis.time.scale)
            .yScale(state.chart.axis[ownProps.type].scale)
            .xAnnotation([
              state.chart.annotation.time.bottom,
              state.chart.annotation.time.top,
            ])
            .yAnnotation([
              state.chart.annotation[ownProps.type].left,
              state.chart.annotation[ownProps.type].right,
            ])
            .verticalWireRange([0, state.chart.dimension.plot.height]),
});

export default connect(mapStateToProps, null)(Crosshair);
