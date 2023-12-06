import { AppBar, Box, Button, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useContext, useState } from 'react'
import Drawer from './Drawer';
import { useNavigate } from 'react-router-dom';
import { logoutApi } from '../api/authService';
import { UserContext } from '../context/userContext';

const NavBar = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  
  const navigate = useNavigate();

  const { user, logout } = useContext(UserContext);

  const handleLogout = async () => {
    if (user.auth) {
      logout();
      navigate('/');
    }
  }

  return (<>
    { (window.location.pathname !== '/login' && window.location.pathname !== '/signUp' ) &&
      <>
        <React.Fragment>
          <AppBar sx={{ background: "#063970"}}>
            { 
              isMatch? (
                  <Box 
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '15px'}}
                  >
                    <Typography sx={{ ml: '20px', mr: '50px', fontWeight: 'bold'}}>APP_NAME</Typography>
                    <Drawer />
                  </Box>
              ) : (
                <Toolbar>
                  <Drawer />
                  <Typography sx={{ ml: '20px', mr: '50px', fontWeight: 'bold'}}>APP_NAME</Typography>
                  {/* <Tabs 
                    textColor='inherit' 
                    value={value} 
                    onChange={(e, value) => setValue(value)} 
                    TabIndicatorProps={{
                      style: {
                        backgroundColor: "white"
                      }
                    }}
                  >
                    <Tab label='Home'/>
                    <Tab label='About' />
                    <Tab label='Services' />
                    <Tab label='Contact' />
                  </Tabs> */}
                  
                  {user && user.auth === true ? (
                    <Box sx={{ marginLeft: "auto" }}>
                      <Typography sx={{ ml: 'auto'}} variant='contained' >Hello, {user.email}</Typography>
                      <Button sx={{ marginLeft: "30px" }} variant='contained' onClick={handleLogout}>Logout{" "}</Button>
                    </Box>
                  ) : (
                    <Box sx={{ marginLeft: "auto" }}>
                      <Button sx={{ marginLeft: "auto" }} variant='contained' href='/login'>Login{" "}</Button>
                      <Button sx={{ marginLeft: "10px" }} variant='contained' href='/signUp'>Sign Up{" "}</Button>
                    </Box>
                  )}
                </Toolbar>
              )
            }
          </AppBar>
        </React.Fragment>
      </>
    }
    </>)
}

export default NavBar;