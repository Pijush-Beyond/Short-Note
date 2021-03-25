import { InputBase, makeStyles, Typography, Button  } from '@material-ui/core'
import { withStyles } from '@material-ui/styles';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { editNote, newNote, } from '../Helper/NoteReducer';
import NoteMenu from "./NoteMenu";

const useStyle = makeStyles(theme => ({
  root: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.type ==='dark'? theme.palette.grey[600]:theme.palette.grey[400],
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',

    '&>*:not(span,button,div.button-group)': {
      overflow: 'auto',
      height: 'fit-content',
      margin: '0.1vw',
      // padding: theme.spacing(1),
    },
    "& span.date":{
      width:'fit-content',
    },
    '&>h6': {
      maxHeight: '100px',
      whiteSpace: 'nowrap',
      overflow: 'auto',
      fontWeight:'bold',
    },
    "&>p": {
      maxHeight:'300px',
      whiteSpace: 'pre',
      overflow: 'auto',
    },
    '&>div.button-group':{
      display:'flex',
      justifyContent: 'flex-end',
      alignItems:'center', 
    },
    '&>div.button-group>button':{
      margin: theme.spacing(0,1), 
    },
  },
  span:{
    position: 'absolute',
    top: -11,
    background: theme.palette.common.white,
  },
  fullview: {
    width:'100%!important',
    '&>h6,p': {
      width:'100%',
    }
  }
}))

const TitleInput = withStyles(theme => ({
  root:{
    ...theme.typography.h5,
    fontWeight: 'bold',
  }
}))(InputBase)

const DescriptionInput = withStyles(theme => ({
  root:{
    ...theme.typography.body,
  }
}))(InputBase)

export default function Notes({ createDate, title, description, editFlag, parentSetFunc, name, id }) {
  const [edit, setEdit] = useState(editFlag);
  const [fullView, setFullView] = useState(false);
  const [stateTitle, setStateTitle] = useState(title);
  const [stateDescription, setStateDescription] = useState(description);
  const [stateCreateDate, setStateCreateDate] = useState(createDate);

  const dispatch = useDispatch();
  const classes = useStyle();

  const handleSubmit = () => {
    if ((title !== stateTitle || description !== stateDescription || createDate !== stateCreateDate) && stateTitle.length > 0 && stateDescription.length > 0) {
      setEdit(false);
      parentSetFunc(false);
      if (editFlag)
        dispatch(newNote({ name, privId: id, note: { createDate: stateCreateDate, title: stateTitle, description: stateDescription, id: createDate !== stateCreateDate? new Date().getTime() : id }}));
      else dispatch(editNote({ name, privId: id, note: { createDate: stateCreateDate, title: stateTitle, description: stateDescription, id: createDate !== stateCreateDate ? new Date().getTime() : id }}));
    } else if (stateTitle.length > 0 && stateDescription.length > 0) {
      setEdit(false);
      parentSetFunc(false);
    } else {
      alert(`You must provide ${stateTitle.length === 0 && stateDescription.length === 0 ? 'Title and Description' : (stateTitle.length === 0?"Title": 'Description')}`)
    }
  }
  
  const handleCancle = ()=>{
    setStateTitle(title);
    setStateDescription(description);
    setEdit(false)
    parentSetFunc(false);
  }

  const formatDate = (date) => {
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${date.getDate()} ${month[date.getMonth()]}, ${date.getFullYear()}`
  }
  const formatDateForInputTag = (date)=>{
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  if(edit)return (
    <form className={classes.root} onSubmit={e => { e.preventDefault(); handleSubmit()}}>
      {/* <Typography component="span" className={classes.span}>{formatDate(createDate ? new Date(createDate) : new Date())}</Typography> */}
      <TitleInput inputProps={{ placeholder: 'Title' }} fullWidth={true} value={stateTitle} onChange={e => setStateTitle(e.currentTarget.value) }/>
      <span className="date">
        <label htmlFor={id}>Date: </label>
        <input id={id} name="createDate" type="date" value={formatDateForInputTag(stateCreateDate)} onChange={(e)=>setStateCreateDate(new Date(`${e.currentTarget.value} `).getTime())}/>
      </span>
      <DescriptionInput multiline={true} inputProps={{ placeholder: 'Describe...' }} fullWidth={true} value={stateDescription} onChange={e => setStateDescription(e.currentTarget.value)}/>
      <div className="button-group">
        <Button variant="outlined" color="secondary" onClick={handleCancle}>Cancel</Button>
        <Button color="primary" variant="contained" onClick={handleSubmit}>Save</Button>
      </div>
    </form>
  )
  else return(
    <div className={`${fullView ? classes.fullview : ''} ${classes.root}`}>
      <NoteMenu edit={setEdit} id={id} parentSetFunc={parentSetFunc} setFullView={setFullView} fullView={fullView} name={name}/>
      <Typography component="span" className={classes.span}>{formatDate(new Date(stateCreateDate))}</Typography>
      <Typography variant="h6">{stateTitle }</Typography>
      <Typography variant="body1" component="p">{stateDescription}</Typography>
    </div>
  )
}
