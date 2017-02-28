import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { zoom, manualTick } from '../actions/chart';

import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import ZoomOut from 'material-ui/svg-icons/action/zoom-out';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';


class ChartControlPanel extends Component {
  componentDidMount() {
  }
  render() {
    return (
      <div className="control-panel -chart">
        <IconButton onClick={() => this.props.manualTick('back')} >
          <ArrowBack />
        </IconButton>
        <IconButton onClick={() => this.props.zoom('out')}>
          <ZoomOut />
        </IconButton>
        <IconButton onClick={() => this.props.zoom('in')} >
          <ZoomIn />
        </IconButton>
        <IconButton onClick={() => this.props.manualTick('forward')} >
          <ArrowForward />
        </IconButton>
      </div>
    );
  }
}

ChartControlPanel.propTypes = {
  zoom: PropTypes.func,
  manualTick: PropTypes.func,
};

export default connect(null, { zoom, manualTick })(ChartControlPanel);
