import React, { useEffect } from 'react';

import { ContactForm } from './ContactForm/contactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filterSlice';
import {
  selectСontacts,
  selectFilter,
  selectError,
  selectIsLoading,
} from 'redux/selectors';
import { addContact, deleteContact, fetchContacts } from 'redux/operations';

export function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectСontacts);
  const filter = useSelector(selectFilter);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const onDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const onAddContact = newcontact => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === newcontact.name.toLowerCase()
      )
    ) {
      alert(`${newcontact.name} is already in contacts!`);
      return;
    }

    dispatch(addContact(newcontact));
  };

  const changeFilter = event => dispatch(setFilter(event.currentTarget.value));

  const getFiltredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  const filtredContacts = getFiltredContacts();

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onAddContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      {isLoading && !error && <b>Request in progress...</b>}
      <ContactList
        filtredContacts={filtredContacts}
        onDeleteContact={onDeleteContact}
      />
    </>
  );
}


// work code

//   import { useState , useEffect } from "react";
// import css from "../ContactInput.module.css";
// import { Filter } from "./Filter/Filter";
// import { ContactList } from "./ContactList/ContactList";
// import { Form } from "./Form/Form";

// export const App = () => {
//   const [contacts, setContacts] = useState([]);
//   const [filter, setFilter] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const contact = localStorage.getItem("contact");
//     if(!contact){
//       return 
//     }
//     const parsedContacts = JSON.parse(contact);

//     setContacts(parsedContacts);
//     setLoading(false);
//   }, []);

//   useEffect(() => {
//     if (!loading) {
//       localStorage.setItem("contact", JSON.stringify(contacts));
//     }
//   }, [contacts, loading]);
  
//   //функції 
//   const handleSubmitForm = (name, number) => {
//     const isDuplicateName = contacts.some(
//       (contact) => contact.name.toLowerCase() === name.toLowerCase()
//     );
  
//     if (isDuplicateName) {
//       alert("Контакт з таким ім'ям вже існує!");
//       return;
//     }
  
//     const newContact = { id: Date.now(), name, number };
  
//     setContacts(prevState => [...prevState, newContact]);
//   };
  
//     const handleDelete = (id) => {
//       setContacts((prevState) => prevState.filter((contact) => contact.id !== id));
//     };
    
//     const changeFilter = (e) => {
//       setFilter( e.currentTarget.value )
//     };

//   const filterContacts = () => {
//     return contacts.filter(contact =>
//     contact.name.toLowerCase().includes(filter.toLowerCase()));
//   }

//   if(loading){
//     return <div>Loading...</div>
//   }
  
//   return (
//     <div className={css.container}>
//           <Form 
//             handleSubmitForm={handleSubmitForm} 
//           />
//           <Filter 
//             value={filter} 
//             onChange={changeFilter} 
//           />
//           <ContactList
//             filterContacts={filterContacts()}
//             handleDelete={handleDelete}
//           />
//     </div>
//   );
//   }; 




  // const filterContacts = contacts.filter(contact =>
  //   contact.name.toLowerCase().includes(filter.toLowerCase()));
  // export class App extends Component {
  // state = {
  //   contacts: [],
  //   filter: "",
  // };

  // handleSubmitForm = (name, number) => {
  //   const isDuplicateName = this.state.contacts.some(
  //     (contact) => contact.name.toLowerCase() === name.toLowerCase()
  //   );

  //   if (isDuplicateName) {
  //     alert("Контакт з таким ім'ям вже існує!");
  //     return;
  //   }

  //   const newContact = { id: Date.now(), name, number };

  //   this.setState((prevState) => ({
  //     contacts: [...prevState.contacts, newContact],
  //   }));
  // };

  // handleDelete = (id) => {
  //   this.setState((prevState) => ({
  //     contacts: prevState.contacts.filter((contact) => contact.id !== id),
  //   }));
  // };

  // changeFilter = (e) => {
  //   this.setState({ filter: e.currentTarget.value })
  // };

  // componentDidUpdate(prevProps , prevState){
  //   if(this.state.contacts !== prevState.contacts){
  //     localStorage.setItem('contact' , JSON.stringify(this.state.contacts))
  //   }
  // }

  // componentDidMount(){
  //   const contact = localStorage.getItem('contact')
  //   const parsedContacts = JSON.parse(contact)

  //   this.setState({contacts: parsedContacts});
  // }

  // render() {
  //   const { filter, contacts } = this.state;
  //   const filterContacts = contacts.filter((contact) =>
  //     contact.name.toLowerCase().includes(filter.toLowerCase())
  //   );

  //   return (
  //     <div className={css.container}>
  //       <Form handleSubmitForm={this.handleSubmitForm} />

  //       <Filter value={filter} onChange={this.changeFilter} />

  //       <ContactList
  //         filterContacts={filterContacts}
  //         handleDelete={this.handleDelete}
  //       />
  //     </div>
  //   );
//   }
// }
