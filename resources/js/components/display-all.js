import React, { Component } from 'react';
import { appGetFutureEvent } from './util/helpers';
import posed from 'react-pose';
import { Link } from 'react-router-dom';
import { rgba } from 'style-value-types';
// import base64 from 'react-native-base64';

//import Components
import MediaPlayer from './util/MediaPlayer';

const Box = posed.div({
  hoverable: true,
  pressable: true,
  init: {
    scale: 1,
    boxShadow: '0px 0px 0px rgba(0,0,0,0)',

  },
  hover: {
    scale: 1,
    boxShadow: '10px 10px 10px rgba(0,100,0,0.2)',

  },
  press: {
    boxShadow: '0px 0px 10px rgba(0,0,0,0.5)'
  }
});

const Img = posed.div({
  hoverable: true,
  pressable: true,
  init: {
    scale: 1,
    opacity: 1,

  },
  hover: {
    scale: 1,
    opacity: 0.5,
  },
  press: {
    boxShadow: '0px 0px 10px rgba(0,0,0,0.5)'
  }
});

export default class DisplayAll extends Component {

  constructor(props) {
    super(props);
    this.state = {
      eventList: [],
    };//\state
  }//\constructor

  componentDidMount() {
    appGetFutureEvent(this);
  }

  /*rendering content*/
  render() {
    const { eventList } = this.state;
    return (
      <div>
        <h1 className="mt-5 mb-3 text-center">Future Events</h1>
        <div className="d-flex flex-wrap futureEventsList">
          {this.state.eventList.map(item =>
            <div key={item.id} className="color3 col-xs-12 col-md-6 col-xl-4 text-center d-flex flex-column">
              <Box className="border eventBox w-100 bg-secondary text-light my-3 p-3 eventBox flex-grow-1">
              <p className="border boxDate shadow">{item.date_event}</p>
                <h1 className="eventTitle ">{item.name}</h1>
                <Img className="imgDiv border">
                    <MediaPlayer package={item} className="imgDisplay"/>
                </Img>
                <div className="border boxDescription">
                  {item.description}
                </div>
                <p>
                  <Link variant="light" className="btn btn-light my-2 shadow" to={"/display-event-" + item.id} >More informations</Link>
                </p>
              </Box>
            </div>
          )}
        </div>
      </div>

    )
  }
}
