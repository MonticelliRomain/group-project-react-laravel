import React, { Component } from 'react';

export default class MediaPlayer extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
    return(
      <img className="imgDisplay" src={this.props.package} alt="image event"/>
    );
  }
}
