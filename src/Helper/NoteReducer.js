import { createSlice } from "@reduxjs/toolkit";

const reducer = createSlice({
  name: 'notes',
  initialState: JSON.parse(localStorage.getItem(`${localStorage.getItem('name')}-notes`)) || [],
  reducers: {
    newNote: (state, action) => {
      state.unshift(action.payload.note);
      if (action.payload.name !== 'Guest')
        localStorage.setItem(`${action.payload.name}-notes`, JSON.stringify(state));
    },
    deleteNote: (state, action) => {
      for (let i = 0; i < state.length;i++)
        if (state[i].createDate === action.payload.createDate) {
          state.splice(i, 1);
          break;
        }
      if (action.payload.name !== 'Guest')
        localStorage.setItem(`${action.payload.name}-notes`, JSON.stringify(state));
    },
    editNote: (state, action) => {
      state.forEach(n => {
        if (n.createDate === action.payload.note.createDate) {
          n.title = action.payload.note.title;
          n.description = action.payload.note.description;
        }
      });
      if (action.payload.name !== 'Guest')
        localStorage.setItem(`${action.payload.name}-notes`, JSON.stringify(state));
    },
    getNotes: (state,action) => {
      if (action.payload === 'Guest') {
        const notes = [];
        for (let i = 0; i < 10; i++)
          notes.push({
            createDate: new Date().getTime() - i * 3 * 24 * 60 * 60 * 1000,
            title: `This is a title for note ${new Date(new Date().getTime() - i * 3 * 24 * 60 * 60 * 1000).toLocaleDateString}`,
            description: `This is is huge description for note created on ${new Date(new Date().getTime() - i * 3 * 24 * 60 * 60 * 1000).toLocaleDateString()} and this really good attempt`
          })
        localStorage.setItem(`${action.payload}-notes`, JSON.stringify(notes));
        return notes
      } else return JSON.parse(localStorage.getItem(`${action.payload}-notes`)) || [];
    }
  }
})

export const { newNote, deleteNote, editNote, getNotes } = reducer.actions;
export default reducer.reducer;

// localStorage.removeItem('notes')
// notes = [];
// for(let i=0;i<10;i++)j
//   notes.push({
//     createDate:new Date().getTime()-i*3*24*60*60*1000,
//     title:`This is a title for note ${new Date(new Date().getTime()-i*3*24*60*60*1000).toLocaleDateString}`,
//     description:`This is is huge description for note created on ${new Date(new Date().getTime()-i*3*24*60*60*1000).toLocaleDateString()} and this really good attempt`
//   })
// localStorage.setItem('notes',JSON.stringify(notes))