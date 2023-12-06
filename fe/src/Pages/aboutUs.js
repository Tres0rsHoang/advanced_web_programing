import { Typography } from '@mui/material';
import React from 'react'
import NavBar from '../components/NavBar';
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';

const AboutUs = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar />
      <Typography variant='h5' sx={{ml: '30px', mt: '100px', fontWeight: 'bold'}}>About Us</Typography>
    </React.Fragment>
  )
}

export default AboutUs;