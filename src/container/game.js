import React, { PropTypes, Component } from 'react';
import CandlestickChart from '../components/candlestick_chart';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as gameControlActions from '../actions/game';
import * as tradeActions from '../actions/trade';

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
            <button className="game-play -buy" onClick={this.goUp}>Buy / Cover</button>
            <span className="position">{this.props.position}</span>
            <button className="game-play -sell" onClick={this.goDown}>Sell / Short</button>
          </div>
          <div className="game-panel">
            <button className="game-play -control" onClick={this.startGame}>
              <i className="icon-control-play" /></button>
            <button className="game-play -control" onClick={this.endGame}>
              <i className="icon-control-pause" /></button>
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
