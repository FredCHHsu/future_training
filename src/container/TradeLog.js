import React, { Component, PropTypes } from 'react';
import { Table, TableBody, TableHeader,
         TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { connect } from 'react-redux';

const thStyle = { lineHeight: '56px' };
const tdStyle = { lineHeight: '48px' };

class TradeLog extends Component {
  componentWillMount() {
    console.log(this.props.log);
  }
  render() {
    return (
      <div className="trade-log">
        <Table fixedHeader height="calc(100vh - 64px - 56px - 1px)">
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn style={thStyle}>Date</TableHeaderColumn>
              <TableHeaderColumn style={thStyle}>Type</TableHeaderColumn>
              <TableHeaderColumn style={thStyle}>Price</TableHeaderColumn>
              <TableHeaderColumn style={thStyle}>Quantity</TableHeaderColumn>
              <TableHeaderColumn style={thStyle}>Profit</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
          >
            {this.props.log.map(trade =>
              <TableRow key={`trade-${trade.id}`}>
                <TableRowColumn style={tdStyle}>
                {trade.date.toISOString().substring(0, 10)}</TableRowColumn>
                <TableRowColumn style={tdStyle}>{trade.type}</TableRowColumn>
                <TableRowColumn style={tdStyle}>{trade.price}</TableRowColumn>
                <TableRowColumn style={tdStyle}>{trade.quantity}</TableRowColumn>
                <TableRowColumn style={tdStyle}>{trade.profit}</TableRowColumn>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  }
}

TradeLog.propTypes = {
  log: PropTypes.array,
};

const mapStateToProps = (state) => ({
  log: state.trade.log,
});

export default connect(mapStateToProps)(TradeLog);
