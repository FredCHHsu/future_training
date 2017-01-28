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
const xAxisTop = d3.axisTop().scale(timeScale).ticks(5);
const xAxisBottom = d3.axisBottom().scale(timeScale).ticks(5);

const priceScale = d3.scaleLinear().range([priceChart.height, 0]);
const candlestick = techan.plot.candlestick()
                    .xScale(timeScale)
                    .yScale(priceScale);
const priceAxisLeft = d3.axisLeft().scale(priceScale);
const priceAxisRight = d3.axisRight().scale(priceScale);
const tradearrow = techan.plot.tradearrow()
                  .xScale(timeScale)
                  .yScale(priceScale)
                  .orient(d => (d.type.includes('buy') || d.type.includes('cover') ? 'up' : 'down'))
                  .y(d => {
                    // Display the buy and sell arrows a bit above and below the price
                    if (d.type === 'buy' || d.type === 'cover') return priceScale(d.low - 5);
                    return priceScale(d.high + 5);
                  });
const maPeriods = [10, 20, 60];
const sma = techan.plot.sma().xScale(timeScale).yScale(priceScale);


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
  xAxis: {
    top: xAxisTop,
    bottom: xAxisBottom,
  },
  priceScale,
  candlestick,
  priceAxisLeft,
  priceAxisRight,
  tradearrow,
  maPeriods,
  sma,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
