import React from 'react'
import { Typography } from '@mui/material';
import NavBar from '../NavBar';
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';

const Landing = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar />
      <Typography variant='h5' sx={{ml: '30px', mt: '100px', fontWeight: 'bold'}}>Landing Page</Typography>
    </React.Fragment>
  )
}

export default Landing;
