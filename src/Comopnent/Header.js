import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, Typography, FormControl, OutlinedInput, IconButton, MenuItem, Menu } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import src from '../android-chrome-192x192.png';
import { withStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setKeyword, removeKeyword } from '../Helper/KeyWordReducer';
import { removeName } from '../Helper/NameReducer';

const useStyles = makeStyles(theme => ({
  main: {
    display: 'flex',
    alignItems: 'center',
    width: '100vw',
    justifyContent: 'space-between',
    '&>*':{
      margin: '4px 1vw',
    },
    '&>h5': {
      color: theme.palette.type !== 'dark' ? theme.palette.text.secondary : theme.palette.text.hint,
      whiteSpace: 'nowrap',
      alignSelf:'flex-end'
    }
  },
}))

const Icon = withStyles(theme => ({
  root: {
    width: theme.spacing(6.5),
    height: theme.spacing(6.5),
  }
}))(Avatar)

const SearchFrom = withStyles(theme => ({
  root: {
    '& input': {
      ...theme.typography.h5,
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.spacing(3),
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.spacing(2),
      },
      color: theme.palette.type === 'dark' ? theme.palette.text.hint : theme.palette.text.secondary,
      padding: theme.spacing(1.6, 2),
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.type === 'dark' ? theme.palette.grey.A700 : theme.palette.grey.A200,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.type === 'dark' ? theme.palette.grey.A200 : theme.palette.grey[600],
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.type === 'dark' ? theme.palette.grey.A200 : theme.palette.grey[600],
      },
    }
  }
}))(FormControl)

const SearchIconCust = withStyles(theme => ({
  root: {
    width: theme.spacing(4),
    height:theme.spacing(4)
  }
}))(SearchIcon)
const CloseIconCust = withStyles(theme => ({
  root: {
    width: theme.spacing(4),
    height:theme.spacing(4)
  }
}))(CloseIcon)

const CustomIconButton = withStyles(theme => ({
  root: {
    padding:0,
  }
}))(IconButton)

const AvatarCust = withStyles(theme => ({
  root: {
    width: '1.75em',
    height: '1.75em',
  }
}))(Avatar)

export default function Header() {
  const classes = useStyles();
  const name = useSelector(state => state.name);
  const [search, setSearch] = useState(false);
  const [keyWords, setKeyWords] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search && keyWords.trim().length !== 0) {
      dispatch(setKeyword(keyWords.trim()));
      setSearch(true);
    } else dispatch(removeKeyword());
  }

  const closeSearch = () => {
    setKeyWords('');
    setSearch(false);
    dispatch(removeKeyword());
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  
  return (
    <header className={classes.main}>
      <Icon alt="icon" src={src} variant="square"></Icon>
      {name &&
        (<>
          <SearchFrom component="form" onSubmit={handleSearch}>
            <OutlinedInput
              readOnly={search}
              name="search"
              inputProps={{ placeholder: 'Searching Start here...' }}
              value={keyWords}
              onChange={e=>setKeyWords(e.currentTarget.value)}
              endAdornment={
                search ?
                <CustomIconButton type="submit" aria-label="search" onClick={closeSearch}>
                  <CloseIconCust />
                </CustomIconButton>
                  :
                <CustomIconButton type="submit" aria-label="search">
                  <SearchIconCust />
                </CustomIconButton>
              }
            />
          </SearchFrom>
          <IconButton aria-label="Name" onClick={handleOpen}>
          <AvatarCust style={{ background: '#fd7575'}}>{name[0].toUpperCase()}</AvatarCust>
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
          <Typography align="center" gutterBottom={true} noWrap={true} variant="h6" color="error">Hi!! {name}</Typography>
          <MenuItem style={{ justifyContent: 'center' }} onClick={e => { handleClose();dispatch(removeName())}}>
              Chnage Name
            </MenuItem >
            {/* <MenuItem  style={{ justifyContent: 'center' }}>
              Change Mode
            </MenuItem > */}
          </Menu>
        </>)
      }
    </header>
  )
}
