import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as gameControlActions from '../actions/game';
import * as tradeActions from '../actions/trade';
import GameControlButton from '../components/GameControlButton';

class GamePlayPanel extends Component {
  constructor(props) {
    super(props);
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.goUp = this.goUp.bind(this);
    this.goDown = this.goDown.bind(this);
    this.state = {
      gameTick: null,
    };
  }
  componentDidUpdate() {
    const { gameData, lastTickIndex } = this.props;
    if (gameData &&
        gameData.length <= lastTickIndex + 1) {
      this.endGame();
    }
  }
  startGame() {
    const { gameControl, gameSpeed } = this.props;
    if (!this.state.gameTick) {
      gameControl.startGame();
      this.setState({
        gameTick: setInterval(gameControl.gameTick, gameSpeed),
      });
    }
  }
  endGame() {
    const { gameControl } = this.props;
    clearInterval(this.state.gameTick);
    this.setState({ gameTick: null });
    gameControl.pauseGame();
  }
  goUp() {
    const { position, trade, gameData, lastTickIndex } = this.props;
    if (position >= 0) {
      trade.buy(gameData[lastTickIndex]);
    } else if (position < 0) {
      trade.cover(gameData[lastTickIndex]);
    }
  }
  goDown() {
    const { position, trade, gameData, lastTickIndex } = this.props;
    if (position > 0) {
      trade.sell(gameData[lastTickIndex]);
    } else if (position <= 0) {
      trade.short(gameData[lastTickIndex]);
    }
  }
  render() {
    const { gameStart } = this.props;
    return (
      <div className="control-panel">
        <GameControlButton handleClick={this.goUp} icon="trendingUp" />
        <GameControlButton
          handleClick={gameStart ? this.endGame : this.startGame}
          icon={gameStart ? 'pause' : 'play'}
        />
        <GameControlButton handleClick={this.goDown} icon="trendingDown" />
      </div>
    );
  }
}

GamePlayPanel.propTypes = {
  gameControl: PropTypes.object,
  trade: PropTypes.object,
  gameStart: PropTypes.bool,
  gameSpeed: PropTypes.number,
  gameData: PropTypes.array,
  lastTickIndex: PropTypes.number,
  position: PropTypes.number,
};

const mapStateToProps = (state) => ({
  gameStart: state.game.start,
  gameSpeed: state.chart.durationBetweenBars,
  gameData: state.chart.data,
  lastTickIndex: state.chart.lastTickIndex,
  position: state.trade.position,
});

function mapDispatchToProps(dispatch) {
  return {
    gameControl: bindActionCreators(gameControlActions, dispatch),
    trade: bindActionCreators(tradeActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePlayPanel);
