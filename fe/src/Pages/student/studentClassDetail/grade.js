import React from 'react'
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import { Box, Divider, Tab, Tabs } from '@mui/material';
import MiniDrawer from '../../../components/Drawer';
import StudentGradeTable from '../../../components/StudentGradeTable';
import GradeRequest from '../../../components/GradeRequest';
import GradeReviewDetail from '../../../components/GradeReviewDetail';

export default function StudentGrade() {

    return (
        <React.Fragment>
            <CssBaseline />
            <MiniDrawer>
                <Tabs
                    aria-label="nav tabs example"
                    role="navigation"
                    value= {2}
                >
                    <Tab label="Stream" href='/student/classDetail/stream' sx={{ml: '20px'}} />
                    <Tab label="People" href='/student/classDetail/people' />
                    <Tab label="Grades" href='/student/classDetail/grade' />
                </Tabs>
                <Divider />
                <Box sx={{margin: '40px'}}>
                    <StudentGradeTable />
                    <GradeRequest />
                    <Divider sx={{margin: '30px 0'}}/>
                    <GradeReviewDetail />
                </Box>
            </MiniDrawer>
        </React.Fragment>
    );
}