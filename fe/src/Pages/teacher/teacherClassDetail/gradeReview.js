import React from 'react'
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import {  Divider, Tab, Tabs } from '@mui/material';
import MiniDrawer from '../../../components/Drawer';

export default function TeacherGradeReview() {

    return (
        <React.Fragment>
            <CssBaseline />
            <MiniDrawer>
                <Tabs
                    aria-label="nav tabs example"
                    role="navigation"
                    value= {3}
                >
                    <Tab label="Stream" href='/teacher/classDetail/stream' sx={{ml: '20px'}} />
                    <Tab label="People" href='/teacher/classDetail/people' />
                    <Tab label="Grades" href='/teacher/classDetail/grade' />
                    <Tab label="Grade Reviews" href='/teacher/classDetail/gradeReview' />
                </Tabs>
                <Divider />
            </MiniDrawer>
        </React.Fragment>
    );
}