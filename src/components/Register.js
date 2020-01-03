import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
//import { TezBridgeSigner } from '@taquito/tezbridge-signer';
//import { Tezos } from '@taquito/taquito';
//import { TezBridgeSigner } from '@taquito/tezbridge-signer'

import * as BcUtils from '../bc-utils'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: 80,
  },
  text: {
    height: 140,
    width: 200,
    marginTop:5, /* should try something else ... */
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function Register(props) {
  const classes = useStyles();
  function onRegister() {
    props.handleBackdrop(true);
    var register = null;
    switch(props.profile) {
      case 'Learner':  register = BcUtils.register_learner; break;
      case 'Institution': register = BcUtils.register_institution; break;
      case 'Certifier': register = BcUtils.register_certifier; break;
      default: register = null;
    }
    register(props, true)
    .then(result => {console.log(result);
      props.handleBackdrop(false);
      props.setDisplay(props.profile);
      props.setRegistered(true);
      props.setSbState({open:true,status:"success",msg:"Registration succeeded!"})
    })
    .catch(error => {console.log(error.toString());
      props.handleBackdrop(false);
      props.setDisplay('Login');
      props.setSbState({open:true,status:"error",msg:"Registration failed"})
    })
    /*Tezos.setProvider({rpc: props.rpcprovider, signer: new TezBridgeSigner()});
    Tezos.contract.at(props.contractid)
      .then(contract => {
        //contract.methods.register_learner(false).send({ fee: 50000, gasLimit: 500000 })
        contract.methods.main(true).send({ fee: 50000, gasLimit: 500000 })
          .then(operation =>{
            operation.confirmation()
              .then(() => {
                props.handleBackdrop(false);
                props.setDisplay(props.profile);
                props.setRegistered(true);
                props.setSbState({open:true,status:"success",msg:"Registration succeeded!"})
              })
              .else(() => {
                props.handleBackdrop(false);
                props.setDisplay('Login');
                props.setSbState({open:true,status:"error",msg:"Registration failed"})
              });
          })
      });*/
  }
  return (
    <div className={classes.root}>
    <Grid item xs={12}>
      <Grid container justify="center">
        <Grid item>
          <Typography className={classes.text}>You are not registered.</Typography>
        </Grid>
        <Grid>
          <Button variant="contained" color="primary" disableElevation onClick={onRegister}>Register as {props.profile}</Button>
        </Grid>
      </Grid>
    </Grid>
    </div>
  );
}

export default Register


//{"branch":"BMF7LvRiyRXk2MxzcjonZ1sdXm6Bv2nHndLB17o1mjJvcuQVYsN","contents":[{"kind":"transaction","fee":"30000","gas_limit":"800000","storage_limit":"60000","amount":"0","destination":"KT1VJDfQdcSejbFPu2Nsx7n6Xvoc8bUkfDGR","parameters":{"entrypoint":"register_learner","value":"true"},"source":"tz1hGAmQn8EZGWswKhMZJvY6P4FY8iWD4zD9","counter":"143797"}]}