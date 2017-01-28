import * as d3 from 'd3';
import techan from '../vendor/techan';

const resolutionFactor = 1;

const chartWrapper = {
  width: window.innerWidth * resolutionFactor,
  height: window.innerHeight * 0.8 * resolutionFactor,
};

const margin = { top: 50, right: 40, bottom: 50, left: 40 };

const plot = {
  width: chartWrapper.width - margin.right - margin.left,
  height: chartWrapper.height - margin.top - margin.bottom,
};

const priceChart = {
  width: plot.width,
  height: plot.height * 0.6,
};

const volumeChart = {
  width: plot.width,
  height: plot.height * 0.2,
};

const indicatorChart = {
  width: plot.width,
  height: plot.height * 0.2,
};

const timeScale = techan.scale.financetime().range([0, plot.width]);
const candlestick = techan.plot.candlestick().xScale(timeScale);

const xAxisTop = d3.axisTop().scale(timeScale).ticks(5);
const xAxisBottom = d3.axisBottom().scale(timeScale).ticks(5);


const INITIAL_STATE = {
  dimension: {
    chartWrapper,
    margin,
    plot,
    priceChart,
    volumeChart,
    indicatorChart,
  },
  timeScale,
  candlestick,
  xAxis: {
    top: xAxisTop,
    bottom: xAxisBottom,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
