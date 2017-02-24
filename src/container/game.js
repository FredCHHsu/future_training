import React, { PropTypes, Component } from 'react';
import GameChart from '../components/chart/index';
import { connect } from 'react-redux';
import { fetchData } from '../actions/game';
import GamePlayPanel from './GamePlayPanel';

// const dataUrl = '/data/txf_1998_2015.csv';
const dataUrl = '/data/TX_01_16.txt';

class GamePage extends Component {
  componentWillMount() {
    if (!this.props.gameData) this.props.fetchData(dataUrl);
  }
  render() {
    return (
      <div id="index-page" className="page-container">
        <div className="game-bg">
          <div className="container main-game">
            <div className="game-area">
              <GameChart />
            </div>
            <GamePlayPanel />
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
  fetchData: PropTypes.func,
  gameData: PropTypes.array,
  position: PropTypes.number,
  account: PropTypes.number,
};

const mapStateToProps = (state) => ({
  gameData: state.game.data,
  position: state.trade.position,
  account: state.trade.account,
});

export default connect(mapStateToProps, { fetchData })(GamePage);
