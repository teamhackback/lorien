import React, {Component} from 'react';
import Slider from 'material-ui/Slider';
import menuTitleStore from '../MenuTitleStore';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Button from '../components/Button';
import CustomSlider from '../components/Slider';

const viewWrapper = {
  height: 100 + "vh",
  backgroundImage: "url(\"/img/details_bg.jpg\")",
  backgroundSize: "cover",
  backgroundPosition: "0 -57px",
  width: 100 + '%'
}

const valueWrapper = {
  color: "#ebebeb",
  fontSize: 14 + 'px',
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 20 + 'px'
}

const textWrapper = {
  color: "#ebebeb",
  fontSize: 18 + 'px',
}

const numTreesWrapper = {
  margin: "40px 0",
  color: "#ebebeb",
  fontSize: 18 + 'px',
}

const totalPriceWrapper = {
  textAlign: 'center',
  color: "#ebebeb",
  fontSize: 14 + 'px',
  marginBottom: 40 + 'px'
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

  render() {
    return (
      <div style={viewWrapper}>
        <div style={{width: 75 + '%', margin: '0 auto'}}>
          <div style={{width: 100 + '%', textAlign: 'center'}}>
            <img style={{margin: "auto", padding: "40px 0"}} src={'/img/carbon.png'} />
          </div>
          <div>
            <CustomSlider min={500} max={5000000} step={1000} defaultValue={this.state.sliderValue} onSliderChange={this.handleSliderChange}/>
          </div>
          <div style={valueWrapper}>
            <div>0.5 kg</div>
            <div style={currentValue}>{inHumanUnits(this.state.sliderValue)}</div>
            <div>5 t</div>
          </div>
          <div style={numTreesWrapper}>
            <p><b>{this.state.numTrees} adult trees</b> to compensate for your carbon footprint</p>
          </div>
          <div style={totalPriceWrapper}>
            <p style={{ borderTop: "1px solid #979797", borderBottom: "1px solid #979797", padding: "10px 0"}}>
              {inHumanUnits(this.state.sliderValue)} of CO₂/year for ${chargePerTreePerYear * this.state.numTrees}
            </p>
          </div>
          <Button title="Confirm" style={{width: 90 + '%', margin: 'auto'}}/>
        </div>

      </div>
    )
  }
}
