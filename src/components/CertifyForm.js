
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';

import SelectCertificate from './SelectCertificate.js';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import * as BcUtils from '../bc-utils';
import { mkid } from './Onisep_db.js';

var shajs = require('sha.js')

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
  return today;
}

function toUiDate (idate) {
  var date = idate.getFullYear()+'-'+(idate.getMonth()+1)+'-'+idate.getDate();
  var time = idate.getHours() + ":" + idate.getMinutes() + ":" + idate.getSeconds();
  return date + ' ' + time;
}

function toTzDate(idate) {
  // console.log(idate);
  // const [date,time] = idate.split(' ');
  // return date + 'T' + time + 'Z';
  return idate.toISOString();
}

function mkData(data,learners,instId) {
  var ids = learners.split("\n").filter(val => BcUtils.isTz1Address(val));
  var obj = ids.map(l => { return { "lid":l, "iid":instId };});
  return data.concat(obj);
}

function mkcid(i,tezid) {
  return new shajs.sha256().update(''+i+''+tezid+now()).digest('hex').substring(0,12);
}

function mkCertifications(tezid,date,certificate,data) {
  return data.map((d,i) => {
    const cid = mkcid(i,tezid);
    var cert = {
      libelle_formation_principal:certificate.label,
      libelle_formation_complementaire:certificate.clabel
    };
    console.log(cert);
    const ccer = mkid(cert);
    console.log('ccer : ' + ccer);
    const cdate = toTzDate(date);
    const clea = d.lid;
    const cins = d.iid;
    const ccertifier = tezid;
    return {"cid":cid, "ccer":ccer, "cdate":cdate, "clea":clea, "cins":cins, "ccertifier":ccertifier};
  });
}

function parseDate(datestr) {
  var d = new Date(datestr);
  return d;
}

function CertifyForm(props) {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(now());
  const [certificate,setCertificate] = React.useState(null);
  const [learners, setLearners] = React.useState('');
  const [instid, setInstId] = React.useState('');
  const [data, setData] = React.useState([]);
  const [multi,setMulti] = React.useState('');
  const [multierror,setMultiError] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [add, setAdd] = React.useState(false);
  const handleDateChange = date => {
    setSelectedDate(parseDate(date));
  };
  const handleIdsChange = event => {
    setLearners(event.target.value);
  };
  const handleDataChange = event => {
    setMulti(event.target.value);
    try {
      var val = event.target.value;
      val = val === '' ? '[]' : val;
      const d = JSON.parse(val);
      setData(d);
      setMultiError(false);
    } catch (e) {
      if (e instanceof SyntaxError) {
          setMultiError(true);
      }
    }
  }
  const handleInstChange = event => {
    setInstId(event.target.value);
  }
  const handleClose = event => {
    setOpen(false);
  }
  const handleOpen = event => {
    setOpen(true);
  }
  const handleAdd = event => {
    setAdd(true);
  }
  const handleAddClose = event => {
    setAdd(false);
    const d = mkData(data,learners,instid);
    setData(d);
    setMulti(JSON.stringify(d,null,2));
    setLearners('');
    setInstId('');
  }
  const certify = event => {
    const certifications = mkCertifications(props.tezid,selectedDate,certificate,data);
    props.handleBackdrop(true);
    BcUtils.certify({contractid:props.contractid},certifications)
    .then(result => {
      props.handleBackdrop(false);
      props.setSbState({open:true,status:"success",msg:"certification succeeded!"})
    })
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
                  format="yyyy-MM-dd"
                  value={toUiDate(selectedDate)}
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
                error={multierror}
                id="standard-multiline-flexible"
                label="Learner(s) - Institution identifier(s)"
                multiline
                rowsMax="10"
                value={multi}
                onChange={handleDataChange}
                fullWidth="true"
                InputProps={{
                endAdornment: <InputAdornment position="end">
                              <IconButton onClick={handleAdd}>
                                <AddIcon />
                              </IconButton>
                            </InputAdornment>
                }}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={certify}
                style={{marginTop : 12}}
              >
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
            <Button onClick={handleClose}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={add}
          onClose={handleAddClose}
          className={classes.root}
          maxWidth='true'
        >
        <DialogTitle>
          Learner(s) - Institution
        </DialogTitle>
        <DialogContent style={{ paddingLeft:14, paddingRight:14}}>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <TextField
                label="Learner(s) identifier(s)"
                multiline
                rowsMax="10"
                value={learners}
                onChange={handleIdsChange}
                fullWidth="true"
                style={{width:400}}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Institution identifier"
                value={instid}
                onChange={handleInstChange}
                fullWidth="true"
                style={{width:400}}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleAddClose}>
            Add
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    )
}

export default CertifyForm;