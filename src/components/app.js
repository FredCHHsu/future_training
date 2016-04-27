import React, { PropTypes } from 'react';

const App = (props) =>
  <div id="App">
    {props.children}
  </div>;

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
