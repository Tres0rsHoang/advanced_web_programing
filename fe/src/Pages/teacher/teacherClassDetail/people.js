import React, { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import { Avatar, Box, Divider, Tab, Tabs, Typography, useMediaQuery } from '@mui/material';
import MiniDrawer from '../../../components/Drawer';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import InviteTeacher from '../../../components/InviteTeacher';
import InviteStudent from '../../../components/InviteStudent';
import { classDetailsApi } from '../../../api/classService';
import { useSearchParams } from 'react-router-dom';

export default function TeacherPeople() {
    const theme = useTheme();
    const isMatch1 = useMediaQuery(theme.breakpoints.down('xl'));
    const isMatch2 = useMediaQuery(theme.breakpoints.down('lg'));

    const [searchParams, setSearchParams] = useSearchParams();
    const classId = searchParams.get("classId");

    const [classDetails, setClassDetails] = useState({});

    useEffect(() => {
        async function fetchData() {
        let response = await classDetailsApi(classId);
        setClassDetails(response.data);
        }
        fetchData();
    }, []);

    return (
        <React.Fragment>
            <CssBaseline />
            <MiniDrawer>
            <Tabs aria-label="nav tabs example" role="navigation" value={1}>
                <Tab label="Stream" href={`/teacher/classDetail/stream?classId=${classId}`} sx={{ml: '20px'}} />
                <Tab label="People" href={`/teacher/classDetail/people?classId=${classId}`} />
                <Tab label="Grades" href={`/teacher/classDetail/grade?classId=${classId}`} />
                <Tab label="Grade Reviews" href={`/teacher/classDetail/gradeReview?classId=${classId}`} />
            </Tabs>
                <Divider />
                { 
                    isMatch1? (
                        <>
                        {
                            isMatch2? (
                                <Box sx={{margin: '30px 50px', minWidth: '350px'}}>
                                    <Box sx={{mb: '50px'}}>
                                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 20px'}}>
                                            <Typography gutterBottom variant="h4" component="div" sx={{ color: '#0C8590'}}>
                                                Teachers
                                            </Typography>
                                            <InviteTeacher classCode={classDetails.class_code} />
                                        </Box>
                                        <Divider sx={{backgroundColor: '#0C8590'}} />
                                        {classDetails.teacher_list && classDetails.teacher_list.map(element => 
                                            <>
                                            <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px'}}>
                                                <Avatar src={element.image_url} sx={{margin: '20px 20px 20px 50px', width: '35px', height: '35px', backgroundColor: '#0C8590'}}>
                                                    {element.full_name.charAt(0)}
                                                </Avatar> 
                                                {element.full_name}
                                            </Typography>
                                            <Divider />
                                            </>)
                                        }
                                    </Box>

                                    <Box>
                                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 20px'}}>
                                            <Typography gutterBottom variant="h4" component="div" sx={{ color: '#0C8590'}}>
                                                Students
                                            </Typography>
                                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                                                <Typography component="div" sx={{ color: '#0C8590', mt: '5px', mr: '20px'}}>
                                                    {classDetails.student_list ? classDetails.student_list.length : 0} students
                                                </Typography>
                                                <InviteStudent classCode={classDetails.class_code}/>
                                            </Box>
                                        </Box>
                                        <Divider sx={{backgroundColor: '#0C8590'}} />
                                        {classDetails.student_list && classDetails.student_list.map(element => 
                                            <>
                                            <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px'}}>
                                                <Avatar src={element.image_url} sx={{margin: '20px 20px 20px 50px', width: '35px', height: '35px', backgroundColor: '#0C8590'}}>
                                                    {element.full_name.charAt(0)}
                                                </Avatar> 
                                                {element.full_name}
                                            </Typography>
                                            <Divider />
                                            </>)
                                        }
                                    </Box>
                                </Box>
                            ) : (
                                <Box sx={{margin: '30px 150px', minWidth: '350px'}}>
                                    <Box sx={{mb: '50px'}}>
                                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 20px'}}>
                                            <Typography gutterBottom variant="h4" component="div" sx={{ color: '#0C8590'}}>
                                                Teachers
                                            </Typography>
                                            <InviteTeacher classCode={classDetails.class_code}/>
                                        </Box>
                                        <Divider sx={{backgroundColor: '#0C8590'}} />
                                        {classDetails.teacher_list && classDetails.teacher_list.map(element => 
                                            <>
                                            <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px'}}>
                                                <Avatar src={element.image_url} sx={{margin: '20px 20px 20px 50px', width: '35px', height: '35px', backgroundColor: '#0C8590'}}>
                                                    {element.full_name.charAt(0)}
                                                </Avatar> 
                                                {element.full_name}
                                            </Typography>
                                            <Divider />
                                            </>)
                                        }
                                    </Box>

                                    <Box>
                                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 20px'}}>
                                            <Typography gutterBottom variant="h4" component="div" sx={{ color: '#0C8590'}}>
                                                Students
                                            </Typography>
                                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                                                <Typography component="div" sx={{ color: '#0C8590', mt: '5px', mr: '20px'}}>
                                                    {classDetails.student_list ? classDetails.student_list.length : 0} students
                                                </Typography>
                                                <InviteStudent classCode={classDetails.class_code}/>
                                            </Box>
                                        </Box>
                                        <Divider sx={{backgroundColor: '#0C8590'}} />
                                        {classDetails.student_list && classDetails.student_list.map(element => 
                                            <>
                                            <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px'}}>
                                                <Avatar src={element.image_url} sx={{margin: '20px 20px 20px 50px', width: '35px', height: '35px', backgroundColor: '#0C8590'}}>
                                                    {element.full_name.charAt(0)}
                                                </Avatar> 
                                                {element.full_name}
                                            </Typography>
                                            <Divider />
                                            </>)
                                        }
                                    </Box>
                                </Box>
                            )
                        }
                        </>
                        
                    ) : (
                        <Box sx={{margin: '30px 400px', minWidth: '650px'}}>
                            <Box sx={{mb: '50px'}}>
                                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 20px'}}>
                                    <Typography gutterBottom variant="h4" component="div" sx={{ color: '#0C8590'}}>
                                        Teachers
                                    </Typography>
                                    <InviteTeacher classCode={classDetails.class_code} />
                                </Box>
                                <Divider sx={{backgroundColor: '#0C8590'}} />
                                {classDetails.teacher_list && classDetails.teacher_list.map(element => 
                                    <>
                                    <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px'}}>
                                        <Avatar src={element.image_url} sx={{margin: '20px 20px 20px 50px', width: '35px', height: '35px', backgroundColor: '#0C8590'}}>
                                            {element.full_name.charAt(0)}
                                        </Avatar> 
                                        {element.full_name}
                                    </Typography>
                                    <Divider />
                                    </>)
                                }
                            </Box>

                            <Box>
                                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 20px'}}>
                                    <Typography gutterBottom variant="h4" component="div" sx={{ color: '#0C8590'}}>
                                        Students
                                    </Typography>
                                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                                        <Typography component="div" sx={{ color: '#0C8590', mt: '5px', mr: '20px'}}>
                                            {classDetails.student_list ? classDetails.student_list.length : 0} students
                                        </Typography>
                                        <InviteStudent classCode={classDetails.class_code}/>
                                    </Box>
                                </Box>
                                <Divider sx={{backgroundColor: '#0C8590'}} />
                                {classDetails.student_list && classDetails.student_list.map(element => 
                                    <>
                                    <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px'}}>
                                        <Avatar src={element.image_url} sx={{margin: '20px 20px 20px 50px', width: '35px', height: '35px', backgroundColor: '#0C8590'}}>
                                            {element.full_name.charAt(0)}
                                        </Avatar> 
                                        {element.full_name}
                                    </Typography>
                                    <Divider />
                                    </>)
                                }
                            </Box>
                        </Box>
                    )
                }
            </MiniDrawer>
        </React.Fragment>
    );
}