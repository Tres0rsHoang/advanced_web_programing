import React from 'react'
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import { Box, Divider, Tab, Tabs, Typography } from '@mui/material';
import MiniDrawer from '../../../components/Drawer';
import TeacherGradeTable from '../../../components/TeacherGradetable';
import GradeStructure from '../../../components/GradeStructure';

export default function TeacherGrade() {

    return (
        <React.Fragment>
            <CssBaseline />
            <MiniDrawer>
                <Tabs
                    aria-label="nav tabs example"
                    role="navigation"
                    value= {2}
                >
                    <Tab label="Stream" href='/teacher/classDetail/stream' sx={{ml: '20px'}} />
                    <Tab label="People" href='/teacher/classDetail/people' />
                    <Tab label="Grades" href='/teacher/classDetail/grade' />
                    <Tab label="Grade Reviews" href='/teacher/classDetail/gradeReview' />
                </Tabs>
                <Divider />
                <Box sx={{margin: '40px'}}>
                    <Typography sx={{mb: '20px', fontWeight: 'bold'}}>
                        Grade Structure
                    </Typography>
                    <GradeStructure />
                    <Divider sx={{margin: '40px 0'}}/>
                    <Typography sx={{mb: '20px', fontWeight: 'bold'}}>
                        Grade Management
                    </Typography>
                    <TeacherGradeTable />
                </Box>
            </MiniDrawer>
        </React.Fragment>
    );
}