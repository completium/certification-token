import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
      console.log(stid);
      props.handleBackdrop(true);
      setTimeout(() => {
        props.handleBackdrop(false);
        setStid("");
        props.setSbState({open:true,status:"success",msg:"Transaction succeeded."});
      },
      1000);
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
