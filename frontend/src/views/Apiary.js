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
  width: 100 + '%'
}

const valueWrapper = {
  color: "#ebebeb",
  fontSize: 14 + 'px',
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 20 + 'px',
  marginBottom: 40 + 'px'
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

const beehiveChargesPerSize = [
  {
    'quantity': 1,
    'amount': 10
  }, 
  {
    'quantity': 2,
    'amount': 20
  },
  {
    'quantity': 4,
    'amount': 30
  },
];

export default class Apiary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderValue: 2
    }
  }

  componentWillMount() {
    menuTitleStore.title = "Establish a beehive";
    menuTitleStore.progressSelected = 3;
  }

  handleSliderChange = (e, v) => {
    this.setState({
      sliderValue: v
    });
  }

  render() {
    return (
      <div style={viewWrapper}>
        <div style={{width: 75 + '%', margin: '0 auto'}}>
          <div style={{width: 100 + '%', textAlign: 'center'}}>
            <img style={{margin: "auto", padding: "40px 0", width: "65%"}} src={'/img/beehive.svg'} />
          </div>
          <div style={{padding: "0 20px"}}>
            <CustomSlider min={1} max={3} step={1} defaultValue={this.state.sliderValue} onSliderChange={this.handleSliderChange}/>
          </div>
          <div style={valueWrapper}>
            <div className={this.state.sliderValue == 1 ? 'current' : ''}>Small</div>
            <div className={this.state.sliderValue == 2 ? 'current' : ''}>Medium</div>
            <div className={this.state.sliderValue == 3 ? 'current' : ''}>Large</div>
          </div>
          <div style={totalPriceWrapper}>
            <p style={{ borderTop: "1px solid #979797", borderBottom: "1px solid #979797", padding: "10px 0"}}>
              {beehiveChargesPerSize[this.state.sliderValue - 1]['quantity'] + "L of honey for $" + beehiveChargesPerSize[this.state.sliderValue - 1]['amount'] + "/month"}
            </p>
          </div>
          <Button title="Confirm" style={{margin: 'auto'}}/>
        </div>

      </div>
    )
  }
}
