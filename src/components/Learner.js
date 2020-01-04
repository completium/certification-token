import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Person from '@material-ui/icons/AccountBox';
import Donut from '@material-ui/icons/DonutLarge';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import DialogTable from './DialogTable.js';

import * as BcUtils from '../bc-utils';
import * as Onisep from './Onisep_db.js';

const useStyles = makeStyles(theme => ({
  wrapIcon: {
    verticalAlign: 'middle',
    display: 'inline-flex',
    marginRight: 40
   }
}));

//function createData(certificate, date, operation) {
//  return { certificate, date, operation };
//}

const columns = [
  { title:'Date', field:'cdate', render: rd => (new Date(rd.cdate)).toLocaleDateString("en-US") },
  { title:'Certificate', field:'cid', hidden:true },
  { title:'Institution', field:'cins' },
];

function lookupdb(val) {
  var certificates = Onisep.db.filter(c => {
    console.log(c);
    const k = Onisep.mkid(c);
    console.log(k);
    console.log("val : " + val);
    return val === k;
  });
  if (certificates.length > 0) {
    const cer0 = certificates[0];
    return cer0.libelle_formation_principal + " (" + cer0.libelle_formation_complementaire + ")";
  }
  return "Not found";
}

function mkRows(tezid, certificates) {
  return Object.keys(certificates)
    .filter(k => certificates[k].clea === tezid)
    .map(k => {
      var obj = certificates[k];
      console.log("obj ...");
      console.log(obj.ccer);
      obj.cid = lookupdb(obj.ccer);
      return obj;
    });
}

function detail(rd) { return <Typography style={{marginLeft : 14}}>{rd.cid}</Typography>;}

function Learner (props) {
  const classes = useStyles();
  const isize = 40;
  const nbtokens = props.nbtokens;
  const [openView, setOpenView] = React.useState(false);
  const rows = mkRows(props.tezid, props.certificates);
  //console.log('nb certificates : '+(props.certificates.length));
  function handleClose() {
    setOpenView(false);
  }
  function handleOpen() {
    setOpenView(true);
  }
  function onUnRegister () {
    props.handleBackdrop(true);
    BcUtils.register_learner(props, false)
    .then(result => {
      console.log(result);
      props.handleBackdrop(false);
      props.setDisplay('Login');
      props.setRegistered(false);
      props.setSbState({open:true,status:"success",msg:"Unregistration succeeded!"})
    })
    .catch(error => {console.log(error.toString());
      props.handleBackdrop(false);
      props.setDisplay('Login');
      props.setSbState({open:true,status:"error",msg:"Registration failed"})
    })
  }
  return (<div>

    <Grid container direction="column" spacing={5}>
      <Grid item>
        <Typography>
          <Person className={classes.wrapIcon} style={{ fontSize: isize }} />
          {props.tezid}
        </Typography>
      </Grid>
      <Grid item>
        <Typography>
          <Donut className={classes.wrapIcon} style={{ fontSize: isize }} />
          {nbtokens} token{nbtokens>0?'s':''}
        </Typography>
      </Grid>
      <Grid item>
        <Typography>
          <AssignmentTurnedInIcon className={classes.wrapIcon} style={{ fontSize: isize }} />
          {rows.length} certificate{rows.length>0?'s':''}
          <Button variant="outlined" style={{ marginLeft: 50 }} onClick={handleOpen}>view</Button>
        </Typography>
      </Grid>
      <Grid item>
        <Button variant="outlined" color="secondary" onClick={onUnRegister}>
          Unregister
        </Button>
      </Grid>
    </Grid>
    <DialogTable
      aria-labelledby="simple-dialog-title"
      onClose={handleClose}
      open={openView}
      columns={columns}
      data={rows}
      title="Certificates"
      detail={detail}
    />
  </div>
  );
}

export default Learner;