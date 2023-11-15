import React, { useState } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AccountCircle, ExitToApp, Home, Inventory, ListAlt, Menu, Person, PersonAdd, SupervisorAccount } from '@mui/icons-material';
import { Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const LOGOUT_URL ='/logout';

export default function Drawer() {
  const [state, setState] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState(open);
  };

  const handleLogout = () => {
    if (user) {
      axios.get(LOGOUT_URL, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      }); 
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
    }
    
    navigate('/');
  }

  const iconMapping = {
    'Home': <Home />,
    'Landing': <ListAlt />,
    'Products': <Inventory />,
    'About Us': <SupervisorAccount />,
    'Login': <AccountCircle />,
    'Sign Up': <PersonAdd />,
    'Logout': <ExitToApp />,
    'Profile': <Person />
  };

  const urlMapping = {
    'Home': '/',
    'Landing': '/landing',
    'Products': '/products',
    'About Us': '/aboutUs',
    'Login': '/login',
    'Sign Up': '/signUp',
    'Logout': '/logout',
    'Profile': '/profile'
  }

  const list = () => (
    <Box
      sx={{width: 230, ml: '20px', mr: '20px'}}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <Typography 
            component="h1" 
            variant="h6"
            sx={{ m: '20px', color: '#063970', fontWeight: 'bold'}}
        >
            APP NAME
        </Typography>
        <Divider />
        {['Home', 'Landing', 'Products', 'About Us'].map((text) => (
          <ListItem key={text} component={Link} disablePadding href={urlMapping[text]} sx={{ color: 'black'}}>
            <ListItemButton>
              <ListItemIcon>
                 {iconMapping[text]}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {user ? (
        <List>
        {['Profile'].map((text) => (
          <ListItem key={text} component={Link} disablePadding href={urlMapping[text]} sx={{ color: 'black'}}>
            <ListItemButton>
              <ListItemIcon>
                {iconMapping[text]}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      ) : (
        <List>
          {['Login', 'Sign Up'].map((text) => (
            <ListItem key={text} component={Link} disablePadding href={urlMapping[text]} sx={{ color: 'black'}}>
              <ListItemButton>
                <ListItemIcon>
                  {iconMapping[text]}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
      <Divider />
      <List sx={{ mt: '20px' }}>
        {['Logout'].map((text) => (
          <ListItem key={text} component={Link} disablePadding onClick={handleLogout} sx={{ color: 'black'}}>
            <ListItemButton>
              <ListItemIcon>
                {iconMapping[text]}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
    <React.Fragment>
        <Button onClick={toggleDrawer(true)}>
            <Menu/>
        </Button>
        <SwipeableDrawer
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        >
        {list()}
        </SwipeableDrawer>
    </React.Fragment>
    </div>
  );
}