import React, { PropTypes, Component } from 'react';
import techan from '../vendor/techan';
import * as d3 from 'd3';
import { connect } from 'react-redux';

const chartWrapperWidth = 960;
const chartWrapperheight = 500;
const margin = { top: 20, right: 20, bottom: 30, left: 50 };
const chartWidth = chartWrapperWidth - margin.left - margin.right;
const chartHeight = chartWrapperheight - margin.top - margin.bottom;

const xScale = techan.scale.financetime().range([0, chartWidth]);
const yScale = d3.scaleLinear().range([chartHeight, 0]);

const candlestick = techan.plot.candlestick()
                    .xScale(xScale)
                    .yScale(yScale);

const tradearrow = techan.plot.tradearrow()
        .xScale(xScale)
        .yScale(yScale)
        .orient(d => (d.type.includes('buy') || d.type.includes('cover') ? 'up' : 'down'));
        // .on('mouseenter', enter)
        // .on('mouseout', out);

const xAxis = d3.axisBottom().scale(xScale);
const yAxis = d3.axisLeft().scale(yScale);

const timeAnnotation = techan.plot.axisannotation()
            .axis(xAxis)
            .orient('bottom')
            .format(d3.timeFormat('%Y-%m-%d'))
            .width(65)
            .translate([0, chartHeight]);

const priceAnnotation = techan.plot.axisannotation()
                        .axis(yAxis)
                        .orient('left')
                        .format(d3.format(',.2f'));

const crosshair = techan.plot.crosshair()
                  .xScale(xScale)
                  .yScale(yScale)
                  .xAnnotation(timeAnnotation)
                  .yAnnotation([priceAnnotation]);
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
                  .attr('width', chartWidth + margin.left + margin.right)
                  .attr('height', chartHeight + margin.top + margin.bottom)
                  .append('g')
                  .attr('transform', `translate(${margin.left},${margin.top})`);

    svg.append('g')
       .attr('class', 'candlestick');

    svg.append('g')
       .attr('class', 'tradearrow');

    svg.append('g')
       .attr('class', 'x axis')
       .attr('transform', `translate(0, ${chartHeight})`);

    svg.append('g')
       .attr('class', 'y axis')
       .append('text')
       .attr('transform', 'rotate(-90)')
       .attr('y', 6)
       .attr('dy', '.71em')
       .style('text-anchor', 'end')
       .text('Price');

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
    svg.selectAll('g.x.axis').call(xAxis);
    svg.selectAll('g.y.axis').call(yAxis);
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
