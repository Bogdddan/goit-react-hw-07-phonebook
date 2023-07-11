import React from 'react';

export const ContactListItem = ({ name, number, onDeleteContact, id }) => (
  <li>
    {name} : {number}
    <button onClick={() => onDeleteContact(id)}>Delete</button>
  </li>
);