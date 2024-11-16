// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import questionReducer from "../features/questionSlice"// Ensure the path is correct

const store = configureStore({
  reducer: {
    questions: questionReducer, // This is where the questions slice will be managed
  },
});

export default store;

