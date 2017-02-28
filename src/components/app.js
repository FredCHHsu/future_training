import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import gameTheme from '../gameTheme';
import NavBar from './NavBar/NavBar';

const App = (props) =>
  <MuiThemeProvider muiTheme={getMuiTheme(gameTheme)}>
    <div id="app">
      <NavBar />
      {props.children}
    </div>
  </MuiThemeProvider>;

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
