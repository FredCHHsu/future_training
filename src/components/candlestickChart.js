import React, { PropTypes, Component } from 'react';
import techan from '../vendor/techan';
import * as d3 from 'd3';
import { connect } from 'react-redux';

const dataUrl = '/data.csv';
const chartWrapperWidth = 960;
const chartWrapperheight = 500;
const margin = { top: 20, right: 20, bottom: 30, left: 50 };
const chartWidth = chartWrapperWidth - margin.left - margin.right;
const chartHeight = chartWrapperheight - margin.top - margin.bottom;
const parseDate = d3.timeParse('%d-%b-%y');

const xScale = techan.scale.financetime().range([0, chartWidth]);
const yScale = d3.scaleLinear().range([chartHeight, 0]);

const candlestick = techan.plot.candlestick()
                    .xScale(xScale)
                    .yScale(yScale);

const xAxis = d3.axisBottom().scale(xScale);
const yAxis = d3.axisLeft().scale(yScale);

class CandlestickChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      svg: null,
      chartInitilized: false,
      game: null,
    };
    this.draw = this.draw.bind(this);
  }
  componentWillMount() {
    const accessor = candlestick.accessor();
    d3.csv(dataUrl, (error, data) => {
      this.setState({
        data: data.map(d => ({
          date: parseDate(d.Date),
          open: +d.Open,
          high: +d.High,
          low: +d.Low,
          close: +d.Close,
          volume: +d.Volume,
        })).sort((a, b) => d3.ascending(accessor.d(a), accessor.d(b))),
      });
    });
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

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ svg });
  }
  componentDidUpdate() {
    if (this.state.data && !this.state.chartInitilized) {
      this.draw(this.state.data.slice(0, 100));
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ chartInitilized: true });
    } else if (this.state.data) {
      this.draw(this.state.data.slice(0 + this.props.gameTime, 100 + this.props.gameTime));
    }
  }
  draw(data) {
    xScale.domain(data.map(candlestick.accessor().d));
    yScale.domain(techan.scale.plot.ohlc(data, candlestick.accessor()).domain());

    const svg = this.state.svg;
    svg.selectAll('g.candlestick').datum(data).call(candlestick);
    svg.selectAll('g.x.axis').call(xAxis);
    svg.selectAll('g.y.axis').call(yAxis);
  }
  render() {
    return (<div id="candlestick-main-chart"></div>);
  }
}

CandlestickChart.propTypes = {
  gameTime: PropTypes.number,
};

const mapStateToProps = (state) => ({
  gameTime: state.game.time,
});

export default connect(mapStateToProps, null)(CandlestickChart);
