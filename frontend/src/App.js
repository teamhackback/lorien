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

import AppBar from './AppBar';
import MainView from './views/MainView';
import ProductView from './views/ProductView';
import LocationPicker from './views/LocationPicker';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <AppBar />
            <Route exact path="/" component={MainView} />
            <Route path="/products" component={ProductView} />
            <Route path="/location" component={LocationPicker} />
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
