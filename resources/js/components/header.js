import React, { Component } from 'react';
import logo from './assets/eventdablogo.png';

export default class Header extends Component {



  render() {
    return (
        <img src={logo}
          width="50" height="50" />
    )
  }
}
