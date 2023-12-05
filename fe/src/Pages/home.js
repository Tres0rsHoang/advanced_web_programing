import React from 'react'
import { Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';

const Home = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Typography variant='h5' sx={{ml: '30px', mt: '100px', fontWeight: 'bold'}}>Home Page</Typography>
    </React.Fragment>
  )
}

export default Home;