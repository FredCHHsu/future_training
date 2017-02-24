import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import TrendingUp from 'material-ui/svg-icons/action/trending-up';
import TrendingDown from 'material-ui/svg-icons/action/trending-down';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import Pause from 'material-ui/svg-icons/av/pause';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import ZoomOut from 'material-ui/svg-icons/action/zoom-out';

import { red300, red500, red900,
         green300, green500, green900,
         grey300, grey500, grey700 } from 'material-ui/styles/colors';

const icons = {
  trendingUp: <TrendingUp />,
  trendingDown: <TrendingDown />,
  play: <PlayArrow />,
  pause: <Pause />,
  zoomIn: <ZoomIn />,
  zoomOut: <ZoomOut />,
};

const color = {
  trendingUp: {
    base: red500,
    hover: red900,
    ripple: red300,
  },
  trendingDown: {
    base: green500,
    hover: green900,
    ripple: green300,
  },
};


const GameControlButton = (props) => {
  const { handleClick, icon } = props;
  // const style = {
  //   color: color[icon] ? color[icon] : 'white',
  // };
  return (
    <FlatButton
      onTouchTap={handleClick}
      backgroundColor={color[icon] ? color[icon].base : grey500}
      hoverColor={color[icon] ? color[icon].hover : grey700}
      rippleColor={color[icon] ? color[icon].ripple : grey300}
      icon={icons[icon]}
    />
  );
};

GameControlButton.propTypes = {
  handleClick: PropTypes.func,
  icon: PropTypes.string,
};

export default GameControlButton;
