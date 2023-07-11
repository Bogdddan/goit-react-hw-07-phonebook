import { combineReducers, configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice'; // Зміна імпорту
import { CONTACTS } from './constants';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [CONTACTS],
};

const rootReducer = combineReducers({
  contacts: contactsReducer, // Заміна редуктора
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
