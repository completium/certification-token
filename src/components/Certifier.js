import React from 'react';

import CertifierIcon from '@material-ui/icons/School';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CertifyForm from './CertifyForm.js';

const useStyles = makeStyles(theme => ({
  wrapIcon: {
    verticalAlign: 'middle',
    display: 'inline-flex',
    marginRight: 40
   },
  }));

function Certifier(props) {
  const classes = useStyles();
  const isize = 40;
  return (
    <Grid container direction="column" spacing={5}>
      <Grid item>
        <Typography>
          <CertifierIcon className={classes.wrapIcon} style={{ fontSize: isize }} />
          {props.tezid}
        </Typography>
      </Grid>
      <Grid item>
        <Button variant="outlined" color="secondary">
          unregister
        </Button>
      </Grid>
      <Grid item>
        <Grid container xs="">
          <Grid item xs="6">
            <CertifyForm
              theme={props.theme}
              tezid={props.tezid}
              handleBackdrop={props.handleBackdrop}
              setSbState={props.setSbState}
              contractid={props.contractid}
              rpcprovider={props.rpcprovider}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>)
}

export default Certifier;