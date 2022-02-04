import React from "react";
import Form from "./form/form";
import Filter from "./Filter";

import { nanoid } from "nanoid";
import RenderContacts from "./RenderContact";

class Phonebook extends React.Component {
  state = {
    contacts: [],
    fileter: "",
  };

  submitData = (data) => {
    const contact = {
      id: nanoid(5),
      name: data.name,
      number: data.number,
    };
    const findedContact = this.state.contacts.find(
      (contact) => contact.name.toLocaleLowerCase() === data.name.toLowerCase()
    );
    if (findedContact) {
      alert(`${data.name} is already in contacts.`);
    } else
      this.setState((prevState) => ({
        contacts: [contact, ...prevState.contacts],
      }));
  };

  changFilter = (event) => {
    this.setState({ fileter: event.currentTarget.value });
  };

  visibleRender = () => {
    const normalizedFilter = this.state.fileter.toLocaleLowerCase();
    return this.state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deletContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  componentDidMount(){
    const phonebooke = localStorage.getItem('Phonebooke')
    const parsPhonebooke = JSON.parse(phonebooke)
    if (parsPhonebooke) {    
      this.setState({contacts: parsPhonebooke} )
  }
  }

  componentDidUpdate(prevProps, prevState){
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('Phonebooke', JSON.stringify(this.state.contacts))
    }
  }


  render() {
    return (
      <div>
        <h1> Phonebook </h1>
        <Form onSubmit={this.submitData} />
        <h2>Contacts</h2>
        <Filter value={this.state.fileter} onChange={this.changFilter} />
        <RenderContacts
          value={this.visibleRender()}
          onDelete={this.deletContact}
        />
      </div>
    );
  }
}

export default Phonebook;
