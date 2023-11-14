import { Typography } from '@mui/material'
import React from 'react'
import NavBar from '../NavBar'

const Products = () => {
  return (
    <div>
        <NavBar />
        <Typography variant='h5' sx={{ml: '30px', mt: '100px', fontWeight: 'bold'}}>Products Page</Typography>
    </div>
  )
}

export default Products