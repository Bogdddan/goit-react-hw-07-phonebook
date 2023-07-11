// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const fetchContacts = createAsyncThunk(
//   'contacts/fetchAll',
//   async () => {
//     const response = await axios.get('https://64a946478b9afaf4844a7c4c.mockapi.io/:contacts');
//     return response.data;
//   }
// );

// export const addContact = createAsyncThunk(
//   'contacts/addContact',
//   async (contactData) => {
//     const response = await axios.post('https://64a946478b9afaf4844a7c4c.mockapi.io/:contacts', contactData);
//     return response.data;
//   }
// );

// export const deleteContact = createAsyncThunk(
//   'contacts/deleteContact',
//   async (contactId) => {
//     await axios.delete(`https://64a946478b9afaf4844a7c4c.mockapi.io/:contacts/${contactId}`);
//     return contactId;
//   }
// );

// const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState: {
//     items: [],
//     isLoading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchContacts.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchContacts.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchContacts.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message;
//       })
//       .addCase(addContact.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(addContact.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.items.push(action.payload);
//       })
//       .addCase(addContact.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message;
//       })
//       .addCase(deleteContact.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(deleteContact.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.items = state.items.filter(
//           (contact) => contact.id !== action.payload
//         );
//       })
//       .addCase(deleteContact.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export default contactsSlice.reducer;

import { createSlice, isAllOf } from '@reduxjs/toolkit';
import { CONTACTS } from 'redux/constants';
import { addContact, deleteContact, fetchContacts } from './operations';
import {
  STATUS,
  createThunksType,
  handleFulfilled,
  handleFulfilledDelete,
  handleFulfilledGet,
  handleFulfilledPost,
  handlePending,
  handleRejected,
} from './sliceFunction';

const contactsSlice = createSlice({
  name: CONTACTS,
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    const { PENDING, FULFILLED, REJECTED } = STATUS;
    builder
      .addCase(fetchContacts.fulfilled, handleFulfilledGet)
      .addCase(addContact.fulfilled, handleFulfilledPost)
      .addCase(deleteContact.fulfilled, handleFulfilledDelete)
      .addMatcher(isAllOf(...createThunksType(PENDING)), handlePending)
      .addMatcher(isAllOf(...createThunksType(FULFILLED)), handleFulfilled)
      .addMatcher(isAllOf(...createThunksType(REJECTED)), handleRejected);
  },
  // {
  //   [fetchContacts.pending](state) {
  //     state.isLoading = true;
  //   },
  //   [fetchContacts.fulfilled](state, action) {
  //     state.isLoading = false;
  //     state.error = null;
  //     state.items = action.payload;
  //   },
  //   [fetchContacts.rejected](state, action) {
  //     state.isLoading = false;
  //     state.error = action.payload;
  //   },
  //   [addContact.pending](state) {
  //     state.isLoading = true;
  //   },
  //   [addContact.fulfilled](state, action) {
  //     state.isLoading = false;
  //     state.error = null;
  //     state.items.push(action.payload);
  //   },
  //   [addContact.rejected](state, action) {
  //     state.isLoading = false;
  //     state.error = action.payload;
  //   },
  //   [deleteContact.pending](state) {
  //     state.isLoading = true;
  //   },
  //   [deleteContact.fulfilled](state, action) {
  //     state.isLoading = false;
  //     state.error = null;
  //     const index = state.items.findIndex(
  //       task => task.id === action.payload.id
  //     );
  //     state.items.splice(index, 1);
  //   },
  //   [deleteContact.rejected](state, action) {
  //     state.isLoading = false;
  //     state.error = action.payload;
  //   },
  // },
});

export const contactsReducer = contactsSlice.reducer;