import React, { PropTypes, Component } from 'react';
import GameChart from '../components/chart/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as gameControlActions from '../actions/game';
import * as tradeActions from '../actions/trade';
import GameControlButton from '../components/GameControlButton';

// const dataUrl = '/data/txf_1998_2015.csv';
const dataUrl = '/data/TX_01_16.txt';

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
    // this.props.gameControl.fetchData(dataUrl);
    if (!this.props.gameData) this.props.gameControl.fetchData(dataUrl);
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
    this.props.gameControl.pauseGame();
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
        <div className="game-bg">
          <div className="container main-game">
            <div className="game-area">
              <GameChart />
            </div>
            <div className="control-panel">
              <GameControlButton handleClick={this.goUp} icon="trendingUp" />
              <GameControlButton
                handleClick={this.props.gameStart ? this.endGame : this.startGame}
                icon={this.props.gameStart ? 'pause' : 'play'}
              />
              <GameControlButton handleClick={this.goDown} icon="trendingDown" />
            </div>
            <div className="game-infos">
              <span className="info">Position: {this.props.position}</span>
              <span className="info">Account: {this.props.account}</span>
            </div>
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
  account: PropTypes.number,
};

const mapStateToProps = (state) => ({
  gameStart: state.game.start,
  gameSpeed: state.game.durationBetweenBars,
  gameData: state.game.data,
  lastTickIndex: state.game.lastTickIndex,
  position: state.trade.position,
  account: state.trade.account,
});

function mapDispatchToProps(dispatch) {
  return {
    gameControl: bindActionCreators(gameControlActions, dispatch),
    trade: bindActionCreators(tradeActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
