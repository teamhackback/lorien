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

  static contextTypes = { router: React.PropTypes.object }
  constructor(props) {
    super(props);
    const afterPayPal = window.location.pathname.indexOf("thanks") >= 0;

    let mainImg, mainText, mainCost, totalCost, loading, premiumServices, globalCategory;
    if (!afterPayPal) {
      const selectedLocations = locations.filter(e => e.selected);
      const location = selectedLocations.length > 0 && selectedLocations[0].title;
      switch(cart.globalCategory) {
        case "tree":
          mainImg = `/img/trees/${cart.tree.selectedType.toLowerCase()}.svg`;
          mainText = `You are going to plant a ${cart.tree.selectedType} tree in ${location}`;
          mainCost = 50;
          break;
        case "beehive":
          mainImg = `/img/apiary${cart.beehive.value}.svg`;
          mainText = `You are going to plant a ${cart.beehive.size.toLowerCase()} beehive in ${location}`;
          mainCost = 100 * cart.beehive.value;
          break;
        case "carbon":
          mainImg = `/img/carbon.png`;
          mainText = `You are going to adapt ${cart.carbon.nrOfTrees} trees in ${location} to compensate for ${cart.carbon.co2} of carbon footprint`;
          mainCost = 10 * cart.carbon.nrOfTrees;
          break;
      }
      totalCost = mainCost + cart.premiumServices.map(e => e.cost).reduce((a, b) => a + b, 0);
      loading = false;
      globalCategory = cart.globalCategory;
      premiumServices = cart.premiumServices;
    } else {
      // MAKE request
      loading = true;
      const orderId = window.location.pathname.split("/").slice(-1)[0];
      console.log("orderId", orderId);

      fetch('https://lorien.hackback.tech/api/order/' + orderId, {
      	method: 'get'
      }).then((response) => {
        return response.json();
      }).then((response) => {
        this.loadThankYou(response);
      });
    }
    this.state = {
      mainImg,
      mainText,
      mainCost,
      totalCost,
      afterPayPal,
      loading,
      premiumServices,
      globalCategory
    }
  }
  loadThankYou(response) {
    console.log(response);
    let mainImg, mainText, mainCost, totalCost;
    const loading = false;
    const selectedLocations = response.locations.filter(e => e.selected);
    const location = selectedLocations.length > 0 && selectedLocations[0].title;
    mainText = "We received your order for ";
    switch(response.globalCategory) {
      case "tree":
        mainImg = `/img/trees/${response.tree.selectedType.toLowerCase()}.svg`;
        mainText += `a ${response.tree.selectedType} tree in ${location}`;
        mainCost = 50;
        break;
      case "beehive":
        mainImg = `/img/apiary${response.beehive.value}.svg`;
        mainText + `planting ${response.beehive.size.toLowerCase()} beehive in ${location}`;
        mainCost = 100 * response.beehive.value;
        break;
      case "carbon":
        mainImg = `/img/carbon.png`;
        mainText += `adaption of ${response.carbon.nrOfTrees} trees in ${location} to compensate for ${response.carbon.co2} of carbon footprint`;
        mainCost = 10 * response.carbon.nrOfTrees;
        break;
    }
    totalCost = mainCost + response.premiumServices.map(e => e.cost).reduce((a, b) => a + b, 0);
    this.setState({
      mainImg,
      mainText,
      mainCost,
      totalCost,
      loading,
      premiumServices : response.premiumServices,
      globalCategory: response.globalCategory,
    });
  }
  componentWillMount() {
    menuTitleStore.title = "Checkout";
    menuTitleStore.progressSelected = 3;
  }

  handleClick = (e) => {
    const obj = {
        totalCost: this.state.totalCost,
        mainCost: this.state.mainCost,
        locations,
        ...cart,
      };
    console.log('sending:' + JSON.stringify(obj))
    fetch('https://lorien.hackback.tech/api/order', {
      method: 'post',
      mode: 'cors',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(obj)
    }).then((response) => {
      response.json().then((body) => {
        cart.clear();
        window.location = body;
      });
    });
  }

  render() {
    return (
      <div style={viewWrapper}>
          { this.state.loading === true ? <div style={{
              margin: "0 auto",
              textAlign: "center",
              paddingTop: "20vh",
              fontSize: 40,
          }}>Loading</div> :
          <div>
            <img src="/dummy/checkoutbg.png" style={{
              marginTop: 20,
              maxWidth: 30,
              maxHeight: 30,
              float: "left"
            }}/>

          {
            this.state.globalCategory === null ?
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
                { this.state.afterPayPal ? "Total cost:" : "This will cost you:"}  {this.state.mainCost} $ / month
              </div>

              { this.state.premiumServices.length > 0 ?
              <div style={{
                paddingBottom: 20,
              }}>
                <div style={{
                  paddingBottom: 15
                }}> Extras: </div>

                  { this.state.premiumServices.map((item, i)=>
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
              : null }

              <div style={{
                paddingTop: 40
              }}>
                <div style={{ animationDuration: 0.5 + 's', animationDelay: 0.25 + 's', marginBottom: 20 + 'px'}} className="animated fadeInDown">
                    <Button onClick={this.handleClick} title="Finish shopping" style={{width: 90 + '%', margin: 'auto'}}/>
                </div>

                <div style={{ animationDuration: 0.5 + 's', animationDelay: 0.5 + 's'}} className="animated fadeInDown">
                    <div style={{textAlign: 'center'}} onClick={this.handleClick}>
                      <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/cc-badges-ppmcvdam.png" alt="Buy now with PayPal" />
                    </div>
                </div>
              </div>
            </div>
          }
          </div>
        }
      </div>
    )
  }
}
