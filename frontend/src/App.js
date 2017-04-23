import React, {Component} from 'react';
import logo from './logo.svg';
import beehive from '../public/img/beehive.svg';

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
import ProductList from './views/ProductList';
import ProductView from './views/ProductView';
import LocationPicker from './views/LocationPicker';
import ExtraServices from './views/ExtraServices';
import Checkout from './views/Checkout';
import Carbon from './views/Carbon';
import Apiary from './views/Apiary';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

require('velocity-animate');
require('velocity-animate/velocity.ui');

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <AppBar />
              <Route exact path="/" component={ProductList} />
              <Route path="/order/products" component={ProductView} />
              <Route path="/order/location" component={LocationPicker} />
              <Route path="/order/extraservices" component={ExtraServices} />
              <Route path="/products/carbon" component={Carbon} />
              <Route path="/order/checkout" component={Checkout} />
              <Route path="/products/apiary" component={Apiary} />
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
