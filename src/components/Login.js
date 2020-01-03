import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import PersonIcon from '@material-ui/icons/Person';
import InstitutionIcon from '@material-ui/icons/AccountBalance';
import CertifierIcon from '@material-ui/icons/School';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Tezos } from '@taquito/taquito';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const isize = 80;

export default function Login(props) {
  const classes = useStyles();
  const [open,setOpen] = React.useState(false);
  const handleClick = name => e => {
    console.log('login as '+name);
    if (props.withTezbox) {
      props.handleBackdrop(true);
      Tezos.setProvider({rpc: props.rpcprovider});
      Tezos.contract.at(props.contractid)
        .then(function (contract) {
            console.log("Printing contract methods...");
            console.log(contract.methods);
            console.log("Showing initial storage...");
            contract.storage()
              .then(function (s) {
                //console.log(Object.keys(s.learner_assets));
                //console.log(props.tezid);
                var reg = false;
                switch(name) {
                  case 'Learner' :
                    reg = Object.keys(s.learner_assets).includes(props.tezid);
                    props.setNbTokens(reg?parseInt(s.learner_assets[props.tezid].ltokens):0);
                    break;
                  case 'Institution' :
                    console.log(Object.keys(s.institution_assets));
                    reg = Object.keys(s.institution_assets).includes(props.tezid);
                    props.setNbTokens(reg?parseInt(s.institution_assets[props.tezid].itokens):0);
                    props.setIlearners(reg?s.institution_assets[props.tezid].ilearners:[]);
                    break;
                  case 'Certifier' :
                    reg = Object.keys(s.certifier_assets).includes(props.tezid);
                    break;
                  default : break;
                };
                //console.log(reg);
                props.setRegistered(reg);
                props.handleDisplay(reg?name:'Register'+name);
                console.log(s);
                props.handleBackdrop(false);
              });
        });
    } else {
      setOpen(true);
    }
  }
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.paper}>Login as</Typography>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <PersonIcon style={{ fontSize: isize }} />
            <Typography>Learner</Typography>
            <Button onClick={handleClick('Learner')}>Login</Button>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <InstitutionIcon style={{ fontSize: isize }} />
            <Typography>Institution</Typography>
            <Button onClick={handleClick('Institution')}>Login</Button>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <CertifierIcon style={{ fontSize: isize }} />
            <Typography>Certifier</Typography>
            <Button onClick={handleClick('Certifier')}>Login</Button>
          </Paper>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Tezbox wallet"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            No wallet detected. <br/>Please click the Tezos icon to open Tezbridge wallet.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}