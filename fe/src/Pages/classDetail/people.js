import React from 'react'
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import { Avatar, Box, Divider, Tab, Tabs, Typography, useMediaQuery } from '@mui/material';
import MiniDrawer from '../../components/Drawer';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';

export default function People() {
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
                    <Tab label="Stream" href='/classDetail/stream' sx={{ml: '20px'}} />
                    <Tab label="People" href='/classDetail/people' />
                    <Tab label="Grade" href='/classDetail/grade' />
                </Tabs>
                <Divider />
                { 
                    isMatch1? (
                        <>
                        {
                            isMatch2? (
                                <Box sx={{margin: '30px 50px', minWidth: '350px'}}>
                                    <Box sx={{mb: '50px'}}>
                                        <Typography gutterBottom variant="h4" component="div" sx={{ color: '#02579A', ml: '20px' }}>
                                            Teachers
                                        </Typography>
                                        <Divider sx={{backgroundColor: '#02579A'}} />
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
                                            <Typography gutterBottom variant="h4" component="div" sx={{ color: '#02579A', ml: '20px' }}>
                                                Students
                                            </Typography>
                                            <Typography component="div" sx={{ color: '#02579A', mr: '20px'}}>
                                                78 students
                                            </Typography>
                                        </Box>
                                        <Divider sx={{backgroundColor: '#02579A'}} />
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
                                        <Typography gutterBottom variant="h4" component="div" sx={{ color: '#02579A', ml: '20px' }}>
                                            Teachers
                                        </Typography>
                                        <Divider sx={{backgroundColor: '#02579A'}} />
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
                                            <Typography gutterBottom variant="h4" component="div" sx={{ color: '#02579A', ml: '20px' }}>
                                                Students
                                            </Typography>
                                            <Typography component="div" sx={{ color: '#02579A', mr: '20px'}}>
                                                78 students
                                            </Typography>
                                        </Box>
                                        <Divider sx={{backgroundColor: '#02579A'}} />
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
                                <Typography gutterBottom variant="h4" component="div" sx={{ color: '#02579A', ml: '20px' }}>
                                    Teachers
                                </Typography>
                                <Divider sx={{backgroundColor: '#02579A'}} />
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
                                    <Typography gutterBottom variant="h4" component="div" sx={{ color: '#02579A', ml: '20px' }}>
                                        Students
                                    </Typography>
                                    <Typography component="div" sx={{ color: '#02579A', mr: '20px'}}>
                                        78 students
                                    </Typography>
                                </Box>
                                <Divider sx={{backgroundColor: '#02579A'}} />
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