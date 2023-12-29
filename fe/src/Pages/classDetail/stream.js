import React from 'react'
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import { Avatar, Box, Button, Card, CardContent, Divider, Grid, IconButton, Paper, Tab, Tabs, Typography, styled, useMediaQuery } from '@mui/material';
import MiniDrawer from '../../components/Drawer';
import { useTheme } from '@mui/material/styles';
import { MoreVert } from '@mui/icons-material';
import { blue, indigo } from '@mui/material/colors';
import { useSelector } from 'react-redux';

export default function Stream() {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));

    const user = useSelector(state => state.user.account);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    return (
        <React.Fragment>
            <CssBaseline />
            <MiniDrawer>
                <Tabs
                    aria-label="nav tabs example"
                    role="navigation"
                    value= {0}
                >
                    <Tab label="Stream" href='/classDetail/stream' sx={{ml: '20px'}} />
                    <Tab label="Classwork" href='/classDetail/classWork' />
                    <Tab label="People" href='/classDetail/people' />
                </Tabs>
                <Divider />
                <Box sx={{margin: '30px 70px'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card 
                                sx={{backgroundImage: "url('https://mayastepien.nl/googlecalendar/mayastepien-google-pingpong.jpg')",
                                height: '250px',
                                display: 'flex',
                                alignItems: 'flex-end',
                                borderRadius: '15px'
                            }}
                            >
                                <CardContent sx={{ml: '20px'}}>
                                    <Typography gutterBottom variant="h4" component="div" sx={{color: 'white', fontWeight: 'bold'}}>
                                    2310-CLC-AWP-20KTPM2
                                    </Typography>
                                    <Typography variant="h6" sx={{color: 'white'}}>
                                    Advanced Web Programming
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        { 
                            isMatch? (
                                <Grid item xs={12} md={8}>
                                    <Item>xs=6 md=4</Item>
                                    <Item>xs=6 md=4</Item>
                                    <Item>xs=6 md=4</Item>
                                    <Item>xs=6 md=4</Item>
                                    <Item>xs=6 md=4</Item>
                                    <Item>xs=6 md=4</Item>
                                    <Item>xs=6 md=4</Item>
                                    <Item>xs=6 md=4</Item>  
                                </Grid>
                            ) : (
                                <>
                                    <Grid item xs={0} md={3}>
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
                                            backgroundColor: indigo[500]}}
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
                                    <Grid item xs={12} md={9}>
                                        <Card sx={{margin: '20px 20px 20px 0', border: 1, borderColor: 'grey.300', boxShadow: 0, borderRadius: '10px', boxShadow: 3}}>
                                            <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                                                <Avatar src={user.imageUrl} sx={{ width: 40, height: 40, background: blue[500], mr: '30px' }}>{user.firstName.charAt(0)}</Avatar>
                                                <Typography gutterBottom component="div" sx={{fontSize: '15px', margin: '10px 0', fontWeight: 500}}>
                                                    Announce something to your class
                                                </Typography>
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