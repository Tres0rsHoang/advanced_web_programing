import React, { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import MiniDrawer from '../components/Drawer';
import { Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import StudentClassCard from '../components/StudentClassCard';
import TeacherClassCard from '../components/TeacherClassCard';
import { getCurrentUserApi } from '../api/profileService';

export default function Home() {
  const user = useSelector(state => state.user.account);

  const [teachingInfo, setTeachingInfo] = useState([]);
  const [enrolledInfo, setEnrolledInfo] = useState([]);

  const navigate = useNavigate();
  
  useEffect(() => {
    if(user && user.auth === false){
        navigate('/login');
    }
  }, [user]);

  useEffect(() => {
    async function fetchData(){
      let response = await getCurrentUserApi();
      setTeachingInfo(response.data.is_teacher_classes);
      setEnrolledInfo(response.data.is_student_classes);
    }
    fetchData();
  }, [])

  return (
    <React.Fragment>
      <CssBaseline />
      <MiniDrawer>
      <Box sx={{margin: '20px', ml: '30px'}}>
        <Grid container spacing={3} >
          {teachingInfo.map(element => 
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <TeacherClassCard classInfo={element} />
            </Grid>)
          }
          {enrolledInfo.map(element => 
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <StudentClassCard classInfo={element} />
            </Grid>)
          }
        </Grid>
      </Box>
      </MiniDrawer>
    </React.Fragment>
  )
}