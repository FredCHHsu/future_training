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
    this.state = {
      game: null,
    };
  }
  componentWillMount() {
    this.props.fetchData(dataUrl);
  }
  componentDidUpdate() {
    if (this.props.gameData &&
        this.props.gameData.length <= this.props.barsInChart + this.props.gameTime) {
      this.endGame();
    }
  }
  startGame() {
    if (!this.props.gameStart) {
      this.props.startGame();
      this.setState({
        game: setInterval(this.props.gameTick, this.props.gameSpeed),
      });
    }
  }
  endGame() {
    clearInterval(this.state.game);
    // eslint-disable-next-line no-console
    console.log('END GAME');
  }
  render() {
    return (
      <div id="index-page">
        <h1 className="hello">Index Page</h1>
        <CandlestickChart />
        <button onClick={this.startGame}>Go!</button>
        <button onClick={this.endGame}>End</button>
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
  gameTime: PropTypes.number,
  barsInChart: PropTypes.number,
};

const mapStateToProps = (state) => ({
  gameStart: state.game.start,
  gameSpeed: state.game.durationBetweenBars,
  gameData: state.game.data,
  gameTime: state.game.time,
  barsInChart: state.chart.barsInChart,
});

export default connect(mapStateToProps,
  { fetchData, startGame, gameTick })(IndexPage);
