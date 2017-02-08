import React, { PropTypes } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TrendingUp from 'material-ui/svg-icons/action/trending-up';
import TrendingDown from 'material-ui/svg-icons/action/trending-down';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import Pause from 'material-ui/svg-icons/av/pause';
import Settings from 'material-ui/svg-icons/action/settings';
import { red500, green500, blue500 } from 'material-ui/styles/colors';

const iconCollection = {
  trendingUp: <TrendingUp />,
  trendingDown: <TrendingDown />,
  play: <PlayArrow />,
  pause: <Pause />,
  settings: <Settings />,
};

const colorSelection = {
  trendingUp: red500,
  trendingDown: green500,
};

const GameControlButton = (props) => {
  const { handleClick, icon } = props;
  return (
    <FloatingActionButton
      onClick={handleClick}
      backgroundColor={colorSelection[icon] ? colorSelection[icon] : blue500}
    >
      {iconCollection[icon]}
    </FloatingActionButton>
  );
};

GameControlButton.propTypes = {
  handleClick: PropTypes.func,
  icon: PropTypes.string,
};

export default GameControlButton;
