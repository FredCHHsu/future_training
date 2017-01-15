import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { grey500 } from 'material-ui/styles/colors';
import Settings from 'material-ui/svg-icons/action/settings';
import { connect } from 'react-redux';
import { setStartDate } from '../actions/settings';

class GameSettingsDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      date: null,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
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
    this.props.setStartDate(this.state.date);
  }
  handleDateChange(event, date) {
    this.setState({ date });
  }
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Save"
        primary={true}
        onTouchTap={this.handleSaveSettings}
      />,
    ];
    return (
      <div>
        <FloatingActionButton
          onClick={this.handleOpen}
          backgroundColor={grey500}
        >
          <Settings />
        </FloatingActionButton>
        <Dialog
          title="Game Settings"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Start Date:
          <DatePicker
            hintText="Pick the date you want to start from"
            onChange={this.handleDateChange}
            defaultDate={this.props.startDate}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            firstDayOfWeek={0}
          />
        </Dialog>
      </div>
    );
  }
}

GameSettingsDialog.propTypes = {
  setStartDate: PropTypes.func,
  startDate: PropTypes.object,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    startDate: state.game.startDate,
    minDate: state.game.minDate,
    maxDate: state.game.maxDate,
  };
}
export default connect(mapStateToProps, { setStartDate })(GameSettingsDialog);
