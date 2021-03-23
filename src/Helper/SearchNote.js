// import { createSlice } from "@reduxjs/toolkit";
// import { useSelector,useDispatch } from "react-redux";

// const dispatch = useDispatch();

// const reducer = createSlice({
//   name: 'notes',
//   initialize: [],
//   reducers: {
//     deleteNote: (state, action) => {
//       const notes = useSelector(state => state.notes);
//       state.splice(action.payload, 1);
//       localStorage.setItem('notes', JSON.stringify(state));
//     },
//     sortByDate: (state, action) => {
//       if (action.payload === true && !state.reverse) {
//         state.reverse();
//         state.reverse = true;
//       } else if (action.payload === false && state.reverse) {
//         state.reverse();
//         state.reverse = false;
//       }
//     },
    
//     searchNote: (state, action) => {
//       const notes = useSelector(state => state.notes);
//       // state = [];
//       // matchedCountList = [];
//       // for (let i = 0; i < allNotes.length; i++){
        
//       // }
//       const keyWords = new RegExp(`(${action.payload.trim().split(/\s+/).join('|')})`, 'ig');
//       state = notes.filter(note => [...note.title.matchAll(keyWords)].length !== 0 || [...note.description.matchAll(keyWords)].length !== 0)
//     }
//   }
// })

// // export const { newNote, deleteNote, sortByDate } = reducer.actions;
// export const { searchNote } = reducer.actions;
// export default reducer.reducer;