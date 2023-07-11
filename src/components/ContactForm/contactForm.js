import React, { useState } from 'react';
import css from './ContactForm.module.css';

export function ContactForm({ onSubmit }) {
const [name, setName] = useState('');
const [number, setNumber] = useState('');

const handleChangeName = (event) => {
  setName(event.target.value);
};

const handleChangeNumber = (event) => {
  setNumber(event.target.value);
};

const handleSubmit = (event) => {
event.preventDefault();
  onSubmit({ name, number });
  setName('');
  setNumber('');
};

return (
<>
<form onSubmit={handleSubmit} className={css.form}>
<label htmlFor="inputName">Name</label>
<input
       type="text"
       name="name"
       pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я])?[a-zA-Zа-яА-Я]*)*$"
       title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
       required
       id="inputName"
       value={name}
       onChange={handleChangeName}
     />
<label htmlFor="inputNumber">Number</label>
<input
       type="tel"
       name="number"
       pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
       title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
       required
       id="inputNumber"
       value={number}
       onChange={handleChangeNumber}
     />
<button type="submit">Add contact</button>
</form>
</>
);
}