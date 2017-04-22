import React, {Component} from 'react';
import Slider from 'material-ui/Slider';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const sliderColor = "#ebebeb"

const sliderTheme = getMuiTheme({
  slider: {
    trackColor: sliderColor,
    trackSize: 6,
    trackColorSelected: sliderColor,
    handleSize: 23,
    handleSizeDisabled: 8,
    handleSizeActive: 23,
    handleColorZero: sliderColor,
    handleFillColor: sliderColor,
    selectionColor: sliderColor,
    rippleColor: sliderColor
  }
})

export default class CustomSlider extends Component {
  render() {
    return (
        <MuiThemeProvider muiTheme={sliderTheme}>
          <Slider sliderStyle={{margin: 0}} min={this.props.min} max={this.props.max} step={this.props.step} defaultValue={this.props.defaultValue} onChange={this.props.onSliderChange} />
        </MuiThemeProvider>
    )
  }
}
