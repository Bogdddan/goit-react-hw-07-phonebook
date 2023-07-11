import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchContacts,
  addContact,
  deleteContact,
} from '../redux/contactsSlice'; // Зміна імпорту
import { ContactForm } from './ContactForm/contactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

import css from './App.module.css';

export function App() {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.contacts.filter); // Заміна селектора

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  const handleAddContact = (name, number) => {
    if (
      contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase())
    ) {
      alert(`${name} is already in contacts`);
      return;
    }

    dispatch(addContact({ name, number }));
  };

  const handleChangeFilter = (event) => {
    // Обробка фільтрації
  };

  const getFilteredContacts = () => {
    // Логіка фільтрації
  };
  const filteredContacts = getFilteredContacts();

  return (
    <div className={css.container}>
      <h1 className={css.name}>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />

      <h2 className={css.secondName}>Contacts</h2>
      <Filter value={filter} onChange={handleChangeFilter} />
      <ContactList
        filteredContacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
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
