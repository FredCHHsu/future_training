import React, { PropTypes, Component } from 'react';
import techan from '../vendor/techan';
import * as d3 from 'd3';
import { connect } from 'react-redux';

const resolutionFactor = 1;
const chartWrapperWidth = window.innerWidth * resolutionFactor;
const chartWrapperHeight = window.innerHeight * 0.7 * resolutionFactor;
const margin = { top: 50, right: 40, bottom: 50, left: 40 };
const chartWidth = chartWrapperWidth - margin.left - margin.right;
const chartHeight = chartWrapperHeight - margin.top - margin.bottom;

const xScale = techan.scale.financetime().range([0, chartWidth]);
const yScale = d3.scaleLinear().range([chartHeight, 0]);

const candlestick = techan.plot.candlestick()
                    .xScale(xScale)
                    .yScale(yScale);

const tradearrow = techan.plot.tradearrow()
        .xScale(xScale)
        .yScale(yScale)
        .orient(d => (d.type.includes('buy') || d.type.includes('cover') ? 'up' : 'down'))
        .y(d => {
          // Display the buy and sell arrows a bit above and below the price
          if (d.type === 'buy' || d.type === 'cover') return yScale(d.low) + 5;
          return yScale(d.high) - 5;
        });
        // .on('mouseenter', enter)
        // .on('mouseout', out);

const xAxisTop = d3.axisTop().scale(xScale);
const xAxisBottom = d3.axisBottom().scale(xScale);
const yAxisLeft = d3.axisLeft().scale(yScale);
const yAxisRight = d3.axisRight().scale(yScale);

const timeAnnotation = techan.plot.axisannotation()
            .axis(xAxisBottom)
            .orient('bottom')
            .format(d3.timeFormat('%Y-%m-%d'))
            .width(65)
            .translate([0, chartHeight]);

const timeAnnotationTop = techan.plot.axisannotation()
            .axis(xAxisTop)
            .orient('top')
            .format(d3.timeFormat('%Y-%m-%d'))
            .width(65);

const priceAnnotationRight = techan.plot.axisannotation()
                        .axis(yAxisRight)
                        .orient('right')
                        .translate([chartWidth, 0])
                        .format(d3.format(',.2f'));

const priceAnnotationLeft = techan.plot.axisannotation()
                            .axis(yAxisLeft)
                            .orient('left')
                            .format(d3.format(',.2f'));

const crosshair = techan.plot.crosshair()
                  .xScale(xScale)
                  .yScale(yScale)
                  .xAnnotation([timeAnnotation, timeAnnotationTop])
                  .yAnnotation([priceAnnotationLeft, priceAnnotationRight]);
//                   .on('move', move);

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
                  .attr('viewBox', `0 0 ${chartWrapperWidth} ${chartWrapperHeight}`)
                  .attr('preserveAspectRatio', 'xMinYMin')
                  .append('g')
                  .attr('transform', `translate(${margin.left},${margin.top})`);

    svg.append('g')
       .attr('class', 'candlestick');

    svg.append('g')
       .attr('class', 'tradearrow');

    svg.append('g')
       .attr('class', 'x axis top');

    svg.append('g')
       .attr('class', 'x axis bottom')
       .attr('transform', `translate(0, ${chartHeight})`);

    svg.append('g')
       .attr('class', 'y axis left');

    svg.append('g')
       .attr('class', 'y axis right')
       .attr('transform', `translate(${chartWidth}, 0)`);
      //  .append('text')
      //  .attr('class', 'label')
      //  .attr('transform', 'rotate(-90)')
      //  .attr('y', 6)
      //  .attr('dy', '2.71em')
      //  .style('text-anchor', 'end')
      //  .text('Price');

    svg.append('g')
       .attr('class', 'crosshair');

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
    xScale.domain(data.map(candlestick.accessor().d));
    yScale.domain(techan.scale.plot.ohlc(data, candlestick.accessor()).domain());

    const svg = this.state.svg;
    svg.selectAll('g.candlestick').datum(data).call(candlestick);
    svg.selectAll('g.tradearrow').datum(trades).call(tradearrow);
    svg.selectAll('g.x.axis.top').call(xAxisTop);
    svg.selectAll('g.x.axis.bottom').call(xAxisBottom);
    svg.selectAll('g.y.axis.left').call(yAxisLeft);
    svg.selectAll('g.y.axis.right').call(yAxisRight);
    svg.select('g.crosshair').call(crosshair);
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
