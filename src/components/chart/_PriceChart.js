import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import techan from '../../vendor/techan';

const PriceChart = (props) => {
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

  return ;
}

PriceChart.propTypes = {
};

export default connect(mapStateToProps, null)(PriceChart);
