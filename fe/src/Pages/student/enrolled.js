import React from 'react'
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import MiniDrawer from '../../components/Drawer';
import { Box, Grid } from '@mui/material';
import StudentClassCard from '../../components/studentClassCard';

export default function Enrolled() {

  return (
    <React.Fragment>
      <CssBaseline />
      <MiniDrawer>
      <Box sx={{margin: '20px', ml: '30px'}}>
        <Grid container spacing={3} >
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                <StudentClassCard />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                <StudentClassCard />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                <StudentClassCard />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                <StudentClassCard />
            </Grid>
        </Grid>
      </Box>
      </MiniDrawer>
    </React.Fragment>
  )
}