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
    '&>h6': {
      maxHeight: '100px',
      whiteSpace: 'nowrap',
      overflow: 'auto'
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
  }
}))(InputBase)

const DescriptionInput = withStyles(theme => ({
  root:{
    ...theme.typography.body,
  }
}))(InputBase)

export default function Notes({ createDate, title, description, editFlag, parentSetFunc,name }) {
  const [edit, setEdit] = useState(editFlag);
  const [fullView, setFullView] = useState(false);
  const [stateTitle, setStateTitle] = useState(title);
  const [stateDescription, setStateDescription] = useState(description);

  const dispatch = useDispatch();
  const classes = useStyle();

  const handleSubmit = () => {
    if ((title !== stateTitle || description !== stateDescription) && stateTitle.length > 0 && stateDescription.length > 0) {
      setEdit(false);
      parentSetFunc(false);
      if (editFlag)
        dispatch(newNote({name,note:{ createDate: new Date().getTime(), title: stateTitle, description: stateDescription }}));
      else dispatch(editNote({name,note:{ createDate: createDate, title: stateTitle, description: stateDescription }}));
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

  if(edit)return (
    <form className={classes.root} onSubmit={e => { e.preventDefault(); handleSubmit()}}>
      <Typography component="span" className={classes.span}>{formatDate(createDate ? new Date(createDate) : new Date())}</Typography>
      <TitleInput inputProps={{ placeholder: 'Title' }} fullWidth={true} value={stateTitle} onChange={e => setStateTitle(e.currentTarget.value) }/>
      <DescriptionInput multiline={true} inputProps={{ placeholder: 'Describe...' }} fullWidth={true} value={stateDescription} onChange={e => setStateDescription(e.currentTarget.value)}/>
      <div className="button-group">
        <Button variant="outlined" color="secondary" onClick={handleCancle}>Cancel</Button>
        <Button color="primary" variant="contained" onClick={handleSubmit}>Save</Button>
      </div>
    </form>
  )
  else return(
    <div className={`${fullView ? classes.fullview : ''} ${classes.root}`}>
      <NoteMenu edit={setEdit} createDate={createDate} parentSetFunc={parentSetFunc} setFullView={setFullView} fullView={fullView} name={name}/>
      <Typography component="span" className={classes.span}>{formatDate(createDate?new Date(createDate):new Date())}</Typography>
      <Typography variant="h6">{stateTitle }</Typography>
      <Typography variant="body1" component="p">{stateDescription}</Typography>
    </div>
  )
}
