import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Bright4 from '@material-ui/icons/Brightness4';
import Bright7 from '@material-ui/icons/Brightness7';
import Tooltip from '@material-ui/core/Tooltip';

const Bright = (props) => {
  function handleClick() {
    props.setBright(!props.bright)
  }
  return props.bright?
    <Tooltip title="Toggle light/dark theme">
    <IconButton onClick={handleClick}>
      <Bright4 />
    </IconButton>
    </Tooltip> :
    <Tooltip title="Toggle light/dark theme">
    <IconButton onClick={handleClick}>
      <Bright7 />
    </IconButton>
    </Tooltip>
}

export default Bright;