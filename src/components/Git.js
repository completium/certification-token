import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import GitHub from '@material-ui/icons/GitHub';
import Tooltip from '@material-ui/core/Tooltip';

const Git = () => {
  return (
    <Tooltip title="Github repository">
      <IconButton href="https://github.com/edukera/certification-token">
        <GitHub />
      </IconButton>
    </Tooltip>
  )
}

export default Git;