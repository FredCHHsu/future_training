import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';

import { resetTradeLog } from '../../actions/trade';


const TradeLogActionsMenu = (props) => (
  <IconMenu
    iconButtonElement={
      <IconButton><ExpandMore /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem primaryText="Clear All" onClick={() => props.resetTradeLog()} />
  </IconMenu>
);

TradeLogActionsMenu.propTypes = {
  resetTradeLog: PropTypes.func,
};

export default connect(null, { resetTradeLog })(TradeLogActionsMenu);
