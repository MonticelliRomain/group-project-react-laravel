import React, { Component } from 'react';

import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

const provider = new OpenStreetMapProvider();

const searchControl = new GeoSearchControl({
  provider: provider,
});

export default class OpenStreetMap extends Component {
  constructor(props){
    super(props);
  }

  createLeafletElement() {
    return GeoSearchControl({
        provider: new OpenStreetMapProvider(),
        style:'bar',
        autoComplete: true,
        autoClose:true,
      });
    }

  render(){
    const position = [51.505, -0.09]
    return(
      <Map center={position} zoom={13} id="mapid" ref="map"> 
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <Marker position={position}>
          <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
        </Marker>
      </Map>
    )
  }
}
