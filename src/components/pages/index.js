import React, { PropTypes, Component } from 'react';
import CandlestickChart from '../candlestickChart';
import { connect } from 'react-redux';
import { startGame, gameTick } from '../../actions/index';

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.state = {
      game: null,
    };
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
  startGame: PropTypes.func,
  gameTick: PropTypes.func,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps, { startGame, gameTick })(IndexPage);
