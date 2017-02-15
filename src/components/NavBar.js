import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import GameSettingsDialog from '../container/GameSettingDialog';
import ChartSettingDialog from '../container/ChartSettingDialog';
import MenuItem from 'material-ui/MenuItem';
import FormatListNumbered from 'material-ui/svg-icons/editor/format-list-numbered';
import { Link } from 'react-router';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    // this.handleLink = this.handleLink.bind(this);
  }
  handleToggle() {
    this.setState({ open: !this.state.open });
  }
  handleClose() {
    this.setState({ open: false });
  }
  // handleLink(e) {
  //   console.log(e.target);
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
          <ChartSettingDialog />
          <GameSettingsDialog />
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
