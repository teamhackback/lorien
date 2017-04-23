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

function getDistanceFromLatLonInKm(p1, p2) {
	const lat1 = p1.lat;
	const lon1 = p1.lon || p1.lng;
	const lat2 = p2.lat;
	const lon2 = p2.lon || p2.lng;
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

const Map = withGoogleMap(props => {
	return (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={5}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
    panControl={false}
		onClick={props.closeAllLabels}
    defaultOptions={{
      fullscreenControl: false,
      streetViewControl: false,
      zoomControl: false,
      mapTypeControl: false,
      mapTypeId: google.maps.MapTypeId.HYBRID,
      gestureHandling: "greedy"
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
      <Marker position={marker.position} key={index} title={marker.title} onClick={() => props.onMarkerClicked(marker, index)} icon={marker.isSearchResult ? undefined : getCircle(marker)}>
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
      lat: 64.818541,
      lng: 26.715859
    },
    markers: locations,
		hasSelectedMarker: locations.filter(e => e.selected).length > 0,
    totalHeight: window.innerHeight
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
		const markers = this.state.markers;
		let nrMarkers = markers.length;
		if (places.length === 0) {
			return;
		}

		if (markers[nrMarkers - 1].isSearchResult === undefined ) {
    	// Add a marker for each place returned from search bar
    	markers.push(places.map(place => ({
				id: nrMarkers,
				isSearchResult: true
    	}))[0]);
			nrMarkers++;
		}

		console.log(places);
		markers[nrMarkers -1].position = {
			lat: places[0].geometry.location.lat(),
			lng: places[0].geometry.location.lng()
		};
		markers[nrMarkers -1].title = places[0].formatted_address;
		markers[nrMarkers -1].showInfo = true;

    // Set markers; set map center to first search result
		const mapCenter = markers[nrMarkers - 1].position;

		// select nearest forest
		const markersSorted = markers.slice().sort((a, b) => {
			return getDistanceFromLatLonInKm(mapCenter, b.position)
					< getDistanceFromLatLonInKm(mapCenter, a.position);
		});
    this.setState({
      center: mapCenter,
      markers,
    }, () => {
			this.selectMarker(markersSorted[1].index, false);
		});
  };

	onMarkerClicked = (marker, i) => {
		const markers = this.state.markers.map(marker => {
			marker.showInfo = false;
			return marker;
		});

		markers[i].showInfo = !markers[i].showInfo;
		this.setState({
			markers
		}, () => {
		  this.selectMarker(i);
		});
	};

	onMarkerClosed = (marker, i) => {
		const markers = this.state.markers;
		markers[i].showInfo = false;
		this.setState({
			markers
		});
	};

	closeAllLabels = (marker, i) => {
		const markers = this.state.markers.map(marker => {
			marker.showInfo = false;
			return marker;
		});
		this.setState({
			markers
		});
	};

	selectMarker = (i, showInfo = true) => {
		if( this.state.markers[i].isSearchResult ) {
			return;
		}
		const markers = this.state.markers.map(marker => {
			marker.selected = false;
			return marker;
		});
		markers[i].selected = true;
		if (showInfo) {
			markers[i].showInfo = true;
		}
		this.setState({
			markers,
			hasSelectedMarker: true
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

	componentWillUnmount() {
		const markers = this.state.markers.filter(marker => {
			return marker.isSearchResult === undefined;
		});
		locations.length = 0;
		locations.push.apply(locations, markers);
	}

  render() {
    return (
      <div>
        <div style={{
          width: this.props.containerWidth,
          height: this.state.totalHeight,
          position: "absolute",
          top: 46,
        }}>
          <Map
            containerElement={
              <div style={{ height: this.state.totalHeight }} />
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
						closeAllLabels={this.closeAllLabels}
            markers={locations}
						locations={[]}
          />
        </div>
        <div style={{
          position: "absolute",
          margin: "0 auto",
          marginTop: this.state.totalHeight - 105,
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
