import React, { useContext, useState } from 'react';
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
import { UserContext } from '../context/userContext';
import { GoogleLogout } from 'react-google-login';

export default function Drawer() {
  const [state, setState] = useState(false);
  const navigate = useNavigate();

  const { user, logout, ggLogout } = useContext(UserContext);

  const GoogleClientID = '355691189679-g1bqbv7ar8r0bcii90alovankquv19vu.apps.googleusercontent.com';

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
    if (user.auth) {
      logout();
      navigate('/');
    }
  }

  const onSuccess = () => {
    if (user.auth) {
      ggLogout();
      navigate('/');
    }
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
      {user && user.auth ? (
        <>
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
       <Divider />
       <List sx={{ mt: '20px' }}>
       {user.auth && user.authGoogle ? (
         <GoogleLogout
           clientId={GoogleClientID}
           buttonText='Logout'
           onLogoutSuccess={onSuccess}
           render={renderProps => (
             <ListItem key='Logout' component={Link} onClick={renderProps.onClick} disablePadding  sx={{ color: 'black'}}>
               <ListItemButton>
                 <ListItemIcon>
                   {iconMapping['Logout']}
                 </ListItemIcon>
                 <ListItemText primary={'Logout'} />
               </ListItemButton>
             </ListItem>
           )}
         />
         ) : (
             <ListItem key='Logout' component={Link} disablePadding onClick={handleLogout} sx={{ color: 'black'}}>
               <ListItemButton>
                 <ListItemIcon>
                   {iconMapping['Logout']}
                 </ListItemIcon>
                 <ListItemText primary={'Logout'} />
               </ListItemButton>
             </ListItem>
         )}
       </List>
        </>
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