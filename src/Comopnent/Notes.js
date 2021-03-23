import { makeStyles, Typography, withStyles } from '@material-ui/core'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import React, { useState } from 'react'
import Note from './Note';


const useStyle = makeStyles(theme => ({
  root:{
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    '&>*>*:not(button)': {
      fontSize: 'medium',
    },

    "&>*": {
      height: 'fit-content',
      width: `calc(25% - (${theme.spacing(0.5)}px * 2))`,
      margin: theme.spacing(1, 0.5),
      padding: theme.spacing(1.5, 2),
    },
    [theme.breakpoints.down('sm')]:{
      "&>*": {
        width: `calc(33% - (${theme.spacing(0.5)}px * 2))`,
        margin: `${theme.spacing(1)}px 0.1vw`,
        padding: theme.spacing(1),
      }
    },
    [theme.breakpoints.down('xs')]:{
      "&>*": {
        width: `calc(50% - (${theme.spacing(0.5)}px * 2))`,
        margin: `${theme.spacing(1)}px 0.1vw`,
        padding: theme.spacing(1, 1.1),
      }
    },
    "&>form": {
      width: '100%',
    }
  },
  root1: {
    display: 'flex',
    width: '100%',
    height: '80vh',
    justifyContent: 'center',
    alignItems:'center',
  }
}))

const AddButton = withStyles(theme => ({
  root:{
    position: 'fixed',
    right: theme.spacing(3),
    bottom: theme.spacing(3)
  }
}))(Fab)

export default function Notes({ notes, editButton, clear, name }) {
  const classes = useStyle();
  const [newFlag, setNewFlag] = useState(false);
  const [hideFlag, setHideFlag] = useState(false);

  const enterNewNote = () => setNewFlag(true);
  
  if (notes.length >= 1 || newFlag)return (
    <>
      <div className={classes.root}>
        {newFlag && <Note createDate={new Date().getTime()} title="" description="" editFlag={true} parentSetFunc={setNewFlag} name={name}/>}
        {notes.map(d => <Note key={d.createDate} {...d} editFlag={false} parentSetFunc={setHideFlag} name={name}/>)}
      </div>
      {editButton && !(newFlag || hideFlag) && clear &&
        (<AddButton color="primary" aria-label="add" onClick={enterNewNote}>
          <AddIcon />
        </AddButton>)
      }
    </>
  )
  else return (
    <div className={classes.root1}>
      <Typography variant="subtitle1" color="textSecondary">No note avaible...</Typography>
      {editButton && !(newFlag || hideFlag) && clear &&
        (<AddButton color="primary" aria-label="add" onClick={enterNewNote}>
          <AddIcon />
        </AddButton>)
      }
    </div>
  )
}
