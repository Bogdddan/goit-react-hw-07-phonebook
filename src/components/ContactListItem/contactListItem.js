import React from 'react';

export const ContactListItem = ({ name, number, onDeleteContact, id }) => (
  <li>
    <div>
       {name} : {number}
    </div>
    <button onClick={() => onDeleteContact(id)}>
      x
    </button>
  </li>
);
