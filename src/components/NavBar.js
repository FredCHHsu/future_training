import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import GameSettingsDialog from '../container/GameSettingDialog';
import ChartSettingDialog from '../container/ChartSettingDialog';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleToggle() {
    this.setState({ open: !this.state.open });
  }
  handleClose() {
    this.setState({ open: false });
  }
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
        </Drawer>
      </AppBar>
    );
  }
}

export default NavBar;
