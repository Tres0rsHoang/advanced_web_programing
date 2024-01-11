import React, { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import { Box, Divider, Tab, Tabs } from '@mui/material';
import MiniDrawer from '../../../components/Drawer';
import StudentGradeTable from '../../../components/StudentGradeTable';
import GradeRequest from '../../../components/GradeRequest';
import GradeReviewDetail from '../../../components/GradeReviewDetail';
import { useSearchParams } from 'react-router-dom';
import { getGradeApi } from '../../../api/profileService';
import ProfileMapStudent from '../../../components/ProfileMapStudent';

export default function StudentGrade() {
    const [searchParams, setSearchParams] = useSearchParams();
    const classId = searchParams.get("classId");

    const [gradeInfo, setGradeInfo] = useState({});

    useEffect(() => {
        async function fetchData() {
            if (classId !== undefined) {
                let response = await getGradeApi(classId);
                setGradeInfo(response.data);
            }
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
                    <StudentGradeTable gradeInfo = {gradeInfo} classId={classId} />
                    {gradeInfo.grade_list ? gradeInfo.grade_list.length > 0 ?  (
                        <Box sx={{display: 'flex', justifyContent: 'flex-end', margin: '20px 0'}}>
                            <ProfileMapStudent classId={classId} isMapping={gradeInfo.is_mapping} />
                            <GradeRequest gradeInfo={gradeInfo} />
                        </Box>
                    ) : (
                        <ProfileMapStudent classId={classId} isMapping={gradeInfo.is_mapping} />
                    ) : <ProfileMapStudent classId={classId} isMapping={gradeInfo.is_mapping} />}
                    <Divider sx={{margin: '30px 0'}}/>
                    <GradeReviewDetail />
                </Box>
            </MiniDrawer>
        </React.Fragment>
    );
}