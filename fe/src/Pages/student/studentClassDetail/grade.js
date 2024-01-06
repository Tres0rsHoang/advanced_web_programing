import React from 'react'
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import { Avatar, Box, Button, Card, CardContent, CardHeader, Divider, IconButton, Tab, Tabs, TextField, Typography } from '@mui/material';
import MiniDrawer from '../../../components/Drawer';
import StudentGradeTable from '../../../components/StudentGradeTable';
import { Add, MoreVert, SendOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux'; 

export default function StudentGrade() {
    const user = useSelector(state => state.user.account);

    return (
        <React.Fragment>
            <CssBaseline />
            <MiniDrawer>
                <Tabs
                    aria-label="nav tabs example"
                    role="navigation"
                    value= {2}
                >
                    <Tab label="Stream" href='/student/classDetail/stream' sx={{ml: '20px'}} />
                    <Tab label="People" href='/student/classDetail/people' />
                    <Tab label="Grades" href='/student/classDetail/grade' />
                </Tabs>
                <Divider />
                <Box sx={{margin: '40px'}}>
                    <StudentGradeTable />
                    <Box sx={{display: 'flex', justifyContent: 'flex-end', margin: '20px '}}>
                        <Button variant="contained" sx={{textTransform: 'none'}}>
                            <Add sx={{mr: '10px'}}/>
                            <Typography sx={{mr: '10px', fontSize: '15px'}}>Request</Typography> 
                        </Button>
                    </Box>
                    <Divider />
                    <Card sx={{margin: '20px 20px 20px 0', border: 1, borderColor: 'grey.300', boxShadow: 0, borderRadius: '10px'}}>
                        <CardHeader
                            avatar={
                                <Avatar src={user.imageUrl} sx={{ width: 40, height: 40, background: '#02579A', ml: '10px' }}>
                                    {user.firstName.charAt(0)}
                                </Avatar>
                            }
                            action={
                            <IconButton aria-label="settings">
                                <MoreVert />
                            </IconButton>
                            }
                            title={<Typography gutterBottom component="div" sx={{fontSize: '16px', fontWeight: 500, mt: '5px'}}>
                                {user.firstName} {user.lastName}
                            </Typography>}
                        />
                        <CardContent>
                            <Typography gutterBottom component="div" sx={{fontSize: '14px', fontWeight: 500, ml: '10px'}}>
                                Expectation grade: 9.5 (Final project)
                            </Typography>
                            <Typography gutterBottom component="div" sx={{fontSize: '14px', fontWeight: 500, ml: '10px'}}>
                                Explanation: Em đã hoàn thành đầy đủ chức năng nên em nghĩ em phải được điểm cao hơn ạ
                            </Typography>
                        </CardContent>
                        <Divider />
                        <Box sx={{margin: '10px 30px'}}>
                        <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                            <Avatar src={null} sx={{ width: 40, height: 40, background: '#02579A', ml: '10px' }}>
                                    {user.firstName.charAt(0)}
                            </Avatar>
                            <Box>
                                <Typography gutterBottom component="div" sx={{fontSize: '14px', fontWeight: 'bold', ml: '20px', mt: '5px'}}>
                                    Khánh Nguyễn Huy
                                </Typography>
                                <Typography gutterBottom component="div" sx={{fontSize: '14px', fontWeight: 500, ml: '20px', mt: '5px'}}>
                                    Em đợi thầy xem lại đã nhé
                                </Typography>
                            </Box>
                        </CardContent>
                        <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                            <Avatar src={user.imageUrl} sx={{ width: 40, height: 40, background: '#02579A', ml: '10px' }}>
                                    {user.firstName.charAt(0)}
                            </Avatar>
                            <Box>
                                <Typography gutterBottom component="div" sx={{fontSize: '14px', fontWeight: 'bold', ml: '20px', mt: '5px'}}>
                                    {user.firstName} {user.lastName}
                                </Typography>
                                <Typography gutterBottom component="div" sx={{fontSize: '14px', fontWeight: 500, ml: '20px', mt: '5px'}}>
                                    Dạ thầy
                                </Typography>
                            </Box>
                        </CardContent>
                        <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                            <Avatar src={user.imageUrl} sx={{ width: 40, height: 40, background: '#02579A', mr: '30px', ml: '10px' }}>{user.firstName.charAt(0)}</Avatar>
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
                        </Box>
                    </Card>
                </Box>
            </MiniDrawer>
        </React.Fragment>
    );
}