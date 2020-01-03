import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import InstitutionIcon from '@material-ui/icons/AccountBalance';
import Donut from '@material-ui/icons/DonutLarge';
import People from '@material-ui/icons/People';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';

import RegisterStudent from './RegisterStudent.js';
import DialogTable from './DialogTable.js';

const useStyles = makeStyles(theme => ({
    wrapIcon: {
      verticalAlign: 'middle',
      display: 'inline-flex',
      marginRight: 40
     }
  }));

function Institution(props) {
  const classes = useStyles();
  const [openView, setOpenView] = React.useState(false);
  const isize = 40;
  const nbtokens = props.nbTokens;
  function handleClose() {
    setOpenView(false);
  }
  function handleOpen() {
    setOpenView(true);
  }
  const columns = [ { title: 'Address', field: 'addr' } ]
  const learners = props.iLearners.map(l => { var obj = {}; obj.addr=l; return obj; });

  return (
    <div>
    <Grid container direction="column" spacing={5}>
      <Grid item>
        <Typography>
          <InstitutionIcon className={classes.wrapIcon} style={{ fontSize: isize }} />
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
          <People className={classes.wrapIcon} style={{ fontSize: isize }} />
          {learners.length} learner{learners.length>0?'s':''}
          <Button variant="outlined" style={{ marginLeft: 50 }} onClick={handleOpen}>view</Button>
        </Typography>
      </Grid>
      <Grid item>
      <Button variant="outlined" color="secondary">
          Unregister
      </Button>
      </Grid>
      <Grid item>
        <Grid container>
          <Grid item xs="6">
          <RegisterStudent
            handleBackdrop={props.handleBackdrop}
            setSbState={props.setSbState}
            rpcprovider={props.rpcprovider}
            contractid={props.contractid}
            tezid={props.tezid}
            setIlearners={props.setIlearners}
          />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    <DialogTable
      aria-labelledby="simple-dialog-title"
      onClose={handleClose}
      open={openView}
      columns={columns}
      data={learners}
      title="Learners" />
    </div>
  );
}

export default Institution;