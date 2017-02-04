import { GAME_TICK, FETCH_DATA } from '../actions/types.js';

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
const timeAxisTop = d3.axisTop().scale(timeScale).ticks(5);
const timeAxisBottom = d3.axisBottom().scale(timeScale).ticks(5);

const priceScale = d3.scaleLinear().range([priceChart.height, 0]);
const candlestick = techan.plot.candlestick()
                    .xScale(timeScale)
                    .yScale(priceScale);
const priceAxisLeft = d3.axisLeft().scale(priceScale);
const priceAxisRight = d3.axisRight().scale(priceScale);

const volumeScale = d3.scaleLinear()
                      .range([
                        priceChart.height + volumeChart.height,
                        priceChart.height + 5,
                      ]);
const volumeAxisLeft = d3.axisLeft().scale(volumeScale).ticks(4);
const volumeAxisRight = d3.axisRight().scale(volumeScale).ticks(4);


const indicatorScale = d3.scaleLinear()
                      .range([
                        priceChart.height + volumeChart.height + indicatorChart.height,
                        priceChart.height + volumeChart.height + 5]);
const indicatorAxisLeft = d3.axisLeft().scale(indicatorScale).ticks(4);
const indicatorAxisRight = d3.axisRight().scale(indicatorScale).ticks(4);

const INITIAL_STATE = {
  dimension: {
    chartWrapper,
    margin,
    plot,
    priceChart,
    volumeChart,
    indicatorChart,
  },
  axis: {
    time: {
      top: timeAxisTop,
      bottom: timeAxisBottom,
      domain: data => data.map(candlestick.accessor().d),
      scale: timeScale,
    },
    price: {
      left: priceAxisLeft,
      right: priceAxisRight,
      domain: data => techan.scale.plot.ohlc(data, candlestick.accessor()).domain(),
      scale: priceScale,
    },
    volume: {
      left: volumeAxisLeft,
      right: volumeAxisRight,
      domain: data => techan.scale.plot.volume(data).domain(),
      scale: volumeScale,
    },
    atr: {
      left: indicatorAxisLeft,
      right: indicatorAxisRight,
      domain: atrData => techan.scale.plot.atr(atrData).domain(),
      scale: indicatorScale,
    },
  },
  annotation: {
    time: {
      top: techan.plot.axisannotation()
        .axis(timeAxisTop).orient('top')
        .format(d3.timeFormat('%Y-%m-%d')).width(65),
      bottom: techan.plot.axisannotation()
        .axis(timeAxisBottom).orient('bottom')
        .format(d3.timeFormat('%Y-%m-%d')).width(65)
        .translate([0, plot.height]),
    },
    price: {
      left: techan.plot.axisannotation()
        .axis(priceAxisLeft).orient('left'),
        // .format(d3.format(',.2f'));
      right: techan.plot.axisannotation()
        .axis(priceAxisRight).orient('right')
        .translate([plot.width, 0]),
        // .format(d3.format(',.2f'));
    },
    volume: {
      left: techan.plot.axisannotation()
        .axis(volumeAxisLeft).orient('left'),
        // .format(d3.format(',.2f'));
      right: techan.plot.axisannotation()
        .axis(volumeAxisRight).orient('right')
        .translate([plot.width, 0]),
        // .format(d3.format(',.2f'));
    },
    atr: {
      left: techan.plot.axisannotation()
        .axis(indicatorAxisLeft).orient('left'),
        // .format(d3.format(',.2f'));
      right: techan.plot.axisannotation()
        .axis(indicatorAxisRight).orient('right')
        .translate([plot.width, 0]),
        // .format(d3.format(',.2f'));
    },
  },
  candlestick,
  tradearrow: techan.plot.tradearrow()
                .xScale(timeScale)
                .yScale(priceScale)
                .orient(d => (d.type.includes('buy') || d.type.includes('cover') ? 'up' : 'down'))
                .y(d => {
                  // Display the buy and sell arrows a bit above and below the price
                  if (d.type === 'buy' || d.type === 'cover') return priceScale(d.low - 5);
                  return priceScale(d.high + 5);
                }),
  maPeriods: [10, 20, 60],
  sma: techan.plot.sma().xScale(timeScale).yScale(priceScale),
  indicator: {
    volume: techan.plot.volume()
              .accessor(candlestick.accessor())
              .xScale(timeScale).yScale(volumeScale),
    atr: techan.plot.atr()
           .xScale(timeScale).yScale(indicatorScale),
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_DATA: {
      // const composedData = action.payload;
      // return { ...state,
      //   dataOnChart: composedData.slice(0, state.lastTickIndex + 1),
      // };
      return state;
    }
    case GAME_TICK:
      // update domain here...
      return state;
    default:
      return state;
  }
};
