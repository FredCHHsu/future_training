import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { zoom, manualTick } from '../actions/chart';

import FlatButton from 'material-ui/FlatButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import ZoomOut from 'material-ui/svg-icons/action/zoom-out';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';


class ChartControlPanel extends Component {
  componentDidMount() {
    console.log('huh?');
  }
  render() {
    return (
      <div className="control-panel -chart">
        <FlatButton
          onClick={() => this.props.manualTick('back')}
          icon={<ArrowBack />}
        />
        <FlatButton
          onClick={() => this.props.zoom('out')}
          icon={<ZoomOut />}
        />
        <FlatButton
          onClick={() => this.props.zoom('in')}
          icon={<ZoomIn />}
        />
        <FlatButton
          onClick={() => this.props.manualTick('forward')}
          icon={<ArrowForward />}
        />
      </div>
    );
  }
}

ChartControlPanel.propTypes = {
  zoom: PropTypes.func,
  manualTick: PropTypes.func,
};

export default connect(null, { zoom, manualTick })(ChartControlPanel);
