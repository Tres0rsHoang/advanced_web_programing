import React from 'react'
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Tab, Tabs, Typography, useMediaQuery, useTheme } from '@mui/material';
import MiniDrawer from '../../../components/Drawer';
import { grey, red } from '@mui/material/colors';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import GradeReviewDetail from '../../../components/GradeReviewDetail';

export default function TeacherGradeReview() {
    const theme = useTheme();
    const isMatch1 = useMediaQuery(theme.breakpoints.down('xl'));
    const isMatch2 = useMediaQuery(theme.breakpoints.down('lg'));

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
                { 
                    isMatch1? (
                        <>
                        {
                            isMatch2? (
                                <Box sx={{margin: '30px 50px', minWidth: '350px'}}>
                                    <Box sx={{mb: '50px'}}>
                                        <Typography gutterBottom variant="h4" component="div" sx={{ color: '#0C8590', ml: '20px' }}>
                                            Grade Reviews
                                        </Typography>
                                        <Divider sx={{backgroundColor: '#0C8590'}} />
                                        <List sx={{ margin: '0 20px' }}>
                                            <ListItem
                                                sx={{ padding: '10px', border: 1, borderRadius: '50px', color: '#0d98a5', backgroundColor: '#e8fcfd', margin: '15px 0', 
                                                    ":hover":{
                                                        cursor: 'pointer',
                                                        backgroundColor: grey[100]
                                                }}}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar sx={{ bgcolor: '#0C8590', ml: '20px', mr: '20px', height: '50px', width: '50px' }} aria-label="recipe">
                                                        K
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText sx={{fontSize: '16px', fontWeight: 500, mt: '5px', color: '#000'}}>
                                                    Khánh Trương Trọng
                                                </ListItemText>
                                                <Typography sx={{mr: '20px'}}>Updated</Typography>
                                                <KeyboardArrowUp sx={{mr: '20px'}}/>
                                            </ListItem>
                                            <GradeReviewDetail />

                                            <ListItem
                                                sx={{ padding: '10px', border: 1, borderRadius: '50px', color: '#0d98a5', backgroundColor: '#e8fcfd', margin: '15px 0', 
                                                    ":hover":{
                                                        cursor: 'pointer',
                                                        backgroundColor: grey[100]
                                                }}}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar sx={{ bgcolor: '#0C8590', ml: '20px', mr: '20px', height: '50px', width: '50px' }} aria-label="recipe">
                                                        K
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText sx={{fontSize: '16px', fontWeight: 500, mt: '5px', color: '#000'}}>
                                                    Khánh Trương Trọng
                                                </ListItemText>
                                                <Typography sx={{mr: '20px', color: red[400]}}>Pending</Typography>
                                                <KeyboardArrowDown sx={{mr: '20px'}}/>
                                            </ListItem>
                                            
                                            <ListItem
                                                sx={{ padding: '10px', border: 1, borderRadius: '50px', color: '#0d98a5', backgroundColor: '#e8fcfd', margin: '15px 0', 
                                                    ":hover":{
                                                        cursor: 'pointer',
                                                        backgroundColor: grey[100]
                                                }}}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar sx={{ bgcolor: '#0C8590', ml: '20px', mr: '20px', height: '50px', width: '50px' }} aria-label="recipe">
                                                        K
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText sx={{fontSize: '16px', fontWeight: 500, mt: '5px', color: '#000'}}>
                                                    Khánh Trương Trọng
                                                </ListItemText>
                                                <Typography sx={{mr: '20px'}}>Updated</Typography>
                                                <KeyboardArrowDown sx={{mr: '20px'}}/>
                                            </ListItem>
                                        </List>
                                    </Box>
                                </Box>
                            ) : (
                                <Box sx={{margin: '30px 150px', minWidth: '350px'}}>
                                    <Box sx={{mb: '50px'}}>
                                        <Typography gutterBottom variant="h4" component="div" sx={{ color: '#0C8590', ml: '20px' }}>
                                            Grade Reviews
                                        </Typography>
                                        <Divider sx={{backgroundColor: '#0C8590'}} />
                                        <List sx={{ margin: '0 20px' }}>
                                            <ListItem
                                                sx={{ padding: '10px', border: 1, borderRadius: '50px', color: '#0d98a5', backgroundColor: '#e8fcfd', margin: '15px 0', 
                                                    ":hover":{
                                                        cursor: 'pointer',
                                                        backgroundColor: grey[100]
                                                }}}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar sx={{ bgcolor: '#0C8590', ml: '20px', mr: '20px', height: '50px', width: '50px' }} aria-label="recipe">
                                                        K
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText sx={{fontSize: '16px', fontWeight: 500, mt: '5px', color: '#000'}}>
                                                    Khánh Trương Trọng
                                                </ListItemText>
                                                <Typography sx={{mr: '20px'}}>Updated</Typography>
                                                <KeyboardArrowUp sx={{mr: '20px'}}/>
                                            </ListItem>
                                            <GradeReviewDetail />

                                            <ListItem
                                                sx={{ padding: '10px', border: 1, borderRadius: '50px', color: '#0d98a5', backgroundColor: '#e8fcfd', margin: '15px 0', 
                                                    ":hover":{
                                                        cursor: 'pointer',
                                                        backgroundColor: grey[100]
                                                }}}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar sx={{ bgcolor: '#0C8590', ml: '20px', mr: '20px', height: '50px', width: '50px' }} aria-label="recipe">
                                                        K
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText sx={{fontSize: '16px', fontWeight: 500, mt: '5px', color: '#000'}}>
                                                    Khánh Trương Trọng
                                                </ListItemText>
                                                <Typography sx={{mr: '20px', color: red[400]}}>Pending</Typography>
                                                <KeyboardArrowDown sx={{mr: '20px'}}/>
                                            </ListItem>
                                            
                                            <ListItem
                                                sx={{ padding: '10px', border: 1, borderRadius: '50px', color: '#0d98a5', backgroundColor: '#e8fcfd', margin: '15px 0', 
                                                    ":hover":{
                                                        cursor: 'pointer',
                                                        backgroundColor: grey[100]
                                                }}}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar sx={{ bgcolor: '#0C8590', ml: '20px', mr: '20px', height: '50px', width: '50px' }} aria-label="recipe">
                                                        K
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText sx={{fontSize: '16px', fontWeight: 500, mt: '5px', color: '#000'}}>
                                                    Khánh Trương Trọng
                                                </ListItemText>
                                                <Typography sx={{mr: '20px'}}>Updated</Typography>
                                                <KeyboardArrowDown sx={{mr: '20px'}}/>
                                            </ListItem>
                                        </List>
                                    </Box>
                                </Box>
                            )
                        }
                        </>
                        
                    ) : (
                        <Box sx={{margin: '30px 400px', minWidth: '650px'}}>
                            <Box sx={{mb: '50px'}}>
                                <Typography gutterBottom variant="h4" component="div" sx={{ color: '#0C8590', ml: '20px' }}>
                                    Grade Reviews
                                </Typography>
                                <Divider sx={{backgroundColor: '#0C8590'}} />
                                <List sx={{ margin: '0 20px' }}>
                                    <ListItem
                                        sx={{ padding: '10px', border: 1, borderRadius: '50px', color: '#0d98a5', backgroundColor: '#e8fcfd', margin: '15px 0', 
                                            ":hover":{
                                                cursor: 'pointer',
                                                backgroundColor: grey[100]
                                        }}}
                                    >
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: '#0C8590', ml: '20px', mr: '20px', height: '50px', width: '50px' }} aria-label="recipe">
                                                K
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText sx={{fontSize: '16px', fontWeight: 500, mt: '5px', color: '#000'}}>
                                            Khánh Trương Trọng
                                        </ListItemText>
                                        <Typography sx={{mr: '20px'}}>Updated</Typography>
                                        <KeyboardArrowUp sx={{mr: '20px'}}/>
                                    </ListItem>
                                    <GradeReviewDetail />

                                    <ListItem
                                        sx={{ padding: '10px', border: 1, borderRadius: '50px', color: '#0d98a5', backgroundColor: '#e8fcfd', margin: '15px 0', 
                                            ":hover":{
                                                cursor: 'pointer',
                                                backgroundColor: grey[100]
                                        }}}
                                    >
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: '#0C8590', ml: '20px', mr: '20px', height: '50px', width: '50px' }} aria-label="recipe">
                                                K
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText sx={{fontSize: '16px', fontWeight: 500, mt: '5px', color: '#000'}}>
                                            Khánh Trương Trọng
                                        </ListItemText>
                                        <Typography sx={{mr: '20px', color: red[400]}}>Pending</Typography>
                                        <KeyboardArrowDown sx={{mr: '20px'}}/>
                                    </ListItem>
                                    
                                    <ListItem
                                        sx={{ padding: '10px', border: 1, borderRadius: '50px', color: '#0d98a5', backgroundColor: '#e8fcfd', margin: '15px 0', 
                                            ":hover":{
                                                cursor: 'pointer',
                                                backgroundColor: grey[100]
                                        }}}
                                    >
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: '#0C8590', ml: '20px', mr: '20px', height: '50px', width: '50px' }} aria-label="recipe">
                                                K
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText sx={{fontSize: '16px', fontWeight: 500, mt: '5px', color: '#000'}}>
                                            Khánh Trương Trọng
                                        </ListItemText>
                                        <Typography sx={{mr: '20px'}}>Updated</Typography>
                                        <KeyboardArrowDown sx={{mr: '20px'}}/>
                                    </ListItem>
                                </List>
                            </Box>
                        </Box>
                    )
                }
            </MiniDrawer>
        </React.Fragment>
    );
}