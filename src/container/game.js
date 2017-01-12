import React, { PropTypes, Component } from 'react';
import CandlestickChart from '../components/candlestick_chart';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as gameControlActions from '../actions/game';
import * as tradeActions from '../actions/trade';
import GameControlButton from '../components/game_control_button';

const dataUrl = '/data.csv';

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.goUp = this.goUp.bind(this);
    this.goDown = this.goDown.bind(this);
    this.state = {
      game: null,
    };
  }
  componentWillMount() {
    // console.log(gameControl);
    this.props.gameControl.fetchData(dataUrl);
  }
  componentDidUpdate() {
    if (this.props.gameData &&
        this.props.gameData.length <= this.props.lastTickIndex + 1) {
      this.endGame();
    }
  }
  startGame() {
    if (!this.state.game) {
      this.props.gameControl.startGame();
      this.setState({
        game: setInterval(this.props.gameControl.gameTick, this.props.gameSpeed),
      });
    }
  }
  endGame() {
    clearInterval(this.state.game);
    this.setState({ game: null });
    console.log('END GAME');
  }
  goUp() {
    if (this.props.position >= 0) {
      this.props.trade.buy(this.props.gameData[this.props.lastTickIndex]);
    } else if (this.props.position < 0) {
      this.props.trade.cover(this.props.gameData[this.props.lastTickIndex]);
    }
  }
  goDown() {
    if (this.props.position > 0) {
      this.props.trade.sell(this.props.gameData[this.props.lastTickIndex]);
    } else if (this.props.position <= 0) {
      this.props.trade.short(this.props.gameData[this.props.lastTickIndex]);
    }
  }
  render() {
    return (
      <div id="index-page">
        <div className="container">
          <CandlestickChart />
          <div className="game-panel">
            <GameControlButton handleClick={this.goUp} icon="trendingUp" />
            <span className="position">{this.props.position}</span>
            <GameControlButton handleClick={this.goDown} icon="trendingDown" />
          </div>
          <div className="game-panel">
            <GameControlButton handleClick={this.startGame} icon="play" />
            <GameControlButton handleClick={this.endGame} icon="pause" />
            <GameControlButton handleClick={this.endGame} icon="settings" />
          </div>
        </div>
      </div>
    );
  }
}

GamePage.propTypes = {
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
  gameSpeed: state.game.durationBetweenBars,
  gameData: state.game.data,
  lastTickIndex: state.game.lastTickIndex,
  position: state.trade.position,
});

function mapDispatchToProps(dispatch) {
  return {
    gameControl: bindActionCreators(gameControlActions, dispatch),
    trade: bindActionCreators(tradeActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
