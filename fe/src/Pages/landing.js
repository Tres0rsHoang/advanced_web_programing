import React from 'react'
import { Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';

const Landing = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Typography variant='h5' sx={{ml: '30px', mt: '100px', fontWeight: 'bold'}}>Landing Page</Typography>
    </React.Fragment>
  )
}

export default Landing;
