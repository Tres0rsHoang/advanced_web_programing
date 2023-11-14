import React from 'react'
import { Typography } from '@mui/material';
import NavBar from '../NavBar';

const Home = () => {
  return (
    <div>
      <NavBar />
      <Typography variant='h5' sx={{ml: '30px', mt: '100px', fontWeight: 'bold'}}>Home Page</Typography>
    </div>
  )
}

export default Home;