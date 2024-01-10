import { Box, Grid } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getCurrentUserApi } from '../api/profileService';
import MiniDrawer from '../components/Drawer';
import StudentClassCard from '../components/StudentClassCard';
import TeacherClassCard from '../components/TeacherClassCard';

export default function Home() {
  const [teachingInfo, setTeachingInfo] = useState([]);
  const [enrolledInfo, setEnrolledInfo] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        var response = await getCurrentUserApi();
        setTeachingInfo(response.data.is_teacher_classes);
        setEnrolledInfo(response.data.is_student_classes);
      }
      catch(err){
        toast.error("Server not responding...");
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