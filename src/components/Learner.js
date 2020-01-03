import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Person from '@material-ui/icons/AccountBox';
import Donut from '@material-ui/icons/DonutLarge';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import DialogTable from './DialogTable.js';

import * as BcUtils from '../bc-utils'

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
  { title:'Certificate', field:'certificated' },
  { title:'Date', field:'date' },
  { title:'Institution', field:'ins' },
];
const rows = [
//  createData('11a3e229084349bc25d97e29393ced1d', '2019/05/23', 'opFJMKU1Z5sJMUHk4AtR2grfdHBmXvCwA72GhKWrWVGfDEgnDQN'),
//  createData('82c16692a7f9040f3a6eb6a6a3f3c141', '2019/05/23', 'op3tyxXfMWrFkjWtYtVCVryX2ebwrELYyrf4jxhKiYt62R1Lo3x'),
//  createData('6ccef1b25ea58fb8be3ca1a1a744ea53', '2019/05/23', 'opFJMKU1Z5sJMUHk4AtR2grfdHBmXvCwA72GhKWrWVGfDEgnDQN'),
];

function Learner (props) {
  const classes = useStyles();
  const isize = 40;
  const nbtokens = props.nbtokens;
  const [openView, setOpenView] = React.useState(false);
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
      title="Certificates" />
  </div>
  );
}

export default Learner;