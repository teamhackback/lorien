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
import ProductList from './views/ProductList';
import ProductView from './views/ProductView';
import LocationPicker from './views/LocationPicker';
import ExtraServices from './views/ExtraServices';
import Checkout from './views/Checkout';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { RouteTransition } from 'react-router-transition';

require('velocity-animate');
require('velocity-animate/velocity.ui');

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <AppBar />
            <ReactCSSTransitionGroup
              transitionName="fade"
              transitionEnterTimeout={3000}
              transitionLeaveTimeout={300}
            >
              <Route path="/" component={ProductList} />
             </ReactCSSTransitionGroup>
              <Route path="/order/products" component={ProductView} />
            <Route path="/order/location">
               {({ match }) => (
                <RouteTransition
                        atEnter={{ opacity: 0 }}
                        atLeave={{ opacity: 0 }}
                        atActive={{ opacity: 1 }}
                        pathname={location.pathname}>
                    {match && <LocationPicker />}
                </RouteTransition>
                )}
            </Route>
            <Route path="/order/extraservices">
               {({ match }) => (
                <RouteTransition
                        atEnter={{ opacity: 0 }}
                        atLeave={{ opacity: 0 }}
                        atActive={{ opacity: 1 }}
                        pathname={location.pathname}>
                    {match && <ExtraServices />}
                </RouteTransition>
                )}
            </Route>
            <Route path="/order/checkout" component={Checkout} />

          </div>
        </Router>
      </div>
    )
  }
}

export default App;
