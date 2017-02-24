import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { zoom } from '../actions/chart';
// import GameControlButton from '../components/GameControlButton';
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
          icon={<ArrowForward />}
        />
      </div>
    );
  }
}

ChartControlPanel.propTypes = {
  zoom: PropTypes.func,
};

export default connect(null, { zoom })(ChartControlPanel);
