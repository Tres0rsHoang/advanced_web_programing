import { Typography } from '@mui/material'
import React from 'react'
import NavBar from '../components/NavBar'
import CssBaseline from '@mui/material/CssBaseline/CssBaseline'

const Products = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar />
      <Typography variant='h5' sx={{ml: '30px', mt: '100px', fontWeight: 'bold'}}>Products Page</Typography>
    </React.Fragment>
  )
}

export default Products