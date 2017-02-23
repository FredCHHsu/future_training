import React, { PropTypes } from 'react';
import { Table, TableBody, TableHeader,
         TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { connect } from 'react-redux';
import { BUY, SHORT, SELL, COVER } from '../actions/types';

const thStyle = { lineHeight: '56px' };
const tdStyle = { lineHeight: '48px' };

const TradeLog = (props) =>
  <div className="page-container trade-log">
    <Table fixedHeader height="calc(100vh - 64px - 56px - 1px)">
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
      >
        <TableRow>
          <TableHeaderColumn style={thStyle}>Date</TableHeaderColumn>
          <TableHeaderColumn style={thStyle}>Type</TableHeaderColumn>
          <TableHeaderColumn style={thStyle}>Price</TableHeaderColumn>
          <TableHeaderColumn style={thStyle}>Date</TableHeaderColumn>
          <TableHeaderColumn style={thStyle}>Type</TableHeaderColumn>
          <TableHeaderColumn style={thStyle}>Price</TableHeaderColumn>
          <TableHeaderColumn style={thStyle}>Profit</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
        displayRowCheckbox={false}
      >
        {props.tradeIn.map((trade, i) =>
          <TableRow key={`trade-${i}`}>
            <TableRowColumn style={tdStyle}>
              {trade.date.toISOString().substring(0, 10)}
            </TableRowColumn>
            <TableRowColumn style={tdStyle}>{trade.type}</TableRowColumn>
            <TableRowColumn style={tdStyle}>{trade.price}</TableRowColumn>
            <TableRowColumn style={tdStyle}>
              {props.tradeOut[i] ? props.tradeOut[i].date.toISOString().substring(0, 10) : '--'}
            </TableRowColumn>
            <TableRowColumn style={tdStyle}>
              {props.tradeOut[i] ? props.tradeOut[i].type : '--'}
            </TableRowColumn>
            <TableRowColumn style={tdStyle}>
              {props.tradeOut[i] ? props.tradeOut[i].price : '--'}
            </TableRowColumn>
            <TableRowColumn style={tdStyle}>
              {props.tradeOut[i] ? trade.contractValue + props.tradeOut[i].contractValue : '--'}
            </TableRowColumn>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </div>;

TradeLog.propTypes = {
  tradeIn: PropTypes.array,
  tradeOut: PropTypes.array,
};

const mapStateToProps = (state) => ({
  tradeIn: state.trade.log.filter(t => t.type === BUY || t.type === SHORT),
  tradeOut: state.trade.log.filter(t => t.type === SELL || t.type === COVER),
});

export default connect(mapStateToProps)(TradeLog);
