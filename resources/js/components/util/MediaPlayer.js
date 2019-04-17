import React, { Component } from 'react';

export default class MediaPlayer extends Component {

  render(){
    return(
      <>
      {this.props.package.media_type === 'image' ?
        <img
          className={this.props.className}
          src={this.props.package.image_url}
          alt="image event"
        />
        :
        <iframe
          height="100%"
          // width="100%"
          src={this.props.package.image_url}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen>
        </iframe>
        }
      </>
    );
  }
}
