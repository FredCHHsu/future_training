import React, { PropTypes, Component } from 'react';
import techan from '../vendor/techan';
import * as d3 from 'd3';
import { connect } from 'react-redux';

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

dimension.priceChart = {
  width: dimension.plot.width,
  height: dimension.plot.height * 0.6,
};

dimension.volumeChart = {
  width: dimension.plot.width,
  height: dimension.plot.height * 0.2,
};

dimension.indicatorChart = {
  width: dimension.plot.width,
  height: dimension.plot.height * 0.2,
};

// time as x Axis
const timeScale = techan.scale.financetime().range([0, dimension.plot.width]);
const xAxisTop = d3.axisTop().scale(timeScale).ticks(5);
const xAxisBottom = d3.axisBottom().scale(timeScale).ticks(5);

const timeAnnotation = techan.plot.axisannotation()
            .axis(xAxisBottom)
            .orient('bottom')
            .format(d3.timeFormat('%Y-%m-%d'))
            .width(65)
            .translate([0, dimension.plot.height]);

const timeAnnotationTop = techan.plot.axisannotation()
            .axis(xAxisTop)
            .orient('top')
            .format(d3.timeFormat('%Y-%m-%d'))
            .width(65);

// price chart (candlestick)
const priceScale = d3.scaleLinear().range([dimension.priceChart.height, 0]);
const priceAxisLeft = d3.axisLeft().scale(priceScale);
const priceAxisRight = d3.axisRight().scale(priceScale);

const candlestick = techan.plot.candlestick()
                    .xScale(timeScale)
                    .yScale(priceScale);

const tradearrow = techan.plot.tradearrow()
                  .xScale(timeScale)
                  .yScale(priceScale)
                  .orient(d => (d.type.includes('buy') || d.type.includes('cover') ? 'up' : 'down'))
                  .y(d => {
                    // Display the buy and sell arrows a bit above and below the price
                    if (d.type === 'buy' || d.type === 'cover') return priceScale(d.low - 5);
                    return priceScale(d.high + 5);
                  });
                  // .on('mouseenter', enter)
                  // .on('mouseout', out);

const sma = techan.plot.sma().xScale(timeScale).yScale(priceScale);

const maPeriod = [10, 20, 60];

// crosshair
const priceAnnotationRight = techan.plot.axisannotation()
                        .axis(priceAxisRight)
                        .orient('right')
                        .translate([dimension.plot.width, 0]);
                        // .format(d3.format(',.2f'));

const priceAnnotationLeft = techan.plot.axisannotation()
                            .axis(priceAxisLeft)
                            .orient('left');
                            // .format(d3.format(',.2f'));

const priceCrosshair = techan.plot.crosshair()
                      .xScale(timeScale)
                      .yScale(priceScale)
                      .xAnnotation([timeAnnotation, timeAnnotationTop])
                      .yAnnotation([priceAnnotationLeft, priceAnnotationRight])
                      .verticalWireRange([0, dimension.plot.height]);
//                   .on('move', move);

// volume chart
const volumeScale = d3.scaleLinear()
                      .range([
                        dimension.priceChart.height + dimension.volumeChart.height,
                        dimension.priceChart.height + 5,
                      ]);
const volumeAxisLeft = d3.axisLeft().scale(volumeScale).ticks(4);
const volumeAxisRight = d3.axisRight().scale(volumeScale).ticks(4);
const volume = techan.plot.volume()
                .accessor(candlestick.accessor())
                .xScale(timeScale)
                .yScale(volumeScale);

const volumeAnnotationRight = techan.plot.axisannotation()
                        .axis(volumeAxisRight)
                        .orient('right')
                        .translate([dimension.plot.width, 0]);

const volumeAnnotationLeft = techan.plot.axisannotation()
                            .axis(volumeAxisLeft)
                            .orient('left');

const volumeCrosshair = techan.plot.crosshair()
                      .xScale(timeScale)
                      .yScale(volumeScale)
                      .xAnnotation([timeAnnotation, timeAnnotationTop])
                      .yAnnotation([volumeAnnotationLeft, volumeAnnotationRight])
                      .verticalWireRange([0, dimension.plot.height]);

// indicator
const indicatorScale = d3.scaleLinear()
                      .range([
                        dimension.priceChart.height +
                        dimension.volumeChart.height +
                        dimension.indicatorChart.height,
                        dimension.priceChart.height +
                        dimension.volumeChart.height + 5,
                      ]);
const indicatorAxisLeft = d3.axisLeft().scale(indicatorScale).ticks(4);
const indicatorAxisRight = d3.axisRight().scale(indicatorScale).ticks(4);
const indicator = techan.plot.atr()
                .xScale(timeScale)
                .yScale(indicatorScale);

const indicatorAnnotationRight = techan.plot.axisannotation()
                        .axis(indicatorAxisRight)
                        .orient('right')
                        .translate([dimension.plot.width, 0]);

const indicatorAnnotationLeft = techan.plot.axisannotation()
                            .axis(indicatorAxisLeft)
                            .orient('left');

const indicatorCrosshair = techan.plot.crosshair()
                      .xScale(timeScale)
                      .yScale(indicatorScale)
                      .xAnnotation([timeAnnotation, timeAnnotationTop])
                      .yAnnotation([indicatorAnnotationLeft, indicatorAnnotationRight])
                      .verticalWireRange([0, dimension.plot.height]);

class CandlestickChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      svg: null,
      chartInitilized: false,
    };
    this.draw = this.draw.bind(this);
  }
  componentDidMount() {
    const svg = d3.select('#candlestick-main-chart').append('svg')
                  .attr('width', '100%')
                  .attr('height', '100%')
                  .attr('viewBox',
                        `0 0 ${dimension.chartWrapper.width} ${dimension.chartWrapper.height}`)
                  .attr('preserveAspectRatio', 'xMinYMin')
                  .append('g')
                  .attr('transform', `translate(${dimension.margin.left},${dimension.margin.top})`);

    svg.append('g')
       .attr('class', 'x axis top');

    svg.append('g')
       .attr('class', 'x axis bottom')
       .attr('transform', `translate(0, ${dimension.plot.height})`);

// price chart
    const priceGroup = svg.append('g')
                           .attr('class', 'candlestick');

    priceGroup.append('g')
              .attr('class', 'price axis left');

    priceGroup.append('g')
              .attr('class', 'price axis right')
              .attr('transform', `translate(${dimension.plot.width}, 0)`);
              //  .append('text')
              //  .attr('class', 'label')
              //  .attr('transform', 'rotate(-90)')
              //  .attr('y', 6)
              //  .attr('dy', '2.71em')
              //  .style('text-anchor', 'end')
              //  .text('Price');

    maPeriod.forEach(period => {
      priceGroup.append('g')
                .attr('class', `indicator sma ma-${period}`);
    });

    priceGroup.append('g')
              .attr('class', 'tradearrow');

    svg.append('g')
              .attr('class', 'price crosshair');

// volume chart
    const volumeGroup = svg.append('g')
                           .attr('class', 'volume');

    volumeGroup.append('g')
               .attr('class', 'volume axis right')
               .attr('transform', `translate(${dimension.plot.width}, 0)`);

    volumeGroup.append('g')
               .attr('class', 'volume axis left');

    svg.append('g')
               .attr('class', 'volume crosshair');

// indicator chart
    const indicatorGroup = svg.append('g')
                              .attr('class', 'indicator atr');

    indicatorGroup.append('g')
                  .attr('class', 'indicator axis right')
                  .attr('transform', `translate(${dimension.plot.width}, 0)`);

    indicatorGroup.append('g')
                  .attr('class', 'indicator axis left');

    svg.append('g')
                  .attr('class', 'indicator crosshair');


    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ svg });
  }
  componentDidUpdate() {
    if (this.props.data && !this.state.chartInitilized) {
      this.draw(this.props.data.slice(0, this.props.barsInChart));
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ chartInitilized: true });
    } else if (this.props.data) {
      // draw last n(barsInChart) candlesticks
      this.draw(this.props.data.slice(this.props.lastTickOnChart - this.props.barsInChart,
                                      this.props.lastTickOnChart));
    }
  }
  draw(data, trades = this.props.tradeLog) {
    const svg = this.state.svg;
    timeScale.domain(data.map(candlestick.accessor().d));
    svg.select('g.x.axis.top').call(xAxisTop);
    svg.select('g.x.axis.bottom').call(xAxisBottom);

    priceScale.domain(techan.scale.plot.ohlc(data, candlestick.accessor()).domain());
    svg.select('g.candlestick').datum(data).call(candlestick);
    svg.select('g.price.axis.left').call(priceAxisLeft);
    svg.select('g.price.axis.right').call(priceAxisRight);
    svg.select('g.tradearrow').datum(trades).call(tradearrow);
    svg.select('g.price.crosshair').call(priceCrosshair);
    maPeriod.forEach(period => {
      svg.select(`g.sma.ma-${period}`)
         .datum(techan.indicator.sma().period(period)(data)).call(sma);
    });

    volumeScale.domain(techan.scale.plot.volume(data).domain());
    svg.select('g.volume').datum(data).call(volume);
    svg.select('g.volume.axis.left').call(volumeAxisLeft);
    svg.select('g.volume.axis.right').call(volumeAxisRight);
    svg.select('g.volume.crosshair').call(volumeCrosshair);

    const indicatorData = techan.indicator.atr().period(10)(data);
    indicatorScale.domain(techan.scale.plot.atr(indicatorData).domain());
    svg.select('g.indicator.atr').datum(indicatorData).call(indicator);
    svg.select('g.indicator.axis.left').call(indicatorAxisLeft);
    svg.select('g.indicator.axis.right').call(indicatorAxisRight);
    svg.select('g.indicator.crosshair').call(indicatorCrosshair);
  }
  render() {
    return (<div id="candlestick-main-chart"></div>);
  }
}

CandlestickChart.propTypes = {
  data: PropTypes.array,
  lastTickOnChart: PropTypes.number,
  barsInChart: PropTypes.number,
  tradeLog: PropTypes.array,
};

const mapStateToProps = (state) => ({
  data: state.game.data,
  lastTickOnChart: state.game.lastTickIndex + 1,
  barsInChart: state.chart.barsInChart,
  tradeLog: state.trade.log,
});

export default connect(mapStateToProps, null)(CandlestickChart);
