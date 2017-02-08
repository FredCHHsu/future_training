import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem';
import Settings from 'material-ui/svg-icons/action/settings';
import { connect } from 'react-redux';
import { setStartDate } from '../actions/settings';

const isSameDate = (d1, d2) => (
  d1.getFullYear() === d2.getFullYear()
  && d1.getMonth() === d2.getMonth()
  && d1.getDate() === d2.getDate()
);

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
    this.disableDates = this.disableDates.bind(this);
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
  disableDates(date) {
    return this.props.data.find(datum => isSameDate(datum.date, date)) === undefined;
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
        <MenuItem
          onTouchTap={this.handleOpen}
          primaryText="Game Settings"
          leftIcon={<Settings />}
        />
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
            shouldDisableDate={this.disableDates}
          />
        </Dialog>
      </div>
    );
  }
}

GameSettingsDialog.propTypes = {
  setStartDate: PropTypes.func,
  data: PropTypes.array,
  startDate: PropTypes.object,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    data: state.game.data,
    startDate: state.game.startDate,
    minDate: state.game.minDate,
    maxDate: state.game.maxDate,
  };
}
export default connect(mapStateToProps, { setStartDate })(GameSettingsDialog);
