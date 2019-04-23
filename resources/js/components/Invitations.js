import React, { Component } from 'react';
import { ListBox } from 'primereact/listbox';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import { appGetUsersList } from './util/helpers';

// import components
import InvitationForm from './InvitationForm';

export default class Invitations extends Component {

  constructor(props) {
    super(props);


    this.state = {
      usersList:[],
      formRows: 1,
    };
  };


  handleSend(){
    // send a bunch of e-amil address to the back-end
  }

  componentDidMount(){
    appGetUsersList(this)
  }

  render(){

    // console.log(this.state);
    return(
      <>
        <div className="mt-5 text-center boxDescriptionSingle shadow">
          <ListBox
            optionLabel="name"
            value={this.state.city}
            options={this.state.usersList}
            onChange={(e) => this.setState({city: e.value})}
            multiple={true}
          />
        </div>
        <div id="e-mail_container" className="mt-5 text-center boxDescriptionSingle shadow">
          <InvitationForm />
          <Button label="Send" onClick={this.handleSend} />
        </div>
      </>
    )
  }
}
