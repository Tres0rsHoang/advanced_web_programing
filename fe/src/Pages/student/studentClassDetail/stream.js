import { ClassOutlined, MoreVert, SendOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Card, CardContent, CardHeader, Divider, Grid, IconButton, Tab, Tabs, TextField, Typography, useMediaQuery } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import { blue, grey } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import { default as React, default as React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { classDetailsApi } from '../../../api/classService';
import MiniDrawer from '../../../components/Drawer';

export default function StudentStream() {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('lg'));

    const user = useSelector(state => state.user.account);

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
                <Tabs
                    aria-label="nav tabs example"
                    role="navigation"
                    value= {0}
                >
                    <Tab label="Stream" href={`/student/classDetail/stream?classId=${classId}`} sx={{ml: '20px'}} />
                    <Tab label="People" href={`/student/classDetail/people?classId=${classId}`} />
                    <Tab label="Grades" href={`/student/classDetail/grade?classId=${classId}`} />
                </Tabs>
                <Divider />
                <Box sx={{margin: '30px 70px'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card 
                                sx={{backgroundImage: "url('https://www.gstatic.com/classroom/themes/img_sailing.jpg')",
                                backgroundSize: 'cover',
                                height: '250px',
                                display: 'flex',
                                alignItems: 'flex-end',
                                borderRadius: '15px'
                            }}
                            >
                                <CardContent sx={{ml: '20px'}}>
                                    <Typography gutterBottom variant="h4" component="div" sx={{color: 'white', fontWeight: 'bold'}}>
                                        {classDetails.name}
                                    </Typography>
                                    <Typography variant="h6" sx={{color: 'white'}}>
                                        {classDetails.subject}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        { 
                            isMatch? (
                                <Grid item md={12} lg={9}>
                                    <Card sx={{margin: '20px 20px 20px 0', border: 1, borderColor: 'grey.300', borderRadius: '10px', boxShadow: 3, color: grey[500], ":hover":{cursor: 'pointer', color: '#02579A'}}}>
                                        <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                                            <Avatar src={user.imageUrl} sx={{ width: 40, height: 40, background: blue[500], mr: '30px', ml: '10px', backgroundColor: '#02579A' }}>{user.firstName.charAt(0)}</Avatar>
                                            <Typography gutterBottom component="div" sx={{fontSize: '15px', margin: '10px 0', fontWeight: 500}}>
                                                Announce something to your class
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                    <Card sx={{margin: '20px 20px 20px 0', border: 1, borderColor: 'grey.300', boxShadow: 0, borderRadius: '10px', ":hover":{cursor: 'pointer', backgroundColor: '#e6f5fe'}}}>
                                        <CardHeader
                                            avatar={
                                            <Avatar sx={{ bgcolor: '#02579A', ml: '10px', mr: '5px', height: '50px', width: '50px' }} aria-label="recipe">
                                                <ClassOutlined />
                                            </Avatar>
                                            }
                                            action={
                                            <IconButton aria-label="settings">
                                                <MoreVert />
                                            </IconButton>
                                            }
                                            title={<Typography gutterBottom component="div" sx={{fontSize: '16px', fontWeight: 500, mt: '5px'}}>
                                                {classDetails.teacher_list ? classDetails.teacher_list[0].full_name : 'Teacher'} posted a new material: Final project submission (Deadline Jan 8 10pm)
                                            </Typography>}
                                            subheader={<Typography gutterBottom component="div" sx={{fontSize: '13px', fontWeight: 200}}>
                                                Dec 29
                                            </Typography>}
                                        />
                                    </Card>

                                    <Card sx={{margin: '20px 20px 20px 0', border: 1, borderColor: 'grey.300', boxShadow: 0, borderRadius: '10px', ":hover":{cursor: 'pointer', backgroundColor: '#e6f5fe'}}}>
                                        <CardHeader
                                            avatar={
                                            <Avatar sx={{ bgcolor: '#02579A', ml: '10px', mr: '5px', height: '50px', width: '50px' }} aria-label="recipe">
                                                <ClassOutlined />
                                            </Avatar>
                                            }
                                            action={
                                            <IconButton aria-label="settings">
                                                <MoreVert />
                                            </IconButton>
                                            }
                                            title={<Typography gutterBottom component="div" sx={{fontSize: '16px', fontWeight: 500, mt: '5px'}}>
                                                {classDetails.teacher_list ? classDetails.teacher_list[0].full_name : 'Teacher'} posted a new material: Final project submission (Deadline Jan 8 10pm)
                                            </Typography>}
                                            subheader={<Typography gutterBottom component="div" sx={{fontSize: '13px', fontWeight: 200}}>
                                                Dec 29
                                            </Typography>}
                                        />
                                        <Divider />
                                        <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                                            <Typography gutterBottom component="div" sx={{fontSize: '15px', margin: '10px 0 0 10px', fontWeight: 500}}>
                                                9 class comments
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                    
                                    <Card sx={{margin: '20px 20px 20px 0', border: 1, borderColor: 'grey.300', boxShadow: 0, borderRadius: '10px'}}>
                                        <CardHeader
                                            avatar={
                                            <Avatar sx={{ bgcolor: '#02579A', ml: '10px', mr: '5px', height: '50px', width: '50px' }} aria-label="recipe">
                                                {classDetails.teacher_list ? classDetails.teacher_list[0].full_name.charAt(0) : ''}
                                            </Avatar>
                                            }
                                            action={
                                            <IconButton aria-label="settings">
                                                <MoreVert />
                                            </IconButton>
                                            }
                                            title={<Typography gutterBottom component="div" sx={{fontSize: '16px', fontWeight: 500, mt: '5px'}}>
                                                {classDetails.teacher_list ? classDetails.teacher_list[0].full_name : 'Teacher'}
                                            </Typography>}
                                            subheader={<Typography gutterBottom component="div" sx={{fontSize: '13px', fontWeight: 200}}>
                                                Dec 29
                                            </Typography>}
                                        />
                                        <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                                            <Typography gutterBottom component="div" sx={{fontSize: '14px', fontWeight: 500, ml: '10px'}}>
                                                Is any team interested in earning additional points for the seminar? Kindly share your topic introduction on our Facebook group:&nbsp; 
                                                <a href='https://www.facebook.com/groups/908384604383645'>https://www.facebook.com/groups/908384604383645</a>.
                                            </Typography>
                                        </CardContent>
                                        <Divider />
                                        <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                                            <Avatar src={user.imageUrl} sx={{ width: 40, height: 40, bgcolor:'#02579A', mr: '30px', ml: '10px' }}>{user.firstName.charAt(0)}</Avatar>
                                            <TextField fullWidth placeholder='Add class comment...'
                                                InputProps={{
                                                    style: {
                                                    borderRadius: "40px",
                                                    fontSize: '14px',
                                                }
                                            }} />
                                            <IconButton>
                                                <SendOutlined sx={{ml: '10px'}}/>
                                            </IconButton>
                                        </CardContent>
                                    </Card>  
                                </Grid>
                            ) : (
                                <>
                                <Grid item md={0} lg={3}>
                                    <Card sx={{margin: '20px 20px 20px 0', border: 1, borderColor: 'grey.300', boxShadow: 0, borderRadius: '10px'}}>
                                        <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu4UxWpSg6PjTepJhmegG7Qzea86ordRC65Q&usqp=CAU' 
                                                    alt='meet'
                                                    style={{marginLeft: '10px',width: '30px', height: '30px', marginRight: '20px'}}
                                                />
                                                <Typography gutterBottom component="div" sx={{fontSize: '18px', mt: '5px'}}>
                                                    Meet
                                                </Typography>
                                            </Box>
                                            
                                            <IconButton>
                                                <MoreVert />
                                            </IconButton>
                                        </CardContent>
                                        <Button variant="contained" 
                                            sx={{width: '85%', 
                                            margin: ' 0 20px 20px 20px', 
                                            fontWeight: 'bold',
                                            backgroundColor: '#02579A'}}
                                        >
                                            Join
                                        </Button>
                                    </Card>
                                    <Card sx={{margin: '20px 20px 20px 0', border: 1, borderColor: 'grey.300', boxShadow: 0, borderRadius: '10px'}}>
                                        <CardContent>
                                            <Typography gutterBottom component="div" sx={{fontSize: '16px', margin: '10px 0', fontWeight: 500}}>
                                                Upcoming
                                            </Typography>
                                            <Typography gutterBottom component="div" sx={{fontSize: '14px', mt: '5px', fontWeight: 100}}>
                                                Woohoo, no work due soon!
                                            </Typography>
                                            <p align="right">
                                                <Button sx={{mb: '-20px'}}>
                                                    View all
                                                </Button>
                                            </p>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item md={12} lg={9}>
                                    <Card sx={{margin: '20px 20px 20px 0', border: 1, borderColor: 'grey.300', borderRadius: '10px', boxShadow: 3, color: grey[500], ":hover":{cursor: 'pointer', color: '#02579A'}}}>
                                        <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                                            <Avatar src={user.imageUrl} sx={{ width: 40, height: 40, background: blue[500], mr: '30px', ml: '10px', bgcolor:'#02579A' }}>{user.firstName.charAt(0)}</Avatar>
                                            <Typography gutterBottom component="div" sx={{fontSize: '15px', margin: '10px 0', fontWeight: 500}}>
                                                Announce something to your class
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                    <Card sx={{margin: '20px 20px 20px 0', border: 1, borderColor: 'grey.300', boxShadow: 0, borderRadius: '10px', ":hover":{cursor: 'pointer', backgroundColor: '#e6f5fe'}}}>
                                        <CardHeader
                                            avatar={
                                            <Avatar sx={{ bgcolor: '#02579A', ml: '10px', mr: '5px', height: '50px', width: '50px' }} aria-label="recipe">
                                                <ClassOutlined />
                                            </Avatar>
                                            }
                                            action={
                                            <IconButton aria-label="settings">
                                                <MoreVert />
                                            </IconButton>
                                            }
                                            title={<Typography gutterBottom component="div" sx={{fontSize: '16px', fontWeight: 500, mt: '5px'}}>
                                                {classDetails.teacher_list ? classDetails.teacher_list[0].full_name : 'Teacher'} posted a new material: Final project submission (Deadline Jan 8 10pm)
                                            </Typography>}
                                            subheader={<Typography gutterBottom component="div" sx={{fontSize: '13px', fontWeight: 200}}>
                                                Dec 29
                                            </Typography>}
                                        />
                                    </Card>

                                    <Card sx={{margin: '20px 20px 20px 0', border: 1, borderColor: 'grey.300', boxShadow: 0, borderRadius: '10px', ":hover":{cursor: 'pointer', backgroundColor: '#e6f5fe'}}}>
                                        <CardHeader
                                            avatar={
                                            <Avatar sx={{ bgcolor: '#02579A', ml: '10px', mr: '5px', height: '50px', width: '50px' }} aria-label="recipe">
                                                <ClassOutlined />
                                            </Avatar>
                                            }
                                            action={
                                            <IconButton aria-label="settings">
                                                <MoreVert />
                                            </IconButton>
                                            }
                                            title={<Typography gutterBottom component="div" sx={{fontSize: '16px', fontWeight: 500, mt: '5px'}}>
                                                {classDetails.teacher_list ? classDetails.teacher_list[0].full_name : 'Teacher'} posted a new material: Final project submission (Deadline Jan 8 10pm)
                                            </Typography>}
                                            subheader={<Typography gutterBottom component="div" sx={{fontSize: '13px', fontWeight: 200}}>
                                                Dec 29
                                            </Typography>}
                                        />
                                        <Divider />
                                        <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                                            <Typography gutterBottom component="div" sx={{fontSize: '15px', margin: '10px 0 0 10px', fontWeight: 500}}>
                                                9 class comments
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                    
                                    <Card sx={{margin: '20px 20px 20px 0', border: 1, borderColor: 'grey.300', boxShadow: 0, borderRadius: '10px'}}>
                                        <CardHeader
                                            avatar={
                                            <Avatar sx={{ bgcolor: '#02579A', ml: '10px', mr: '5px', height: '50px', width: '50px' }} aria-label="recipe">
                                                {classDetails.teacher_list ? classDetails.teacher_list[0].full_name.charAt(0) : ''}
                                            </Avatar>
                                            }
                                            action={
                                            <IconButton aria-label="settings">
                                                <MoreVert />
                                            </IconButton>
                                            }
                                            title={<Typography gutterBottom component="div" sx={{fontSize: '16px', fontWeight: 500, mt: '5px'}}>
                                                {classDetails.teacher_list ? classDetails.teacher_list[0].full_name : 'Teacher'}
                                            </Typography>}
                                            subheader={<Typography gutterBottom component="div" sx={{fontSize: '13px', fontWeight: 200}}>
                                                Dec 29
                                            </Typography>}
                                        />
                                        <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                                            <Typography gutterBottom component="div" sx={{fontSize: '14px', fontWeight: 500, ml: '10px'}}>
                                                Is any team interested in earning additional points for the seminar? Kindly share your topic introduction on our Facebook group:&nbsp; 
                                                <a href='https://www.facebook.com/groups/908384604383645'>https://www.facebook.com/groups/908384604383645</a>.
                                            </Typography>
                                        </CardContent>
                                        <Divider />
                                        <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                                            <Avatar src={user.imageUrl} sx={{ width: 40, height: 40, bgcolor:'#02579A', mr: '30px', ml: '10px' }}>{user.firstName.charAt(0)}</Avatar>
                                            <TextField fullWidth placeholder='Add class comment...'
                                                InputProps={{
                                                    style: {
                                                    borderRadius: "40px",
                                                    fontSize: '14px',
                                                }
                                            }} />
                                            <IconButton>
                                                <SendOutlined sx={{ml: '10px'}}/>
                                            </IconButton>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                </>
                            )
                        }   
                    </Grid>
                </Box>
            </MiniDrawer>
        </React.Fragment>
    );
}