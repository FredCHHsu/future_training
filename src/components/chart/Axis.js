import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
// import techan from '../../vendor/techan';

class Axis extends Component {
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
    const { data, scale, getDomain, axis, name, type, position } = this.props;
    if (data) {
      scale.domain(getDomain(data));
      d3.select(`g.axis.${type}.${name}.${position}`).call(axis);
    }
  }
  render() {
    const { name, type, position, dimension } = this.props;
    const isBottomAxis = position === 'bottom';
    const isRightAxis = position === 'right';
    return (
      <g
        className={`axis ${type} ${name} ${position}`}
        // eslint-disable-next-line max-len
        transform={`translate(${isRightAxis ? dimension.plot.width : 0}, ${isBottomAxis ? dimension.plot.height : 0})`}
      >
      </g>);
  }
}

Axis.propTypes = {
  data: PropTypes.array,
  dimension: PropTypes.object,
  scale: PropTypes.func.isRequired,
  getDomain: PropTypes.func.isRequired,
  axis: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired, // x or y
  position: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  data: ownProps.data || state.game.dataOnChart,
  dimension: state.chart.dimension,
  scale: state.chart.axis[ownProps.name].scale,
  getDomain: state.chart.axis[ownProps.name].domain,
  axis: state.chart.axis[ownProps.name][ownProps.position],
});

export default connect(mapStateToProps, null)(Axis);
