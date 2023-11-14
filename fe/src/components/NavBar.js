import { AppBar, Box, Button, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react'
import Drawer from './Drawer';

const NavBar = () => {
  const [value, setValue] = useState();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  return (
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
              <Tabs 
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
              </Tabs>

              <Button sx={{ marginLeft: "auto" }} variant='contained' href='/login'>Login{" "}</Button>
              <Button sx={{ marginLeft: "10px" }} variant='contained' href='/signUp'>Sign Up{" "}</Button>
            </Toolbar>
          )
        }
      </AppBar>
    </React.Fragment>
  )
}

export default NavBar;