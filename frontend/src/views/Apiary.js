import React, {Component} from 'react';
import menuTitleStore from '../MenuTitleStore';
import {VelocityComponent, VelocityTransitionGroup} from 'velocity-react';

import Button from '../components/Button';
import CustomSlider from '../components/Slider';
import cartItems from '../CartItems';
import {findDOMNode} from 'react-dom';

const viewWrapper = {
  height: 100 + "vh",
  backgroundImage: "url(\"/img/details_bg.jpg\")",
  backgroundSize: "cover",
  width: 100 + '%'
}

const valueWrapper = {
  color: "#ebebeb",
  fontSize: 14 + 'px',
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 20 + 'px',
  marginBottom: 40 + 'px',
}

const totalPriceWrapper = {
  textAlign: 'center',
  color: "#ebebeb",
  fontSize: 14 + 'px',
  marginBottom: 40 + 'px',
  animationDuration: 0.5 + 's',
  animationDelay: 0.5 + 's'
}

const itemInformation = [
  {
    'name': 'Small Beehive',
    'liters': 1,
    'price': 10
  }, 
  {
    'name': 'Medium Beehive',
    'liters': 2,
    'price': 20
  },
  {
    'name': 'Large Beehive',
    'liters': 4,
    'price': 30
  },
];

export default class Apiary extends Component {
  static contextTypes = { router: React.PropTypes.object }

  constructor(props) {
    super(props);
    this.state = {
      sliderValue: 2,
      doAnimate: 0
    }
  }

  componentWillMount() {
    menuTitleStore.title = "Establish a beehive";
    menuTitleStore.progressSelected = 3;
  }

  componentDidMount() {
    this.setState({
      doAnimate: 1
    });
  }

  handleSliderChange = (e, v) => {
    this.setState({
      sliderValue: v
    });
  }

  handleConfirm = (e) => {
    e.preventDefault();
    cartItems.beehive.size = itemInformation[this.state.sliderValue - 1]['name']
    cartItems.beehive.value = this.state.sliderValue

    const node = findDOMNode(this);
    node.className = "fadeOutEffect";
    setTimeout(() => {
      this.context.router.history.push("/order/location");
    }, 300);
  }

  render() {
    return (
      <div style={viewWrapper}>
        <div style={{width: 75 + '%', margin: '0 auto'}}>
          <div style={{width: 100 + '%', textAlign: 'center'}}>
            <VelocityTransitionGroup enter={{animation: "transition.flipXIn", duration: 1000}} leave={{animation: "slideUp"}} runOnMount={true}>
              <img style={{margin: "auto", padding: "40px 0", width: "65%"}} src={'/img/apiary' + this.state.sliderValue + '.svg'} alt="beehive"/>
            </VelocityTransitionGroup>
          </div>

          <div style={{ animationDuration: 0.5 + 's', animationDelay: 0.25 + 's'}} className="animated fadeInDown">
            <div style={{padding: "0 20px"}}>
              <CustomSlider min={1} max={3} step={1} defaultValue={this.state.sliderValue} onSliderChange={this.handleSliderChange}/>
            </div>
            <div style={valueWrapper}>
              <div className={this.state.sliderValue === 1 ? 'current' : ''}>Small</div>
              <div className={this.state.sliderValue === 2 ? 'current' : ''}>Medium</div>
              <div className={this.state.sliderValue === 3 ? 'current' : ''}>Large</div>
            </div>
          </div>

          <div style={totalPriceWrapper} className="animated fadeInDown">
            <p style={{ borderTop: "1px solid #979797", borderBottom: "1px solid #979797", padding: "10px 0"}}>
              {itemInformation[this.state.sliderValue - 1]['liters'] + "L of honey for €" + itemInformation[this.state.sliderValue - 1]['price'] + "/month"}
            </p>
          </div>
          <div style={{ animationDuration: 0.5 + 's', animationDelay: 0.75 + 's'}} className="animated fadeInDown">
            <Button title="Confirm" style={{margin: 'auto'}} onClick={this.handleConfirm}/>
          </div>
        </div>

      </div>
    )
  }
}
