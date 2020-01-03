import React from 'react';

//import { makeStyles } from '@material-ui/core/styles';

import Popover from '@material-ui/core/Popover';
//import Typography from '@material-ui/core/Typography';
import TezButton from './TezButton.js'
import TezInfo from './TezInfo.js';

import { Tezos } from '@taquito/taquito';

function TezBox(props) {
  //const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [balance, setBalance] = React.useState(0);

  function handleClick(e) {
    if (!props.withTezbox) {
      const tezbridge = window.tezbridge;
      tezbridge.request({method: 'get_source'}).then(function(r){
        if (r === false) {
          console.log("Tezbridge not configured");
        } else {
          props.handleTezid(r);
          props.setWithTezbox(true);
          Tezos.setProvider({rpc: props.rpcprovider});
          Tezos.tz.getBalance(r).then(function(balance) {
            setBalance(balance);
          });
        }
      });
    } else {
      setAnchorEl(e.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <TezButton
        withtezbox={props.withTezbox}
        handleClick={handleClick}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <TezInfo
          withtezbox={props.withTezbox}
          tezid={props.tezid}
          balance={Tezos.format('mutez', 'tz', balance)}
        />
      </Popover>
    </div>)
}

export default TezBox;