import React from 'react';

import { ContactListItem } from '../ContactListItem/contactListItem';

export const ContactList = ({ filteredContacts, onDeleteContact, isLoading }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!filteredContacts) {
    return null;
  }

  return (
    <ul>
      {filteredContacts.map((contact) => (
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
};
