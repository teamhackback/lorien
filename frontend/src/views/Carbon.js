import React, {Component} from 'react';
import menuTitleStore from '../MenuTitleStore';
import {VelocityComponent, VelocityTransitionGroup} from 'velocity-react';

import Button from '../components/Button';
import CustomSlider from '../components/Slider';
import cartItems from '../CartItems';

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
  padding: '0 10px'
}

const textWrapper = {
  color: "#ebebeb",
  fontSize: 18 + 'px',
}

const numTreesWrapper = {
  margin: "40px 0",
  color: "#ebebeb",
  fontSize: 18 + 'px',
  animationDuration: 0.5 + 's',
  animationDelay: 0.75 + 's'
}

const totalPriceWrapper = {
  textAlign: 'center',
  color: "#ebebeb",
  fontSize: 14 + 'px',
  marginBottom: 40 + 'px',
  animationDuration: 0.5 + 's',
  animationDelay: 1 + 's'
}


const currentValue = {
  fontWeight: 'bold'
}

var roundToTwo = (num) => {    
    return +(Math.round(num + "e+2")  + "e-2");
}

var inHumanUnits = (val) => {
  if(val * 0.001 >= 1000) {
    // scale slider value to tonnes
    return roundToTwo(val * 0.000001) + ' t'
  } else {
    return roundToTwo(val * 0.001) + ' kg'
  }
} 

const chargePerTreePerYear = 10;

var getNumTrees = (val) => {
  // according to http://sustainability.tufts.edu/carbon-sequestration/
  // a single pine usual sequesters 6803.890 grams of CO2 per year
  return Math.ceil(val / 6804)
}

export default class Carbon extends Component {
  static contextTypes = { router: React.PropTypes.object }

  constructor(props) {
    super(props);
    this.state = {
      sliderValue: 20000,
      numTrees: getNumTrees(20000)
    }
  }

  componentWillMount() {
    menuTitleStore.title = "Offset your CO₂ footprint";
    menuTitleStore.progressSelected = 3;
  }

  handleSliderChange = (e, v) => {
    this.setState({
      sliderValue: v,
      numTrees: getNumTrees(v)
    });
  }

  handleConfirm = (e) => {
    e.preventDefault();
    cartItems.carbon.nrOfTrees = this.state.numTrees;
    cartItems.carbon.co2 = inHumanUnits(this.state.sliderValue);
    console.log(cartItems);
    this.context.router.history.push("/order/location");
  }

  render() {
    return (
      <div style={viewWrapper}>
        <div style={{width: 75 + '%', margin: '0 auto'}}>
          <div style={{width: 100 + '%', textAlign: 'center'}}>
            <VelocityTransitionGroup enter={{animation: "transition.flipXIn", duration: 1000}} leave={{animation: "slideUp"}} runOnMount={true}>
            <img style={{margin: "auto", padding: "40px 0"}} src={'/img/carbon.png'} alt="carbon" />
            </VelocityTransitionGroup>
          </div>
          <div style={{ animationDuration: 0.5 + 's', animationDelay: 0.25 + 's'}} className="animated fadeInDown">
            <div style={{padding: '0 20px'}}>
              <CustomSlider min={500} max={5000000} step={1000} defaultValue={this.state.sliderValue} onSliderChange={this.handleSliderChange}/>
            </div>
            <div style={valueWrapper}>
              <div>0.5 kg</div>
              <div style={currentValue}>{inHumanUnits(this.state.sliderValue)}</div>
              <div>5 t</div>
            </div>
          </div>
          <div style={numTreesWrapper} className="animated fadeInDown">
            <p><b>{this.state.numTrees} adult trees</b> to compensate for your carbon footprint</p>
          </div>
          <div style={totalPriceWrapper} className="animated fadeInDown">
            <p style={{ borderTop: "1px solid #979797", borderBottom: "1px solid #979797", padding: "10px 0"}}>
              {inHumanUnits(this.state.sliderValue)} of CO₂/year for ${chargePerTreePerYear * this.state.numTrees}
            </p>
          </div>
          <div style={{ animationDuration: 0.5 + 's', animationDelay: 1.25 + 's'}} className="animated fadeInDown">
            <Button title="Confirm" style={{margin: 'auto'}} onClick={this.handleConfirm}/>
          </div>
        </div>

      </div>
    )
  }
}
