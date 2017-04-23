import React, {Component} from 'react';
import menuTitleStore from '../MenuTitleStore';
import Button from '../components/Button';
import {Link} from 'react-router-dom';
import cart from '../CartItems';
import locations from '../Locations';

const viewWrapper = {
  height:  "100vh",
  backgroundImage: "url(\"/img/details_bg.jpg\")",
  backgroundSize: "cover",
  width: '100%',
  color: "white",
}

const notice = {
  color: "#ebebeb",
  fontSize: 24 + 'px',
  textAlign: 'center',
  paddingTop: 70 + 'px',
  paddingBottom: 70 + 'px'
}

function ExtraItem(props) {
  return (
    <div style={{
      borderTop: props.index === 0 ? "solid 1px #979797" : null,
      borderBottom: "solid 1px #979797",
      fontSize: 14,
      display: "flex",
      justifyContent: "space-between",
      paddingTop: 10,
      paddingBottom: 10,
      fontWeight: 300,
    }}>
      <div>
        {props.data.title}
      </div>

      <div>
        +{props.data.cost || 10}$/m
      </div>
    </div>
  );
}


export default class Checkout extends Component {
  constructor(props) {
    super(props);
    let mainImg, mainText, mainCost,totalCost;
    const location = "Helsinki";
    switch(cart.globalCategory) {
      case "tree":
        mainImg = `/img/trees/${cart.tree.selectedType}.svg`;
        mainText = `You are going to plant a ${cart.tree.selectedType} tree in ${location}`;
        mainCost = 5;
        break;
    }
    totalCost = 100;
    this.state = {
      mainImg,
      mainText,
      mainCost,
      totalCost
    }
  }
  componentWillMount() {
    menuTitleStore.title = "Checkout";
    menuTitleStore.progressSelected = 3;
  }

  render() {
    return (
      <div style={viewWrapper}>
          <img src="/dummy/checkoutbg.png" style={{
            marginTop: 20,
            maxWidth: 30,
            maxHeight: 30,
            float: "left"
          }}/>

          {
            cart.globalCategory === null ?
            <div style={notice}>
              Your cart is empty!
            </div> :
            <div style={{
                margin: "0 auto",
                maxWidth: "90%",
            }}>
              <div style={{
                paddingTop: 25,
                paddingBottom: 16
              }}>
                  <img src={this.state.mainImg} style={{
                    display: "block",
                    maxWidth: 88,
                    maxHeight: 88,
                    margin: "0 auto",
                  }}/>
              </div>
               <div style={{
                fontSize: 18,
                fontWeight: 600,
                lineHeight: 1.5,
                textAlign: "center",
                paddingBottom: 20,
                margin: "0 auto",
              }}>
                  { this.state.mainText}
              </div>
              <div style={{
                fontSize: 14,
                fontWeight: 300,
                lineHeight: 1.57,
                margin: "0 auto",
                paddingBottom: 20,
                textAlign: "center",
              }}>
                This will cost you:  {this.state.mainCost} $ / month
              </div>

              <div style={{
                paddingBottom: 20,
              }}>
                <div style={{
                  paddingBottom: 15
                }}> Extras: </div>

                  { cart.premiumService.map((item, i)=>
                  <ExtraItem key={i} index={i} data={item} />
                  )}
                  <div style={{
                    paddingTop: 20,
                    fontSize: 18,
                    fontWeight: 600,
                    lineHeight: 1.5
                  }}>
                    Total: {this.state.totalCost}$/m
                  </div>
              </div>

              <div style={{
                paddingTop: 40
              }}>
                <div style={{ animationDuration: 0.5 + 's', animationDelay: 0.25 + 's', marginBottom: 20 + 'px'}} className="animated fadeInDown">
                  <Link to="/">
                    <Button title="Continue Shopping" style={{width: 90 + '%', margin: 'auto'}}/>
                  </Link>
                </div>

                <div style={{ animationDuration: 0.5 + 's', animationDelay: 0.5 + 's'}} className="animated fadeInDown">
                    <div style={{textAlign: 'center'}} >
                      <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/cc-badges-ppmcvdam.png" alt="Buy now with PayPal" />
                    </div>
                </div>
              </div>
            </div>
          }
      </div>
    )
  }
}
