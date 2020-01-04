import React from 'react';


import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

import ViewTable from './ViewTable.js';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiDialogContent-root': {
      padding : 0,
    },
  },
}));

function DialogTable(props) {
  const classes = useStyles();
  return <Dialog
    open={props.open}
    onClose={props.onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    className={classes.root}
    maxWidth='false'
  >
    <DialogContent>
      <ViewTable title={props.title} columns={props.columns} data={props.data} detail={props.detail}/>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.handleClose}>
        OK
      </Button>
    </DialogActions>
  </Dialog>
}

export default DialogTable;