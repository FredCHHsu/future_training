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
  startGame() {
    this.props.startGame();
    this.setState({
      game: setInterval(this.props.gameTick, 1000),
    });
  }
  endGame() {
    clearInterval(this.state.game);
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
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps,
  { fetchData, startGame, gameTick })(IndexPage);
