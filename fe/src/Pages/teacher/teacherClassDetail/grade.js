import React from 'react'
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import { Box, Divider, Tab, Tabs, Typography } from '@mui/material';
import MiniDrawer from '../../../components/Drawer';
import TeacherGradeTable from '../../../components/TeacherGradetable';
import GradeStructure from '../../../components/GradeStructure';
import { useSearchParams } from 'react-router-dom';

export default function TeacherGrade() {
    const [searchParams, setSearchParams] = useSearchParams();
    const classId = searchParams.get("classId");

    return (
        <React.Fragment>
            <CssBaseline />
            <MiniDrawer>
                <Tabs
                    aria-label="nav tabs example"
                    role="navigation"
                    value= {2}
                >
                    <Tab label="Stream" href={`/teacher/classDetail/stream?classId=${classId}`} sx={{ml: '20px'}} />
                    <Tab label="People" href={`/teacher/classDetail/people?classId=${classId}`} />
                    <Tab label="Grades" href={`/teacher/classDetail/grade?classId=${classId}`} />
                    <Tab label="Grade Reviews" href={`/teacher/classDetail/gradeReview?classId=${classId}`} />
                </Tabs>
                <Divider />
                <Box sx={{margin: '40px'}}>
                    <Typography sx={{mb: '20px', fontWeight: 'bold'}}>
                        Grade Structure
                    </Typography>
                    <GradeStructure classId={classId}/>
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