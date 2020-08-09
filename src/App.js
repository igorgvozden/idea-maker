import React, { Component } from 'react';
import './App.scss';
import Navigation from './componenets/navigation/Navigation';
import Home from './componenets/home/Home';
import Sidebar from './componenets/sidebar/Sidebar';

class App extends Component {
  constructor () {
    super();

    this.state = {
      
    }
  }

  render() {
    
    return (
      <div className="app">
        <Navigation />
        <div className='app__comp-container'>
          <Sidebar />
          <Home />
        </div>
      </div>
    );
  }
}

export default App;
