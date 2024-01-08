import React from 'react'
import { Avatar, Box, Card, CardContent, CardHeader, Divider, IconButton, TextField, Typography } from '@mui/material';
import { MoreVert, SendOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';

export default function GradeReviewDetail() {
    const user = useSelector(state => state.user.account);

    return (    
        <Card sx={{margin: '20px 0', border: 1, borderColor: 'grey.300', boxShadow: 0, borderRadius: '10px'}}>
            <CardHeader
                sx={{mt: '10px'}}
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
                    Grade composition: Final project
                </Typography>
                <Typography gutterBottom component="div" sx={{fontSize: '14px', fontWeight: 500, ml: '10px'}}>
                    Current grade: 8.5
                </Typography>
                <Typography gutterBottom component="div" sx={{fontSize: '14px', fontWeight: 500, ml: '10px'}}>
                    Expectation grade: 9.5
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
    );
}