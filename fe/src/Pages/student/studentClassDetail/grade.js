import { Box, Divider, Tab, Tabs } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getGradeApi } from '../../../api/profileService';
import MiniDrawer from '../../../components/Drawer';
import GradeRequest from '../../../components/GradeRequest';
import GradeReviewDetail from '../../../components/GradeReviewDetail';
import StudentGradeTable from '../../../components/StudentGradeTable';

export default function StudentGrade() {
    const [searchParams, setSearchParams] = useSearchParams();
    const classId = searchParams.get("classId");

    const [gradeInfo, setGradeInfo] = useState({});

    useEffect(() => {
        async function fetchData() {
        let response = await getGradeApi(classId);
            setGradeInfo(response.data);
        }
        fetchData();
        
    }, []);

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
                    <StudentGradeTable gradeInfo = {gradeInfo} />
                    <GradeRequest />
                    <Divider sx={{margin: '30px 0'}}/>
                    <GradeReviewDetail />
                </Box>
            </MiniDrawer>
        </React.Fragment>
    );
}