import React from 'react';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TezIcon from './TezIcon.js';
//import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: 400,
      display: 'flex',
      flexDirection: 'row',
    },
  },
}));

function TezInfo(props) {
    const classes = useStyles();
    if (props.withtezbox) {
    return (<form
        className={classes.root}
        noValidate
        autoComplete="off"
      >
      <TextField
          label="Account"
          defaultValue={props.tezid}
          fullWidth="true"
          InputProps={{
            readOnly: true,
          }}
      />
      <TextField
          label="Balance"
          defaultValue={props.balance}
          fullWidth="true"
          InputProps={{
            readOnly: true,
            startAdornment: (
            <InputAdornment position="start">
              <TezIcon style={{ fontSize: 12 }}/>
            </InputAdornment>
          ),
          }}
      />
    </form>);
    } else {
      return null;
    };
}

export default TezInfo;