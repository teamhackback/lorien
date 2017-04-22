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
              <Route exact path="/" component={MainView} />
             </ReactCSSTransitionGroup>
              <Route path="/order/list" component={ProductList} />
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
            <Route path="/products/carbon" component={Carbon} />
            <Route path="/products/apiary" component={Apiary} />
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
