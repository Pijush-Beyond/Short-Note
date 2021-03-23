import { configureStore } from '@reduxjs/toolkit';
import notereducer from './NoteReducer';
import nameReducer from './NameReducer';
import KeyWordReducer from './KeyWordReducer';

export default configureStore({
  reducer: {
    notes: notereducer,
    name: nameReducer,
    keyWords: KeyWordReducer,
  },
})