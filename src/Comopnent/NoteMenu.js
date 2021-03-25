import React from 'react';
import {  Button, MenuItem, Menu, useMediaQuery } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { deleteNote } from '../Helper/NoteReducer';
import { useDispatch } from 'react-redux';

const MenuButton = withStyles(theme=>({
  root:{
    position: 'absolute',
    right: 5,
    top:3,
    minWidth: 5,
  },
  label:{
    display: 'block',
    height: theme.spacing(2.5),
    borderLeftWidth: 5,
    borderLeftStyle: 'dotted',
    borderLeftColor: theme.palette.type ==='dark'? theme.palette.grey[600]:theme.palette.grey[400],
  }
}))(Button)

export default function NoteMenu({ edit, id, parentSetFunc,fullView, setFullView, name}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleFliterOpen = (event) =>setAnchorEl(event.currentTarget);
  const handleFliterClose = ()=>setAnchorEl(null);

  const dispatch = useDispatch()

  const handleDelete = ()=> dispatch(deleteNote({name,id}));
  const matches = useMediaQuery(theme => theme.breakpoints.down('xs'));
  
  return (
    <>
      <MenuButton aria-controls="Fliter" aria-haspopup="true" onClick={handleFliterOpen}/>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleFliterClose}
      >
        <MenuItem component="form" onClick={() => { edit(true); parentSetFunc(true);handleFliterClose()}}>
          edit
        </MenuItem >
        <MenuItem component="form" onClick={handleDelete}>
          delete
        </MenuItem >
        {!matches && <MenuItem component="form" onClick={() => { parentSetFunc(!fullView); setFullView(!fullView); handleFliterClose()}}>
          {fullView?'close':'view'}
        </MenuItem >}
      </Menu>
    </>
  )
}
