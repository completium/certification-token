import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import TezIcon from './TezIcon';

function TezButton (props) {
  const handleClick = e => {
    props.handleClick(e);
  }
  if (props.withtezbox) {
    return <IconButton onClick={handleClick}>
              <TezIcon />
            </IconButton>;
  }
  return <IconButton>
    <Badge
      onClick={props.handleClick}
      badgeContent={"!"}
      color="secondary">
      <TezIcon />
    </Badge>
  </IconButton>;
}

export default TezButton;