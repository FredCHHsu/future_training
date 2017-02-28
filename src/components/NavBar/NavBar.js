import React, { Component } from 'react';
import { Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import MonetizationOn from 'material-ui/svg-icons/editor/monetization-on';
import Divider from 'material-ui/Divider';
import FormatListNumbered from 'material-ui/svg-icons/editor/format-list-numbered';

import GameSettingsDialog from '../../container/GameSettingDialog';
import ChartSettingDialog from '../../container/ChartSettingDialog';
import TradeLogActionsMenu from './TradeLogActionsMenu';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      onLargeScreen: window.innerWidth >= 1200,
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    // this.renderIcon = this.renderIcon.bind(this);
    this.updateLayout = this.updateLayout.bind(this);
  }
  componentWillMount() {
    window.addEventListener('resize', this.updateLayout);
  }
  componentWillUnMount() {
    window.removeEventListener('resize', this.updateLayout);
  }
  updateLayout() {
    this.setState({ onLargeScreen: window.innerWidth >= 1200 });
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
    const { onLargeScreen } = this.state;
    return (
      <AppBar
        title="TTrainer"
        onLeftIconButtonTouchTap={this.handleToggle}
        iconElementRight={window.location.pathname === '/tradelog' ? <TradeLogActionsMenu /> : null}
      >
        <Drawer
          docked={onLargeScreen}
          open={onLargeScreen || this.state.open}
          onRequestChange={(open) => this.setState({ open })}
        >
          <AppBar
            title="TTrainer"
            showMenuIconButton={false}
          />
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
