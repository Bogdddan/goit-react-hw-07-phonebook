import React from 'react';

import { ContactListItem } from '../ContactListItem/contactListItem';

export const ContactList = ({ filtredContacts, onDeleteContact }) => (
  <ul>
    {filtredContacts.map(contact => (
      <ContactListItem
        key={contact.id}
        id={contact.id}
        name={contact.name}
        number={contact.number}
        onDeleteContact={onDeleteContact}
      />
    ))}
  </ul>
);