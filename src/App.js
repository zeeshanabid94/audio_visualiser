import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Visualiser from './components/visualiser/Visualiser';

const headingStyle = {
  marginBottom: "0%",
  marginTop: "1%",
}

class App extends Component {
  render() {
    return (
      <div className="App">
      <h1 style={headingStyle}>Visualiser</h1>
        <Visualiser />
      </div>
    );
  }
}

export default App;
