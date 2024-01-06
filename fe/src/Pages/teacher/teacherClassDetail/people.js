import React from 'react'
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import { Avatar, Box, Divider, IconButton, Tab, Tabs, Typography, useMediaQuery } from '@mui/material';
import MiniDrawer from '../../../components/Drawer';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { PersonAddAlt1Outlined } from '@mui/icons-material';

export default function TeacherPeople() {
    const theme = useTheme();
    const isMatch1 = useMediaQuery(theme.breakpoints.down('xl'));
    const isMatch2 = useMediaQuery(theme.breakpoints.down('lg'));

    const user = useSelector(state => state.user.account);

    return (
        <React.Fragment>
            <CssBaseline />
            <MiniDrawer>
                <Tabs
                    aria-label="nav tabs example"
                    role="navigation"
                    value= {1}
                >
                    <Tab label="Stream" href='/teacher/classDetail/stream' sx={{ml: '20px'}} />
                    <Tab label="People" href='/teacher/classDetail/people' />
                    <Tab label="Grades" href='/teacher/classDetail/grade' />
                    <Tab label="Grade Reviews" href='/teacher/classDetail/gradeReview' />
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
                                            <IconButton>
                                                <PersonAddAlt1Outlined sx={{color: '#0C8590', fontSize: '28px'}}/>
                                            </IconButton>
                                        </Box>
                                        <Divider sx={{backgroundColor: '#0C8590'}} />
                                        <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px'}}>
                                            <Avatar src={user.imageUrl} sx={{margin: '20px 20px 20px 50px', width: '35px', height: '35px'}} /> {user.firstName} {user.lastName}
                                        </Typography>
                                        <Divider />
                                        <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px'}}>
                                            <Avatar src={user.imageUrl} sx={{margin: '20px 20px 20px 50px', width: '35px', height: '35px'}} /> {user.firstName} {user.lastName}
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 20px'}}>
                                            <Typography gutterBottom variant="h4" component="div" sx={{ color: '#0C8590'}}>
                                                Students
                                            </Typography>
                                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                                                <Typography component="div" sx={{ color: '#0C8590', mt: '5px', mr: '20px'}}>
                                                    78 students
                                                </Typography>
                                                <IconButton>
                                                    <PersonAddAlt1Outlined sx={{color: '#0C8590', fontSize: '28px'}}/>
                                                </IconButton>
                                            </Box>
                                        </Box>
                                        <Divider sx={{backgroundColor: '#0C8590'}} />
                                        <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px'}}>
                                            <Avatar src={user.imageUrl} sx={{margin: '20px 20px 20px 50px', width: '35px', height: '35px'}} /> {user.firstName} {user.lastName}
                                        </Typography>
                                        <Divider />
                                        <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px'}}>
                                            <Avatar src={user.imageUrl} sx={{margin: '20px 20px 20px 50px', width: '35px', height: '35px'}} /> {user.firstName} {user.lastName}
                                        </Typography>
                                        <Divider />
                                        <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px'}}>
                                            <Avatar src={user.imageUrl} sx={{margin: '20px 20px 20px 50px', width: '35px', height: '35px'}} /> {user.firstName} {user.lastName}
                                        </Typography>
                                        <Divider />
                                        <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px'}}>
                                            <Avatar src={user.imageUrl} sx={{margin: '20px 20px 20px 50px', width: '35px', height: '35px'}} /> {user.firstName} {user.lastName}
                                        </Typography>
                                        <Divider />
                                        <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px'}}>
                                            <Avatar src={user.imageUrl} sx={{margin: '20px 20px 20px 50px', width: '35px', height: '35px'}} /> {user.firstName} {user.lastName}
                                        </Typography>
                                        <Divider />
                                        <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px'}}>
                                            <Avatar src={user.imageUrl} sx={{margin: '20px 20px 20px 50px', width: '35px', height: '35px'}} /> {user.firstName} {user.lastName}
                                        </Typography>
                                        <Divider />
                                    <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px'}}>
                                        <Avatar src={user.imageUrl} sx={{margin: '20px 20px 20px 50px', width: '35px', height: '35px'}} /> {user.firstName} {user.lastName}
                                    </Typography>
                                    </Box>
                                </Box>
                            ) : (
                                <Box sx={{margin: '30px 150px', minWidth: '350px'}}>
                                    <Box sx={{mb: '50px'}}>
                                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 20px'}}>
                                            <Typography gutterBottom variant="h4" component="div" sx={{ color: '#0C8590'}}>
                                                Teachers
                                            </Typography>
                                            <IconButton>
                                                <PersonAddAlt1Outlined sx={{color: '#0C8590', fontSize: '28px'}}/>
                                            </IconButton>
                                        </Box>
                                        <Divider sx={{backgroundColor: '#0C8590'}} />
                                        <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px'}}>
                                            <Avatar src={user.imageUrl} sx={{margin: '20px 20px 20px 50px', width: '35px', height: '35px'}} /> {user.firstName} {user.lastName}
                                        </Typography>
                                        <Divider />
                                        <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px'}}>
                                            <Avatar src={user.imageUrl} sx={{margin: '20px 20px 20px 50px', width: '35px', height: '35px'}} /> {user.firstName} {user.lastName}
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 20px'}}>
                                            <Typography gutterBottom variant="h4" component="div" sx={{ color: '#0C8590'}}>
                                                Students
                                            </Typography>
                                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                                                <Typography component="div" sx={{ color: '#0C8590', mt: '5px', mr: '20px'}}>
                                                    78 students
                                                </Typography>
                                                <IconButton>
                                                    <PersonAddAlt1Outlined sx={{color: '#0C8590', fontSize: '28px'}}/>
                                                </IconButton>
                                            </Box>
                                        </Box>
                                        <Divider sx={{backgroundColor: '#0C8590'}} />
                                        <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px'}}>
                                            <Avatar src={user.imageUrl} sx={{margin: '20px 20px 20px 50px', width: '35px', height: '35px'}} /> {user.firstName} {user.lastName}
                                        </Typography>
                                        <Divider />
                                        <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px'}}>
                                            <Avatar src={user.imageUrl} sx={{margin: '20px 20px 20px 50px', width: '35px', height: '35px'}} /> {user.firstName} {user.lastName}
                                        </Typography>
                                        <Divider />
                                        <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px'}}>
                                            <Avatar src={user.imageUrl} sx={{margin: '20px 20px 20px 50px', width: '35px', height: '35px'}} /> {user.firstName} {user.lastName}
                                        </Typography>
                                        <Divider />
                                        <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px'}}>
                                            <Avatar src={user.imageUrl} sx={{margin: '20px 20px 20px 50px', width: '35px', height: '35px'}} /> {user.firstName} {user.lastName}
                                        </Typography>
                                        <Divider />
                                        <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px'}}>
                                            <Avatar src={user.imageUrl} sx={{margin: '20px 20px 20px 50px', width: '35px', height: '35px'}} /> {user.firstName} {user.lastName}
                                        </Typography>
                                        <Divider />
                                        <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px'}}>
                                            <Avatar src={user.imageUrl} sx={{margin: '20px 20px 20px 50px', width: '35px', height: '35px'}} /> {user.firstName} {user.lastName}
                                        </Typography>
                                        <Divider />
                                    <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px'}}>
                                        <Avatar src={user.imageUrl} sx={{margin: '20px 20px 20px 50px', width: '35px', height: '35px'}} /> {user.firstName} {user.lastName}
                                    </Typography>
                                    </Box>
                                </Box>
                            )
                        }
                        </>
                        
                    ) : (
                        <Box sx={{margin: '30px 400px', minWidth: '650px'}}>
                            <Box sx={{mb: '50px'}}>
                                <Typography gutterBottom variant="h4" component="div" sx={{ color: '#0C8590', ml: '20px' }}>
                                    Teachers
                                </Typography>
                                <Divider sx={{backgroundColor: '#0C8590'}} />
                                <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px'}}>
                                    <Avatar src={user.imageUrl} sx={{margin: '20px 20px 20px 50px', width: '35px', height: '35px'}} /> {user.firstName} {user.lastName}
                                </Typography>
                                <Divider />
                                <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px'}}>
                                    <Avatar src={user.imageUrl} sx={{margin: '20px 20px 20px 50px', width: '35px', height: '35px'}} /> {user.firstName} {user.lastName}
                                </Typography>
                            </Box>

                            <Box>
                                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Typography gutterBottom variant="h4" component="div" sx={{ color: '#0C8590', ml: '20px' }}>
                                        Students
                                    </Typography>
                                    <Typography component="div" sx={{ color: '#0C8590', mr: '20px'}}>
                                        78 students
                                    </Typography>
                                </Box>
                                <Divider sx={{backgroundColor: '#0C8590'}} />
                                <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px'}}>
                                    <Avatar src={user.imageUrl} sx={{margin: '20px 20px 20px 50px', width: '35px', height: '35px'}} /> {user.firstName} {user.lastName}
                                </Typography>
                                <Divider />
                                <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px'}}>
                                    <Avatar src={user.imageUrl} sx={{margin: '20px 20px 20px 50px', width: '35px', height: '35px'}} /> {user.firstName} {user.lastName}
                                </Typography>
                                <Divider />
                                <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px'}}>
                                    <Avatar src={user.imageUrl} sx={{margin: '20px 20px 20px 50px', width: '35px', height: '35px'}} /> {user.firstName} {user.lastName}
                                </Typography>
                                <Divider />
                                <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px'}}>
                                    <Avatar src={user.imageUrl} sx={{margin: '20px 20px 20px 50px', width: '35px', height: '35px'}} /> {user.firstName} {user.lastName}
                                </Typography>
                                <Divider />
                                <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px'}}>
                                    <Avatar src={user.imageUrl} sx={{margin: '20px 20px 20px 50px', width: '35px', height: '35px'}} /> {user.firstName} {user.lastName}
                                </Typography>
                                <Divider />
                                <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px'}}>
                                    <Avatar src={user.imageUrl} sx={{margin: '20px 20px 20px 50px', width: '35px', height: '35px'}} /> {user.firstName} {user.lastName}
                                </Typography>
                                <Divider />
                            <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px'}}>
                                <Avatar src={user.imageUrl} sx={{margin: '20px 20px 20px 50px', width: '35px', height: '35px'}} /> {user.firstName} {user.lastName}
                            </Typography>
                            </Box>
                        </Box>
                    )
                }
            </MiniDrawer>
        </React.Fragment>
    );
}