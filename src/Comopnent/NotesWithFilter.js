import React, { useState } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { IconButton, Button, MenuItem, Menu, makeStyles } from '@material-ui/core'
import SortIcon from '@material-ui/icons/Sort';
import Notes from './Notes';
import Welcome from './Welcome';
import { withStyles } from '@material-ui/styles';
import { getNotes } from '../Helper/NoteReducer';

const useStyle = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(1, 2),
  }
}))

const MenuItemCust = withStyles(theme => ({
  root: {
    display:'flex',
    justifyContent: 'space-between',
  }
}))(MenuItem)

export default function NotesWithFilter() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const notes = useSelector(state =>  state.notes);
  const keyWords = useSelector(state => state.keyWords);
  const name = useSelector(state => state.name);
  // console.log(notes);

  const [nameKeeper, setNameKeeper] = useState(name);
  const [regexCountKeeper, setRegexCountKeeper] = useState(keyWords.length);
  const [countKeeper, setCountKeeper] = useState(notes.length);
  const [filteredNotes, setFilteredNotes] = useState([...notes]);
  const [reverse, setReverse] = useState(false);
  const [filterDate, setFilterDate] = useState({ startDate: 0, endDate: new Date().getTime() })
  const [filters, setFilters] = useState({ year: '1', month: '', week: '', date:'',clear:true });

  // this for filtering
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleFliterOpen = (event) =>setAnchorEl(event.currentTarget);
  const handleFliterClose = ()=>setAnchorEl(null);
  const handleFliterCloseWithYear = e => {
    setFilters({ year: e.currentTarget.value, month: '', week: '', date: '',clear:false });
    const date = { startDate: new Date(`${e.currentTarget.value}`).getTime(), endDate: new Date(`${parseInt(e.currentTarget.value) + 1}`).getTime() };
    setFilterDate(date);
    handleFliterClose();
    handleNotes(date);
  }
  const handleFliterCloseWithMonth = e => {
    setFilters({ year: '1', month: e.currentTarget.value, week: '', date: '',clear:false })
    const date = { startDate: new Date(`${e.currentTarget.value}`).getTime(), endDate: new Date(new Date(e.currentTarget.value).setMonth(parseInt(e.currentTarget.value.split('-')[1]))).getTime() };
    setFilterDate(date);
    handleFliterClose();
    handleNotes(date);
  }
  const handleFliterCloseWithWeek = e => {
    const d = new Date(new Date(e.currentTarget.value.split('-')[0]).getTime() + parseInt(e.currentTarget.value.split('-')[1].slice(1))* 7 * 24 * 60 * 60 * 1000);
    // const d = new Date(sDate);
    var day = d.getDay(),
        diff = d.getDate() - day + (day === 0 ? -6:1); // adjust when day is sunday
    const sDate = new Date(d.setDate(diff));
    const eDate = new Date(sDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    setFilters({ year: '1', month: '', week: e.currentTarget.value, date: '',clear:false });
    const date = { startDate: sDate.getTime(), endDate: eDate.getTime() };
    setFilterDate(date);
    handleFliterClose();
    handleNotes(date);
  }
  const handleFliterCloseWithDate = e => {
    setFilters({ year: '1', month: '', week: '', date: e.currentTarget.value,clear:false })
    const date = { startDate: new Date(`${e.currentTarget.value} `).getTime(), endDate: new Date(new Date(`${e.currentTarget.value} `).getTime() + 24 * 60 * 60 * 1000).getTime() }
    setFilterDate(date);
    handleFliterClose();
    handleNotes(date);
  }
  const handleClearFilter=()=>{
    setFilters({ year: '1', month: '', week: '', date: '',clear:true })
    const date = { startDate: 0, endDate: new Date().getTime() }
    setFilterDate(date);
    handleFliterClose();
    handleNotes(date);
  }
  //

  const handleReverse = () => {
    setFilteredNotes([...filteredNotes].reverse());
    setReverse(!reverse);
  }

  const handleNotes = (date, search) => {
    const localnotes = [...notes];
    const regex = new RegExp(`(${keyWords.join('\\s+|\\s+')})`, 'ig');
    if (reverse) localnotes.reverse();
    let newNotes;
    if (regexCountKeeper || search) {
      newNotes = localnotes.filter(n => n.createDate >= date.startDate && n.createDate <= date.endDate && ([...n.title.matchAll(regex)].length + [...n.description.matchAll(regex)].length) > 0);
    }
    else newNotes = localnotes.filter(n => n.createDate >= date.startDate && n.createDate <= date.endDate);
    setFilteredNotes(newNotes);
  }

  const notesChecker = () => {
    if (filteredNotes.length === 0) return true;
    else if (!reverse) {
      let i = 0;
      for (let n of notes)
        if (n.id === filteredNotes[i].id){
          if (filteredNotes.length === i + 1)
            return true;
          else i++;
        }
      return notes.length === 0 && filteredNotes.length === 0 ? true : false;
    } else {
      let i =  filteredNotes.length-1;
      for (let n of notes)
        if (n.id === filteredNotes[i].id){
          if (i===0)
            return true;
          else i--;
        }
      return notes.length === 0 && filteredNotes.length === 0 ? true : false;
    }
  }
  
  if (notes.length !== countKeeper || !notesChecker()){
    if (notes.length !== countKeeper)
      setCountKeeper(notes.length);
    if (!filters.clear)
      handleNotes(filterDate);
    else {
      const date = { startDate: 0, endDate: notes[0] ? notes[0].createDate: new Date().getTime() }
      setFilterDate(date);
      handleNotes(date);
    } 
  }
  if (keyWords.length !== regexCountKeeper) {
    setRegexCountKeeper(keyWords.length);
    if (!filters.clear)
      handleNotes(filterDate);
    else {
      const date = { startDate: 0, endDate: notes[0] ? notes[0].createDate : new Date().getTime() }
      setFilterDate(date);
      handleNotes(date, keyWords.length);
    }
  }
  if (name !== nameKeeper) {
    setNameKeeper(name);
    dispatch(getNotes(name));
  }

  if(!name)
    return <Welcome/>
  
  return (
    <>
      <div className={classes.root}>
        <IconButton aria-label="sort" onClick={handleReverse}>
          <SortIcon style={{ transform: `rotateZ(${reverse? 180:0}deg)`}}/>
        </IconButton>
        <Button aria-controls="Fliter" aria-haspopup="true" onClick={handleFliterOpen}>Fliter</Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleFliterClose}
        >
          <MenuItemCust onClick={handleClearFilter} style={{justifyContent:'center'}}>
            Clear
          </MenuItemCust >
          <MenuItemCust component="form">
            <label htmlFor="year">Year:</label>
            <select name="year" id="year" onChange={handleFliterCloseWithYear} value={filters.year}>
              <option disabled value="1"> --- select an option --- </option>
              {(() => {
                if (!notes[0]) return;
                const options = [];
                for (let i = new Date(notes[0].createDate).getFullYear(); i >= new Date(notes[notes.length-1].createDate).getFullYear(); i--)
                  options.push(i);
                return options.map(o => <option value={o} key={o}>{o}</option>)
              })()}
            </select>
          </MenuItemCust >
          <MenuItemCust>
            <label htmlFor="month">Month:</label>
            <input type="month" name="month" id="month" onChange={handleFliterCloseWithMonth} value={filters.month}/>
          </MenuItemCust>
          <MenuItemCust>
            <label htmlFor="week">Week:</label>
            <input type="week" name="week" id="week" onChange={handleFliterCloseWithWeek} value={filters.week}/>
          </MenuItemCust>
          <MenuItemCust>
            <label htmlFor="date">Date:</label>
            <input type="date" name="date" id="date" onChange={handleFliterCloseWithDate} value={filters.date}/>
          </MenuItemCust>
        </Menu>
      </div>
      <Notes notes={filteredNotes} editButton={regexCountKeeper === 0} clear={filters.clear} name={ name }/>
    </>
  )
}
