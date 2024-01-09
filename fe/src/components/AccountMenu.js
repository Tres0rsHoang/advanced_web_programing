
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';
import { blue } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import { handleLogoutRedux, handleGoogleLogoutRedux } from '../redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const GoogleClientID = '355691189679-g1bqbv7ar8r0bcii90alovankquv19vu.apps.googleusercontent.com';

  const user = useSelector(state => state.user.account);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    if (user.auth) {
      dispatch(handleLogoutRedux());
    }
  }

  const onSuccess = () => {
    if (user.auth) {
        dispatch(handleGoogleLogoutRedux());
    }
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar src={user.imageUrl} sx={{ width: 40, height: 40, background: blue[500] }}>{user.firstName.charAt(0)}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 2,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem sx={{ margin: '10px'}} component={Link} to="/profile">
          <Avatar src={user.imageUrl} sx={{ width: 40, height: 40, background: '#02579A' }}>{user.firstName.charAt(0)}</Avatar> 
          {user.firstName} {user.lastName}
        </MenuItem>
        <Divider />
        <MenuItem sx={{ margin: '10px'}} onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" style={{ marginRight: '23px'}} />
          </ListItemIcon>
          Add another account
        </MenuItem>
        {user.authGoogle ? (
                        <GoogleLogout
                          clientId={GoogleClientID}
                          buttonText='Logout'
                          onLogoutSuccess={onSuccess}
                          render={renderProps => (
                            <MenuItem sx={{ margin: '10px',}} onClick={renderProps.onClick}>
                                <ListItemIcon>
                                    <Logout fontSize="small" style={{ marginRight: '23px'}} />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                          )}
                        />
                      ) : (
                        <MenuItem sx={{ margin: '10px',}} onClick={handleLogout}>
                            <ListItemIcon>
                                <Logout fontSize="small" style={{ marginRight: '23px'}} />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                      )}
      </Menu>
    </React.Fragment>
  );
}