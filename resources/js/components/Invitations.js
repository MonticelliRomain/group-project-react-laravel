import React, { Component } from 'react';
import { ListBox } from 'primereact/listbox';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';

export default class Invitations extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  handleAdd(){
    //Add in the #e-mail_container
    /*
    <span className="p-float-label">
      <InputText id="in" value={this.state.value} onChange={(e) => this.setState({value: e.target.value})} />
      <label htmlFor="in">e-mail address</label>
      <Button label="Add" className="p-button-secondary" onClick={this.handleAdd} />
    </span>
    */
  }

  handleSend(){
    // send a bunch of e-amil address to the back-end
  }

  render(){
    const cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
    ]; //feed though a .map of users, needs pseudo & e-mail address
    return(
      <>
        <div className="mt-5 text-center boxDescriptionSingle shadow">
          <ListBox
            optionLabel="name"
            value={this.state.city}
            options={cities}
            onChange={(e) => this.setState({city: e.value})}
            multiple={true}
          />
        </div>
        <div id="e-mail_container" className="mt-5 text-center boxDescriptionSingle shadow">
          <span className="p-float-label">
            <InputText id="in" value={this.state.value} onChange={(e) => this.setState({value: e.target.value})} />
            <label htmlFor="in">e-mail address</label>
            <Button label="Add" className="p-button-secondary" onClick={this.handleAdd} />
          </span>
          <Button label="Send" onClick={this.handleSend} />
        </div>
      </>
    )
  }
}
