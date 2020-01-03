import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Bright4 from '@material-ui/icons/Brightness4';
import Bright7 from '@material-ui/icons/Brightness7';

const Bright = (props) => {
  function handleClick() {
    props.setBright(!props.bright)
  }
  return props.bright?
    <IconButton onClick={handleClick}>
      <Bright4 />
    </IconButton> :
    <IconButton onClick={handleClick}>
      <Bright7 />
    </IconButton>
}

export default Bright;