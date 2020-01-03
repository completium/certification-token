import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import * as BcUtils from '../bc-utils';
import { Tezos } from '@taquito/taquito';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: 12,
  },
}));

function RegisterStudent(props) {
  const classes = useStyles();
  const [error, setError] = React.useState(false);
  const [stid, setStid] = React.useState("");
  const handleChange = event => {
    var val = event.target.value;
    setStid(val);
    if (val.length >= 1) {
      setError(false);
    }
  };
  const onRegister = source => event => {
    if (stid.length === 0) {
      setError(true);
    } else {
      var learners = stid.split("\n").filter(addr => BcUtils.isTz1Address(addr));
      console.log(learners);
      var reg = false;
      switch(source) {
        case 'register': reg = true; break;
        case 'unregsiter': reg = false; break;
        default: break;
      };
      props.handleBackdrop(true);
      BcUtils.register_learners({ contractid:props.contractid},reg,learners)
      .then(result => {console.log(result);
        Tezos.setProvider({rpc: props.rpcprovider});
        Tezos.contract.at(props.contractid)
        .then(function (contract) {
          contract.storage()
            .then(function (s) {
              props.handleBackdrop(false);
              props.setIlearners(s.institution_assets[props.tezid].ilearners);
            });
        });
        props.setSbState({open:true,status:"success",msg:"Learners registration succeeded!"})
      });
    }
  };
  return (
    <Paper className={classes.paper}>
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <TextField
            error={error}
            id="standard-input"
            label="Learner identifier(s)"
            fullWidth="true"
            multiline
            rowsMax="10"
            value={stid}
            onChange={handleChange}
        />
      </Grid>
      <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                onClick={onRegister("register")}
                variant="contained"
                color="primary"
                disableElevation
              >
                Register Learner(s)
              </Button>
            </Grid>
            <Grid item><Button onClick={onRegister("unregister")}>Unregister</Button></Grid>
          </Grid>
      </Grid>
    </Grid>
    </Paper>
  );
}

export default RegisterStudent;
