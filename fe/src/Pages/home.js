import React, { useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import MiniDrawer from '../components/Drawer';
import { Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import StudentClassCard from '../components/StudentClassCard';
import TeacherClassCard from '../components/TeacherClassCard';

export default function Home() {
  const user = useSelector(state => state.user.account);

  const navigate = useNavigate();
  
  useEffect(() => {
    if(user && user.auth === false){
        navigate('/login');
    }
  }, [user]);

  return (
    <React.Fragment>
      <CssBaseline />
      <MiniDrawer>
      <Box sx={{margin: '20px', ml: '30px'}}>
        {/* <Grid container spacing={3} >
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                <TeacherClassCard />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                <TeacherClassCard />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                <TeacherClassCard />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                <TeacherClassCard />
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
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                <StudentClassCard />
            </Grid>
        </Grid> */}
      </Box>
      </MiniDrawer>
    </React.Fragment>
  )
}