import React from 'react';
import { Typography, FormControl, FormHelperText, makeStyles, Link, TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux';
import { setName } from '../Helper/NameReducer';

const useStyle = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: `calc(100vh - 59.98px)`,
    '&>div>div': {
      margin: theme.spacing(1),
    },
    '&>div>form>div>*': {
      margin: theme.spacing(1),
    },
    "& h2": {
      color: '#f50000',
    }
  }
}))

export default function Welcome() {
  const dispatch = useDispatch();
  const classes = useStyle();

  const handleSubmit = (e)=>{
    e.preventDefault();
    const name = e.currentTarget.name.value.trim().split(/\s+/).join(' ');
    if (name)
      dispatch(setName(name));
    else alert('Please enter your name to procceed.');
  }
  
  return (
    <div className={classes.root}>
      <div>
        <div>
          <Typography variant="h2" color="secondary">Hi!!</Typography>
          <Typography variant="h4"><b>Let</b> Us Remember for You 😄</Typography>
        </div>
        <FormControl component='form' onSubmit={handleSubmit}>
          <TextField variant="outlined" inputProps={{ placeholder: "Your name goes here...", style: { fontSize: 'xx-large', color: '#454545' } }} name="name"/>
          <div>
            <Button variant="contained" color="primary" type="submit" size="large">
              Go
            </Button>
            <FormHelperText component="span">
              <Link variant="body2" component="button" underline="always" type="button" onClick={e => dispatch(setName('Guest'))}>get demo</Link>
            </FormHelperText>
          </div>
        </FormControl>
      </div>
    </div>
  )
}
