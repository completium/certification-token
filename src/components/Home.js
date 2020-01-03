import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';

const Home = (props) => {
  function handleClick(e) {
    props.handleDisplay('Login');
  };
    return (
        <IconButton onClick={handleClick}>
            <HomeIcon />
        </IconButton>
    )
}

export default Home;