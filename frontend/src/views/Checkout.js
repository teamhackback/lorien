import React, {Component} from 'react';
import menuTitleStore from '../MenuTitleStore';
import Button from '../components/Button';
import {Link} from 'react-router-dom';
import cartItems from '../CartItems';

const viewWrapper = {
  height: 100 + "vh",
  backgroundImage: "url(\"/img/details_bg.jpg\")",
  backgroundSize: "cover",
  width: 100 + '%'
}

const notice = {
  color: "#ebebeb",
  fontSize: 24 + 'px',
  textAlign: 'center',
  paddingTop: 70 + 'px',
  paddingBottom: 70 + 'px'
}


export default class Checkout extends Component {
  componentWillMount() {
    menuTitleStore.title = "Checkout";
    menuTitleStore.progressSelected = 3;
  }

  render() {
    return (
      <div style={viewWrapper}>
        <div style={{width: 75 + '%', margin: '0 auto'}}>
          {
            cartItems.beehives.length === 0 && cartItems.trees.length === 0 && cartItems.carbonCredits.length === 0 ? 
            <div style={notice}>
              Your cart is empty!
            </div> :
            cartItems.beehives.map((item, i) => {
              console.log(item)
            })
          }

          <div style={{ animationDuration: 0.5 + 's', animationDelay: 0.25 + 's', marginBottom: 20 + 'px'}} className="animated fadeInDown">
            <Link to="/">
              <Button title="Continue Shopping" style={{width: 90 + '%', margin: 'auto'}}/>
            </Link>
          </div>

          {
            cartItems.beehives.length === 0 && cartItems.trees === 0 && cartItems.carbonCredits === 0 ? 
              ''
            : <div style={{ animationDuration: 0.5 + 's', animationDelay: 0.5 + 's'}} className="animated fadeInDown">
                <div style={{textAlign: 'center'}} >
                  <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/cc-badges-ppmcvdam.png" alt="Buy now with PayPal" />
                </div>
              </div>
          }



        </div>
      </div>
    )
  }
}
