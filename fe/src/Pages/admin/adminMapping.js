import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';
import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, Tab, Tabs } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import React from 'react';
import { getClassroomListApi } from '../../api/adminService';
import MiniDrawer from '../../components/Drawer';

export default function AdminMapping() {
    const [classId, setClassId] = React.useState('');
    const [studentId, setStudentId] = React.useState('');
    const [inClassId, setInClassId] = React.useState('');
    const [classList, setClassList] = React.useState([]);

    React.useEffect(() => {
        async function fetchData() {
            var response = await getClassroomListApi();
            if (response.status === 200) {
                const classes = response.data.map(element => {
                    return {
                        classId: element['id'],
                        className: element['name']
                    };
                });
                setClassList(classes);
            }
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
                    value={2}
                >
                    <Tab label="Account" href='/admin/account' sx={{ ml: '20px' }} />
                    <Tab label="Classes" href='/admin/classes' />
                    <Tab label="Mapping" href='/admin/mapping' />
                </Tabs>
                <div style={{ margin: "0 0 0 10%" }}>
                    <Box sx={{ alignItems: "center" }}>
                        <FormControl required sx={{ m: 1, minWidth: "30%", maxWidth: "30%" }}>
                            <InputLabel>Classroom Id</InputLabel>
                            <Select
                                value={classId}
                                label="Classroom id"
                                onChange={event => {
                                    setClassId(event.target.value);
                                }}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                {
                                    classList.map(element => {
                                        return <MenuItem value={element['classId']}> {element['classId']} - {element['className']} </MenuItem>
                                    })
                                }
                            </Select>
                            <FormHelperText>Required</FormHelperText>
                        </FormControl>

                        <FormControl required sx={{ m: 1, minWidth: "30%", maxWidth: "30%" }}>
                            <InputLabel>Student Id</InputLabel>
                            <Select
                                value={classId}
                                label="Classroom id"
                                onChange={event => {
                                    setClassId(event.target.value);
                                }}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                {
                                    classList.map(element => {
                                        return <MenuItem value={element['classId']}> {element['classId']} - {element['className']} </MenuItem>
                                    })
                                }
                            </Select>
                            <FormHelperText>Required</FormHelperText>
                        </FormControl>

                        <FormControl required sx={{ m: 1, minWidth: "20%", maxWidth: "20%" }}>
                            <InputLabel>Student Id</InputLabel>
                            <Select
                                value={classId}
                                onChange={event => {
                                    setClassId(event.target.value);
                                }}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                {
                                    classList.map(element => {
                                        return <MenuItem value={element['classId']}> {element['classId']} - {element['className']} </MenuItem>
                                    })
                                }
                            </Select>
                            <FormHelperText>Required</FormHelperText>
                        </FormControl>

                        <Button variant="contained" endIcon={<SendIcon />} sx={{ m: 2 }}>
                            Mapping
                        </Button>
                    </Box>
                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Upload file
                    </Button>
                </div>
            </MiniDrawer>
        </React.Fragment>
    );
}