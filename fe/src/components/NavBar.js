import { AppBar, Box, Button,Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect } from 'react'
import Drawer from './Drawer';
import AccountMenu from './AccountMenu';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  const user = useSelector(state => state.user.account);

  const navigate = useNavigate();
  
  useEffect(() => {
    if(user && user.auth === false){
        navigate('/');
    }
  }, [user]);

  return (<>
    { (window.location.pathname !== '/login' && window.location.pathname !== '/signUp' ) &&
      <>
        <React.Fragment>
          <AppBar sx={{ background: "#063970", padding: '8px 0 8px 0'}}>
            { 
              isMatch? (
                  <Box 
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '15px'}}
                  >
                    <Typography variant="h6" sx={{ ml: '20px', mr: '50px', fontWeight: 'bold'}}>CLASSROOM</Typography>
                    <Drawer />
                  </Box>
              ) : (
                <Toolbar>
                  <Drawer />
                  <Typography variant="h6" sx={{ ml: '20px', mr: '50px', fontWeight: 'bold'}}>CLASSROOM</Typography>
                  {user && user.auth ? (
                    <Box sx={{ marginLeft: "auto" }}>
                      <AccountMenu />
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