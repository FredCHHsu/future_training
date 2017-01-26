import React from 'react';
import * as d3 from 'd3';
import techan from '../../vendor/techan';

const resolutionFactor = 1;
const dimension = {
  chartWrapper: {
    width: window.innerWidth * resolutionFactor,
    height: window.innerHeight * 0.8 * resolutionFactor,
  },
  margin: { top: 50, right: 40, bottom: 50, left: 40 },
};

dimension.plot = {
  width: dimension.chartWrapper.width - dimension.margin.right - dimension.margin.left,
  height: dimension.chartWrapper.height - dimension.margin.top - dimension.margin.bottom,
};

const timeScale = techan.scale.financetime().range([0, dimension.plot.width]);
const xAxisTop = d3.axisTop().scale(timeScale).ticks(5);


class Axis extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  componentWillUpdate() {
    d3.select('g.x.axis.top').call(xAxisTop);
  }
  render() {
    return <g className="x axis top"></g>;
  }
}

Axis.propTypes = {
};

export default Axis;
