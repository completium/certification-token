import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import TezIcon from './TezIcon';

function TezButton (props) {
  const handleClick = e => {
    props.handleClick(e);
  }
  if (props.withtezbox) {
    return <Tooltip title="View wallet">
      <IconButton onClick={handleClick}>
        <TezIcon />
      </IconButton>
    </Tooltip>
  }
  return <Tooltip title="Open Tezbridge wallet">
    <IconButton>
      <Badge
        onClick={props.handleClick}
        badgeContent={"!"}
        color="secondary">
        <TezIcon />
      </Badge>
    </IconButton>
  </Tooltip>;
}

export default TezButton;