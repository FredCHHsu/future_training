import React, { Component } from 'react';
import { Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import MonetizationOn from 'material-ui/svg-icons/editor/monetization-on';
import Divider from 'material-ui/Divider';
import FormatListNumbered from 'material-ui/svg-icons/editor/format-list-numbered';

import GameSettingsDialog from '../container/GameSettingDialog';
import ChartSettingDialog from '../container/ChartSettingDialog';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    // this.renderIcon = this.renderIcon.bind(this);
  }
  handleToggle() {
    this.setState({ open: !this.state.open });
  }
  handleClose() {
    this.setState({ open: false });
  }
  // renderIcon() {
  //   return window.location.pathname !== '/' ?
  //     <IconButton><ArrowBack /></IconButton> : null;
  // }
  render() {
    return (
      <AppBar
        title="TTrainer"
        onLeftIconButtonTouchTap={this.handleToggle}
      >
        <Drawer
          docked={false}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}
        >
          <MenuItem
            primaryText="Game"
            leftIcon={<MonetizationOn />}
            onTouchTap={this.handleClose}
            containerElement={<Link to="/" />}
          />
          <ChartSettingDialog />
          <GameSettingsDialog />
          <Divider />
          <MenuItem
            primaryText="Trade Log"
            leftIcon={<FormatListNumbered />}
            onTouchTap={this.handleClose}
            containerElement={<Link to="/tradelog" />}
          />
        </Drawer>
      </AppBar>
    );
  }
}

export default NavBar;
