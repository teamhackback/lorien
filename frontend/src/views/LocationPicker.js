/* global google */
import React, {Component} from 'react';
import menuTitleStore from '../MenuTitleStore';
import Dimensions from 'react-dimensions'
import { Link } from 'react-router-dom';
import Button from '../components/Button';

import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import SearchBox from "react-google-maps/lib/places/SearchBox";

const INPUT_STYLE = {
  boxSizing: `border-box`,
  MozBoxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `300px`,
  height: `50px`,
  marginTop: `15px`,
  padding: `0 12px`,
  borderRadius: `1px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  fontFamily: 'Montserrat',
  outline: `none`,
  textOverflow: `ellipses`,
};

const Map = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={7}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
    panControl={false}
    defaultOptions={{
      fullScreenControl: false,
      streetViewControl: false,
      zoomControl: false,
      mapTypeControl: false,
      mapTypeId: google.maps.MapTypeId.HYBRID
    }}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_CENTER}
      onPlacesChanged={props.onPlacesChanged}
      inputPlaceholder="Type a name"
      inputStyle={INPUT_STYLE}
    />
    {props.markers.map((marker, index) => (
      <Marker position={marker.position} key={index} />
    ))}
  </GoogleMap>
));

export default Dimensions()(class LocationPicker extends Component {
  state = {
    bounds: null,
    center: {
      lat: 62.120518,
      lng: 25.144944
    },
    markers: [],
  }
  componentWillMount() {
    menuTitleStore.title = "Where should we put it?";
    menuTitleStore.progressSelected = 2;
  }
  handleMapMounted = (map) => {
    this._map = map;
  }

  handleBoundsChanged = () => {
    this.setState({
      bounds: this._map.getBounds(),
      center: this._map.getCenter(),
    });
  }

  handleSearchBoxMounted = (searchBox) => {
    this._searchBox = searchBox;
  }

  handlePlacesChanged = () => {
    const places = this._searchBox.getPlaces();

    // Add a marker for each place returned from search bar
    const markers = places.map(place => ({
      position: place.geometry.location,
    }));

    // Set markers; set map center to first search result
    const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;

    this.setState({
      center: mapCenter,
      markers,
    });
  }
  render() {
    const totalHeight = window.innerHeight - 46;
    return (
      <div>
        <div style={{
          width: this.props.containerWidth,
          height: totalHeight,
        }}>
          <Map
            containerElement={
              <div style={{ height: `100%` }} />
            }
            mapElement={
              <div style={{ height: `100%` }} />
            }
            center={this.state.center}
            onMapMounted={this.handleMapMounted}
            onBoundsChanged={this.handleBoundsChanged}
            onSearchBoxMounted={this.handleSearchBoxMounted}
            bounds={this.state.bounds}
            onPlacesChanged={this.handlePlacesChanged}
            markers={this.state.markers}
          />
        </div>
        <Link to="/order/extraservices">
          <Button
            title="Choose for me"
            style={{
            marginTop: -80,
            position: "fixed",
            zIndex: 10,
            width: 250,
            transform: "translate(-50%, 0%)",
            left: "50%"
          }}>
          </Button>
        </Link>
      </div>
    )
  }
})
