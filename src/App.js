import React from 'react';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core'
import Container from '@material-ui/core/Container';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';

import NavBar from './components/NavBar';
import Login from './components/Login.js';
import Register from './components/Register';
import Learner from './components/Learner.js';
import Institution from './components/Institution.js';
import Certifier from './components/Certifier.js';
import SnackbarContentWrapper from './components/SnackbarContentWrapper.js';

const themedark = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const themebright = createMuiTheme({
  palette: {
    type: 'light',
  },
});

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function App() {
  const classes = useStyles();

  const [withTezbox, setWithTezbox] = React.useState(false);
  const [openBd, setOpenBd] = React.useState(false); /* backdrop state */
  const [sbState, setSbState] = React.useState({open:false,status:"success",msg:""}); /* snackbar state */
  const [display, setDisplay] = React.useState('Login');
  const [registered, setRegistered] = React.useState(false);
  const [tezid,setTezId] = React.useState('tz1Lc2qBKEWCBeDU8npG6zCeCqpmaegRi6Jg');
  const [nbTokens,setNbTokens] = React.useState(0);
  const contractid = 'KT1Ah4B8msdVS5KU2b4snWeQHZWSoiSvwBqG';
  const rpcprovider='https://rpcalpha.tzbeta.net/';
  const [bright,setBright] = React.useState(false);
  function handleTezid(tezid) {
    setWithTezbox(false);
    setTezId(tezid);
  }
  function getDisplay() {
    switch(display) {
      case 'Login':
        return <Login
            handleBackdrop={setOpenBd}
            handleDisplay={setDisplay}
            registered={registered}
            setRegistered={setRegistered}
            withTezbox={withTezbox}
            contractid={contractid}
            rpcprovider={rpcprovider}
            tezid={tezid}
            setNbTokens={setNbTokens}
        />;
      case 'RegisterLearner':
        return <Register
          profile="Learner"
          handleBackdrop={setOpenBd}
          setRegistered={setRegistered}
          setDisplay={setDisplay}
          setSbState={setSbState}
          contractid={contractid}
        />;
      case 'RegisterInstitution':
        return <Register
          profile="Institution"
          handleBackdrop={setOpenBd}
          setRegistered={setRegistered}
          setDisplay={setDisplay}
          setSbState={setSbState}
          contractid={contractid}
        />;
      case 'RegisterCertifier':
        return <Register
          profile="Certifier"
          handleBackdrop={setOpenBd}
          setRegistered={setRegistered}
          setDisplay={setDisplay}
          setSbState={setSbState}
          contractid={contractid}
        />;
      case 'Learner':
        return <Learner
          tezid={tezid}
          nbtokens={nbTokens}
          handleBackdrop={setOpenBd}
          setDisplay={setDisplay}
          setSbState={setSbState}
          contractid={contractid}
          rpcprovider={rpcprovider}
        />;
      case 'Institution':
          return <Institution
            tezid={tezid}
            handleBackdrop={setOpenBd}
            setSbState={setSbState}
          />;
      case 'Certifier':
        return <Certifier
          tezid={tezid}
          handleBackdrop={setOpenBd}
          setSbState={setSbState}
          theme={bright?themebright:themedark}
        />;
    }
  }
  const handleCloseSb = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSbState({open:false,status:"success",msg:""});
  };
  return (
      <ThemeProvider theme={bright?themebright:themedark}>
        <CssBaseline />
        <NavBar
          handleDisplay={setDisplay}
          withTezbox={withTezbox}
          setWithTezbox={setWithTezbox}
          registered={registered}
          setRegistered={setRegistered}
          handleTezid={handleTezid}
          tezid={tezid}
          rpcprovider={rpcprovider}
          color="inherit"
          bright={bright}
          setBright={setBright}
        />
        <Container style={{ marginTop: 40 }}>
          {getDisplay()}
        </Container>
        <Backdrop
          className={classes.backdrop}
          open={openBd}
          onClick={() => {
          setOpenBd(false);
          }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={sbState.open}
          autoHideDuration={3000}
          onClose={handleCloseSb}
        >
          <SnackbarContentWrapper
            onClose={handleCloseSb}
            variant={sbState.status}
            message={sbState.msg}
          />
        </Snackbar>
      </ThemeProvider>
  );
}

export default App;
