import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import { useStyles } from '../styles';

export default function Header() {
  const classes = useStyles();
  const user = useSelector(state => state.user);

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.flexGrow}>
          הצ'ט העברי שלי
        </Typography>
        {user && (
          <div  className={classes.flex}>
            <Avatar alt={user.name} src={`https://i.pravatar.cc/150?u=${user.name}`} className={classes.hSpaced} />
            <Typography variant="h6" component="div" color="inherit" className={classes.vCentered}>
              {user.name}
            </Typography>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired
  })
};

