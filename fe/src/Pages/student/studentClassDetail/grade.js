import React from 'react'
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import { Box, Divider, Tab, Tabs } from '@mui/material';
import MiniDrawer from '../../../components/Drawer';
import StudentGradeTable from '../../../components/StudentGradeTable';
import GradeRequest from '../../../components/GradeRequest';
import GradeReviewDetail from '../../../components/GradeReviewDetail';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function StudentGrade() {
    const [searchParams, setSearchParams] = useSearchParams();
    const classId = searchParams.get("classId");

    const user = useSelector(state => state.user.account);

    return (
        <React.Fragment>
            <CssBaseline />
            <MiniDrawer>
                <Tabs
                    aria-label="nav tabs example"
                    role="navigation"
                    value= {2}
                >
                    <Tab label="Stream" href={`/student/classDetail/stream?classId=${classId}`} sx={{ml: '20px'}} />
                    <Tab label="People" href={`/student/classDetail/people?classId=${classId}`} />
                    <Tab label="Grades" href={`/student/classDetail/grade?classId=${classId}`} />
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