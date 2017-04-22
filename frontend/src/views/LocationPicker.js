import React, {Component} from 'react';
import menuTitleStore from '../MenuTitleStore';

export default class LocationPicker extends Component {
  componentWillMount() {
    menuTitleStore.title = "Where should we put it?";
    menuTitleStore.progressSelected = 2;
  }
  render() {
    return (
      <div>
        MAP
      </div>
    )
  }
}
