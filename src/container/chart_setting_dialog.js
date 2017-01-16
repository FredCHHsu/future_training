import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { grey500 } from 'material-ui/styles/colors';
import MultilineChart from 'material-ui/svg-icons/editor/multiline-chart';
import { connect } from 'react-redux';

class ChartSettingDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      date: null,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSaveSettings = this.handleSaveSettings.bind(this);
  }
  handleOpen() {
    this.setState({ open: true });
  }
  handleClose() {
    this.setState({ open: false });
  }
  handleSaveSettings() {
    this.setState({ open: false });
  }
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Save"
        primary
        onClick={this.handleSaveSettings}
      />,
    ];
    return (
      <div>
        <FloatingActionButton
          onClick={this.handleOpen}
          backgroundColor={grey500}
        >
          <MultilineChart />
        </FloatingActionButton>
        <Dialog
          title="Chart Settings"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          huh!?
        </Dialog>
      </div>
    );
  }
}

ChartSettingDialog.propTypes = {
};

// function mapStateToProps(state) {
//   return {
//   };
// }
export default connect(null, null)(ChartSettingDialog);
