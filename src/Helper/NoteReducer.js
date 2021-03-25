import { createSlice } from "@reduxjs/toolkit";

const reducer = createSlice({
  name: 'notes',
  initialState: (() => {
    const notes = JSON.parse(localStorage.getItem(`${localStorage.getItem('name')}-notes`));
    if (notes && notes.length > 0 && notes[0].id) return notes;
    localStorage.removeItem(`${localStorage.getItem('name')}-notes`);
    return [];
  })(),
  reducers: {
    newNote: (state, action) => {
      let flag = true;
      for (let i = 0; i < state.length; i++){
        if(state[i].createDate > action.payload.note.createDate) continue;
        else {
          state.splice(i, 0, action.payload.note);
          flag = false;
          break;
        }
      }
      if (flag) state.push(action.payload.note);
      if (action.payload.name !== 'Guest')
        localStorage.setItem(`${action.payload.name}-notes`, JSON.stringify(state));
    },
    deleteNote: (state, action) => {
      for (let i = 0; i < state.length;i++)
        if (state[i].id === action.payload.id) {
          state.splice(i, 1);
          break;
        }
      if (action.payload.name !== 'Guest')
        localStorage.setItem(`${action.payload.name}-notes`, JSON.stringify(state));
    },
    editNote: (state, action) => {
      let notePrivIndex;
      let updatedNoteCurrPos;
      let flag = true;
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.payload.privId && state[i].createDate !== action.payload.note.createDate) notePrivIndex = i;
        else if (state[i].id === action.payload.note.id) {
          state[i].createDate = action.payload.note.createDate;
          state[i].title = action.payload.note.title;
          state[i].description = action.payload.note.description;
          flag = false;
          break;
        }else if (state[i].createDate > action.payload.note.createDate) continue;
        else {
          updatedNoteCurrPos = i;
          state.splice(i, 0, action.payload.note);
          flag = false;
          break;
        }
      }
      
      if (flag) {
        state.push(action.payload.note);
        state.splice(notePrivIndex, 1);
      } else if (!flag && notePrivIndex === undefined){
        for (let i = updatedNoteCurrPos+1; i < state.length; i++)
          if (state[i].id === action.payload.privId) {
            state.splice(i,1)
          }
      }
      if (action.payload.name !== 'Guest')
        localStorage.setItem(`${action.payload.name}-notes`, JSON.stringify(state));
    },
    getNotes: (state,action) => {
      if (action.payload === 'Guest') {
        const notes = [];
        for (let i = 0; i <50; i++)
          notes.push({
            id: i,
            createDate: new Date(new Date().toLocaleDateString()).getTime() - i * 6 * 24 * 60 * 60 * 1000,
            title: `This is a Title-${i}`,
            description: `This is a huge description.\nThe note has been created on ${formatDate(new Date(new Date().getTime() - i * 6 * 24 * 60 * 60 * 1000))}.\nLet's make the world better place together.\nLet's make our Life charefull.`
          })
        return notes
      } else {
        const notes = JSON.parse(localStorage.getItem(`${action.payload}-notes`));
        if (notes && notes.length > 0 && notes[0].id) return notes;
        localStorage.removeItem(`${action.payload}-notes`);
        return [];
      }
    }
  }
})

const formatDate = (date) => {
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${date.getDate()} ${month[date.getMonth()]}, ${date.getFullYear()}`
}

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