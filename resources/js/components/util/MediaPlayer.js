import React, { Component } from 'react';

export default class MediaPlayer extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
    console.log(this.props.package);
    return(
      <img className={this.props.className} src={this.props.package.image_url} alt="image event"/>
    );
  }
}
