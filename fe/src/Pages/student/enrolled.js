import { Box, Grid } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import React, { useEffect, useState } from 'react';
import { getCurrentUserApi } from '../../api/profileService';
import MiniDrawer from '../../components/Drawer';
import StudentClassCard from '../../components/StudentClassCard';

export default function Enrolled() {
  const [classInfo, setClassInfo] = useState([]);

  useEffect(() => {
    async function fetchData(){
      let response = await getCurrentUserApi();
      setClassInfo(response.data.is_student_classes)
    }
    fetchData();
  }, [])

  return (
    <React.Fragment>
      <CssBaseline />
      <MiniDrawer>
      <Box sx={{margin: '20px', ml: '30px'}}>
        <Grid container spacing={3} >
          {classInfo.map(element => 
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