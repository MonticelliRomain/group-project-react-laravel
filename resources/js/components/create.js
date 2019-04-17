import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Calendar } from 'primereact/calendar';
import { RadioButton } from 'primereact/radiobutton';
// import base64 from 'react-native-base64'
import { appAddEvent } from './util/helpers';
import { convertDate } from './util/helpers';


export default class Create extends Component {
  constructor(props) {
    super(props);
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;

    let minDate = new Date();
    minDate.setMonth(prevMonth);
    minDate.setFullYear(prevYear);
    let maxDate = new Date();
    maxDate.setMonth(nextMonth);
    maxDate.setFullYear(nextYear);
    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.handleImgChange = this.handleImgChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dateTemplate = this.dateTemplate.bind(this);
    this.state = {
      name: "",
      description: "",
      image_url: "",
      file:"",
      imagePreviewUrl:"",
      video_url:"",
      media_pick:"image",
      date_event: today,
      reminder: null,
      thisDay: today,
      minDate: minDate,
      maxDate: maxDate,
      invalidDates: [today],
      boxReminder: false
    };
  }//\end constructor

  /* form validation*/
  validateForm() {
    return this.state.name.length > 0 && this.state.description.length > 0;
  }//\end fct validateForm

  /*onchanges*/
  handleImgChange(event){
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    let output = document.getElementById('output');

    reader.onloadend = () => {
      this.setState({
          file: file,
          imagePreviewUrl: reader.result,
      });
      output.src = reader.result
      this.setState({
        image_url : reader.result.substr(reader.result.indexOf(',')+1)
      });
    }
    reader.readAsDataURL(file);
  }//\end fct handleImgChange

  handleChange(event) {
    //this.setState({ [event.target.name]: event.target.value });
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
    if (target.checked === true) {
      document.getElementsByName("calendarDisplay")[0].style.display = "block";
    } else {
      document.getElementsByName("calendarDisplay")[0].style.display = "none";
    }
  }//\end fct handleChange

  /* date conversion + submit*/
  handleSubmit() {
    let image_url = "";
    if(this.state.media_pick === "image"){
      if (this.state.image_url === "") {
        image_url = "https://zupimages.net/up/19/15/xpo1.png";
      } else {
        image_url = "data:image/jpeg;base64,"+this.state.image_url
      }
    } else {
      image_url = "https://www.youtube.com/embed/"+this.state.video_url.substr(this.state.video_url.indexOf('=')+1)
    }

    let convertedDate = convertDate(this.state.date_event);
    let convertedReminder = "";
    let datetest = new Date();
    //check if box reminder is checked and not empty
    if (this.state.boxReminder && this.state.reminder !== null) {
      convertedReminder = convertDate(this.state.reminder);
    }
    else {
      convertedReminder = "";
    }
    let myJSON = {
      "name": this.state.name,
      "date_event": convertedDate,
      "description": this.state.description,
      "reminder": convertedReminder,
      "image_url": image_url,
      "media_type": this.state.media_pick
    }
    event.preventDefault()
    // console.log(myJSON);
    appAddEvent(myJSON);
  }//\end fct handleSubmit

  /*used by component calendar*/
  dateTemplate(date) {
    if (date.day > 10 && date.day < 15) {
      return (
        <div style={{ backgroundColor: '#1dcbb3', color: '#ffffff', fontWeight: 'bold', borderRadius: '50%', width: '2em', height: '2em', lineHeight: '2em', padding: 0 }}>{date.day}</div>
      );
    }
    else {
      return date.day;
    }
  }

  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit} className="m-5">
          <h1>Create new Event</h1>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="your event title"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              placeholder="your event description"
              as="textarea" rows="10"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Container>
            <h5>Upload an image</h5>
            <RadioButton
              value="image"
              name="image"
              onChange={(e) => this.setState({media_pick: e.value, video_url: ""})}
              checked={this.state.media_pick === 'image'}
            />
              <h5>Upload a video</h5>
            <RadioButton
              value="video"
              name="video"
              onChange={(e) => this.setState({media_pick: e.value, image_url: "", file:"", imagePreviewUrl:""})}
              checked={this.state.media_pick === 'video'}
            />
          </Container>
          {this.state.media_pick === "image" ?
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Add an image</Form.Label>
            <Form.Control
              name="image_url"
              type="file"
              onChange={(e)=>this.handleImgChange(e)}
            />
            <div id="preview"><img id="output" alt=""/></div>
          </Form.Group>
          :
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Add a video</Form.Label>
            <Form.Control
              name="video_url"
              type="text"
              placeholder="paste an url"
              onChange={this.handleChange}
            />
          </Form.Group>
          }
          <div className="p-col-12 mt-3">
            <p>Date of event:</p>
            <Calendar
              dateFormat="yy/mm/dd"
              value={this.state.date_event}
              onChange={(e) => this.setState({ date_event: e.value })}
              readOnlyInput={true} minDate={new Date()} showTime={true}
              timeOnly={false}
              hourFormat="24"
              showIcon={true}
              showSeconds={true}
            />
          </div>
          <div className="p-col-12 mt-3">
            <div className="form-check">
              <input className="form-check-input"
                type="checkbox"
                name="boxReminder"
                checked={this.state.boxReminder}
                onChange={this.handleChange} />
              <label className="form-check-label">
                Send a reminder to users who suscribed
              </label>
            </div>
            <div style={{ display: 'none' }} name="calendarDisplay">
              <Calendar
                dateFormat="yy/mm/dd"
                value={this.state.reminder}
                onChange={(e) => this.setState({ reminder: e.value })}
                readOnlyInput={true}
                showTime={true}
                timeOnly={false}
                minDate={this.state.thisDay}
                maxDate={this.state.date_event}
                hourFormat="24"
                showIcon={true}
                showSeconds={true}
              />
            </div>
          </div>
          <Button disabled={!this.validateForm()} className="my-3" type="submit">Submit</Button>
        </Form>
      </>
    )
  }
}
