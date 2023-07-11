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

 