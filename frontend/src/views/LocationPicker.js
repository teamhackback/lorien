/* global google */
import React, {Component} from 'react';
import menuTitleStore from '../MenuTitleStore';
import Dimensions from 'react-dimensions'
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import locations from '../Locations';

import {
  withGoogleMap,
  GoogleMap,
  Marker,
	Polygon,
	InfoWindow,
} from "react-google-maps";
import SearchBox from "react-google-maps/lib/places/SearchBox";

function getCircle(marker) {
	 const magnitude = 15;
   return {
     path: google.maps.SymbolPath.CIRCLE,
     fillColor: marker.selected ? 'red' : 'orange',
     fillOpacity: .2,
     scale: magnitude,
     strokeColor: 'white',
     strokeWeight: .5
   };
}

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
	animationDuration: '700ms',
};

const Map = withGoogleMap(props => {
	return (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={5}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
    panControl={false}
    defaultOptions={{
      fullscreenControl: false,
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
      inputClassName="animated slideInDown searchBox"
    />
    {props.markers.map((marker, index) =>
      <Marker position={marker.position} key={index} title={marker.title} onClick={() => props.onMarkerClicked(marker, index)} icon={getCircle(marker)}>
				{ marker.showInfo  && (
          <InfoWindow onCloseClick={() => props.onMarkerClosed(marker, index)}>
            <div>{marker.title}</div>
          </InfoWindow>
				)}
			</Marker>
			)}

    {props.locations.map((location, index) => (
      <Polygon path={location.path} key={index} />
		))}
  </GoogleMap>
)});

export default Dimensions()(class LocationPicker extends Component {

  static contextTypes = { router: React.PropTypes.object }
  state = {
    bounds: null,
    center: {
      lat: 65.318541,
      lng: 26.715859
    },
    markers: locations,
		hasSelectedMarker: false
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
    //const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;
		const mapCenter = this.state.center;

    this.setState({
      center: mapCenter,
      markers,
    });
  };

	onMarkerClicked = (marker, i) => {
		console.log(marker);
		const markers = this.state.markers.map(marker => {
			marker.showInfo = false;
			return marker;
		});

		markers[i].showInfo = !markers[i].showInfo;
		this.selectMarker(i);
		this.setState({
			markers
		});
	};

	onMarkerClosed = (marker, i) => {
		const markers = this.state.markers;
		markers[i].showInfo = false;
		this.setState({
			markers
		});
	};

	selectMarker = (i) => {
		const markers = this.state.markers.map(marker => {
			marker.selected = false;
			return marker;
		});
		markers[i].selected = true;
		markers[i].showInfo = true;
		this.setState({
			markers
		});
	}

	onButtonClicked = () => {
		if (this.state.hasSelectedMarker) {
      this.context.router.history.push("/order/extraservices");
			return;
		} else {
			this.selectMarker(Math.floor(Math.random() * 5));
			this.setState({
				hasSelectedMarker: true
			});
		}
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
						onMarkerClicked={this.onMarkerClicked}
						onMarkerClosed={this.onMarkerClosed}
            markers={locations}
						locations={[]}
          />
        </div>
        <div style={{
          position: "fixed",
          margin: "0 auto",
          marginTop: -80,
          zIndex: 10,
          width: window.innerWidth,
        }}>
            <Button
							onClick={this.onButtonClicked}
							title={this.state.hasSelectedMarker ? "Continue" : "Choose for me"}
              className="animated slideInUp"
              style={{
								animationDuration: '700ms',
								animationDelay: "300ms",
              	width: 250,
              	margin: "0 auto"
            }}>
            </Button>
        </div>
      </div>
    )
  }
})
