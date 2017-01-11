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
    this.buy = this.buy.bind(this);
    this.short = this.short.bind(this);
    this.sell = this.sell.bind(this);
    this.cover = this.cover.bind(this);
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
    // if (!this.props.gameStart) {
    this.props.gameControl.startGame();
    this.setState({
      game: setInterval(this.props.gameControl.gameTick, this.props.gameSpeed),
    });
    // }
  }
  endGame() {
    clearInterval(this.state.game);
    // eslint-disable-next-line no-console
    console.log('END GAME');
  }
  buy() {
    this.props.trade.buy(this.props.gameData[this.props.lastTickIndex]);
  }
  sell() {
    this.props.trade.sell(this.props.gameData[this.props.lastTickIndex]);
  }
  short() {
    this.props.trade.short(this.props.gameData[this.props.lastTickIndex]);
  }
  cover() {
    this.props.trade.cover(this.props.gameData[this.props.lastTickIndex]);
  }
  render() {
    return (
      <div id="index-page">
        <h1 className="hello">Index Page</h1>
        <CandlestickChart />
        <button className="" onClick={this.startGame}>Go!</button>
        <button className="" onClick={this.endGame}>End</button>
        <button className="buy" onClick={this.buy}>Buy</button>
        <button className="sell" onClick={this.sell}>Sell</button>
        <button className="short" onClick={this.short}>Short</button>
        <button className="cover" onClick={this.cover}>Cover</button>
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
};

const mapStateToProps = (state) => ({
  gameStart: state.game.start,
  gameSpeed: state.game.durationBetweenBars,
  gameData: state.game.data,
  lastTickIndex: state.game.lastTickIndex,
});

function mapDispatchToProps(dispatch) {
  return {
    gameControl: bindActionCreators(gameControlActions, dispatch),
    trade: bindActionCreators(tradeActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
