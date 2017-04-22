import React, {Component} from 'react';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

//styles
import './App.less';
import './App.scss';
import './App.styl';
import styles from './Modules.css';

import AppBar from './views/AppBar';
import MainView from './views/MainView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar />
        <Router>
          <Route path="/" component={MainView} />
        </Router>
      </div>
    )
  }
}

export default App;
