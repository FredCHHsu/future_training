import React, { PropTypes, Component } from 'react';
import CandlestickChart from '../candlestickChart';
import { connect } from 'react-redux';
import { fetchData, startGame, gameTick } from '../../actions/index';

const dataUrl = '/data.csv';

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.buy = this.buy.bind(this);
    this.short = this.short.bind(this);
    this.state = {
      game: null,
    };
  }
  componentWillMount() {
    this.props.fetchData(dataUrl);
  }
  componentDidUpdate() {
    if (this.props.gameData &&
        this.props.gameData.length <= this.props.lastTickIndex + 1) {
      this.endGame();
    }
  }
  startGame() {
    // if (!this.props.gameStart) {
    this.props.startGame();
    this.setState({
      game: setInterval(this.props.gameTick, this.props.gameSpeed),
    });
    // }
  }
  endGame() {
    clearInterval(this.state.game);
    // eslint-disable-next-line no-console
    console.log('END GAME');
  }
  buy() {
    /* eslint-disable no-console */
    console.log('Buy at:');
    console.log(this.props.gameData[this.props.lastTickIndex]);
    /* eslint-enable */
  }
  short() {
    /* eslint-disable no-console */
    console.log('Short at:');
    console.log(this.props.gameData[this.props.lastTickIndex]);
    /* eslint-enable */
  }
  render() {
    return (
      <div id="index-page">
        <h1 className="hello">Index Page</h1>
        <CandlestickChart />
        <button onClick={this.startGame}>Go!</button>
        <button onClick={this.endGame}>End</button>
        <button onClick={this.buy}>Buy</button>
        <button onClick={this.short}>Short</button>
      </div>
    );
  }
}

IndexPage.propTypes = {
  fetchData: PropTypes.func,
  startGame: PropTypes.func,
  gameTick: PropTypes.func,
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

export default connect(mapStateToProps,
  { fetchData, startGame, gameTick })(IndexPage);
