import React, { Component } from 'react';

export default class OpenStreetMap extends Component {
  componentDidMount(){
    const mapDiv = document.getElementById(`${this.props.mapId}`);
    this.resize(mapDiv);
    window.addEventListener('resize', () => this.resize(mapDiv));
  }

  async componentDidUpdate(prevProps){
    if(this.props.address.match(/undefined/))
      return;
    document.getElementById(`${this.props.mapId}`).innerHTML = '';
    const map = new OpenLayers.Map(this.props.mapId);
    map.addLayer(new OpenLayers.Layer.OSM('osmLayer', [
      'https://a.tile.openstreetmap.org/${z}/${x}/${y}.png',
      'https://b.tile.openstreetmap.org/${z}/${x}/${y}.png',
      'https://c.tile.openstreetmap.org/${z}/${x}/${y}.png',
    ]));

    const response = await fetch('https://nominatim.openstreetmap.org/search?format=json&q='+encodeURIComponent(this.props.address));


    const json = await response.json();
    const lonLat = new OpenLayers.LonLat(json[0].lon, json[0].lat)
      .transform(
        new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
        map.getProjectionObject() // to Spherical Mercator Projection
      );
    const zoom=16;
    const markers = new OpenLayers.Layer.Markers("Markers");
    map.addLayer(markers);
    markers.addMarker(new OpenLayers.Marker(lonLat));
    map.setCenter(lonLat, zoom);
  }

  resize(map){
    if(map)
    map.style.height = map.clientWidth*0.71 + 'px';
  }

  render() {
      return (
        <div className={`col-6 ${this.props.className}`} id={this.props.mapId}></div>
      )
    }
}
