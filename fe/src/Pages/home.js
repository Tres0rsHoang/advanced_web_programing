import { Box, Grid } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCurrentUserApi } from '../api/profileService';
import MiniDrawer from '../components/Drawer';
import StudentClassCard from '../components/StudentClassCard';
import TeacherClassCard from '../components/TeacherClassCard';

export default function Home() {

  const [teachingInfo, setTeachingInfo] = useState([]);
  const [enrolledInfo, setEnrolledInfo] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let response = await getCurrentUserApi();
      console.log(response);
      if(response.data) {
        setTeachingInfo(response.data.is_teacher_classes);
        setEnrolledInfo(response.data.is_student_classes);
      }
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