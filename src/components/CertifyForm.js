
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
//import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Paper from '@material-ui/core/Paper';

import SelectCertificate from './SelectCertificate.js';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: 12
  },
  root: {
    '& .MuiDialogContent-root': {
      padding : 0,
    },
  },
}));

function now () {
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return date+' '+time;
}

function CertifyForm(props) {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(now());
  const [certificate,setCertificate] = React.useState(null);
  const [learners, setLearners] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const handleDateChange = date => {
    setSelectedDate(date);
  };
  const handleIdsChange = event => {
    setLearners(event.target.value);
  };
  const handleClose = event => {
    setOpen(false);
  }
  const handleOpen = event => {
    setOpen(true);
  }
    return (
      <div>
        <Paper className={classes.paper}>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <MuiPickersUtilsProvider
                utils={DateFnsUtils}
                style={{marginTop : 40}}
              >
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Date picker dialog"
                  format="MM/dd/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item>
              <TextField
                label="Certificate"
                fullWidth="true"
                value={certificate?JSON.stringify(certificate):""}
                InputProps={{
                readOnly: true,
                endAdornment: <InputAdornment position="end">
                              <IconButton onClick={handleOpen}>
                                <ArrowDropDownIcon />
                              </IconButton>
                            </InputAdornment>
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                id="standard-multiline-flexible"
                label="Learner identifier(s)"
                multiline
                rowsMax="10"
                value={learners}
                onChange={handleIdsChange}
                fullWidth="true"
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" disableElevation  style={{marginTop : 12}}>
                Certify
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.root}
          maxWidth='false'
        >
          <DialogContent>
          <SelectCertificate theme={props.theme} setCertificate={setCertificate}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
            OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
}

export default CertifyForm;