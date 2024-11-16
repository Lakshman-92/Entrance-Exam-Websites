// src/features/questionSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questions: [], // Initialize with an empty array
};

const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    // Action to add a new question
    addQuestion: (state, action) => {
      state.questions.push(action.payload);
    },
    // Action to remove a question by index
    removeQuestion: (state, action) => {
      state.questions.splice(action.payload, 1); // Removes the question at the given index
    },
  },
});

export const { addQuestion, removeQuestion } = questionSlice.actions;

export default questionSlice.reducer;
