import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
// import techan from '../../vendor/techan';

class Axis extends Component {
  componentWillUpdate(nextProps) {
    const { scale, domain, axis, name, type, position } = this.props;
    if (nextProps.data) {
      scale.domain(domain(nextProps.data));
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
  data: PropTypes.array.isRequired,
  dimension: PropTypes.object,
  scale: PropTypes.func.isRequired,
  domain: PropTypes.func.isRequired,
  axis: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired, // x or y
  position: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  data: state.game.dataOnChart,
  dimension: state.chart.dimension,
  scale: state.chart.axis[ownProps.name].scale,
  domain: state.chart.axis[ownProps.name].domain,
  axis: state.chart.axis[ownProps.name][ownProps.position],
});

export default connect(mapStateToProps, null)(Axis);
