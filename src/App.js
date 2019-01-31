import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Visualiser from './components/visualiser/Visualiser';
import {FaGithub, FaLinkedin} from 'react-icons/fa';


const AppStyle = {
  
}
class App extends Component {
  render() {
    return (
      <div className="App">
      <h1>Visualiser</h1>
      <div class="tag-container">
        <div class="tag">
          Created By:
          Zeeshan Abid
        </div>
        <a href="https://github.com/zeeshanabid94/audio_visualiser">
          <FaGithub class="icon"/>
        </a>
        
        <a href="https://www.linkedin.com/in/zeeshan-abid/">
          <FaLinkedin class="icon"/>
        </a>
        
      </div>
      
      <div class="visualizer">
      
        <Visualiser />
      </div>
      
      </div>
    );
  }
}

export default App;
