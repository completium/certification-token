import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Git from './Git';
import TezBox from './TezBox';
import Home from './Home';
//import Switches from './Switches';
import Bright from './Bright'

const useStyles = makeStyles(theme => ({
    title: {
      flexGrow: 2,
      marginLeft: 30,
    },
  }));

const NavBar = (props) => {
    const classes = useStyles();
    return (
        <div>
            <AppBar position="static" color="inherit">
                <Toolbar>
                    <Home handleDisplay={props.handleDisplay} />
                    <Typography variant="h6" className={classes.title} color="inherit">
                        Dapp for certification token
                    </Typography>
                    {/* <Switches
                      withTezbox={props.withTezbox}
                      setWithTezbox={props.setWithTezbox}
                      registered={props.registered}
                      setRegistered={props.setRegistered}
                    /> */}
                    <TezBox
                      withTezbox={props.withTezbox}
                      setWithTezbox={props.setWithTezbox}
                      handleTezid={props.handleTezid}
                      tezid={props.tezid}
                      rpcprovider={props.rpcprovider}
                    />
                    <Bright
                      bright={props.bright}
                      setBright={props.setBright}
                    />
                    <Git />
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;