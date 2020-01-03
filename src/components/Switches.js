import React from 'react';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

function Switches (props) {
  const handleTezboxChange = e => {
    props.setWithTezbox(!e.target.checked);
    console.log(props.withTezbox);
  };
  const handleRegisteredChange = e => {
    props.setRegistered(!e.target.checked);
    console.log(props.notRegistered);
  };
  const tb_lbl = props.withTezbox?"With Tezbox":"Without Tezbox";
  const nr_lbl = props.registered?"Registered":"Not registered";
  return <FormGroup row>
    <FormControlLabel
      control={
        <Switch
          checked={!props.withTezbox}
          onChange={handleTezboxChange}
          value="checkedB"
        />
      }
      label={tb_lbl}
    />
    <FormControlLabel
      control={
        <Switch
          checked={!props.registered}
          onChange={handleRegisteredChange}
          value="checkedB"
        />
      }
      label={nr_lbl}
    />
  </FormGroup>
}

export default Switches