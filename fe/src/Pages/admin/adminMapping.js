import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';
import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, Tab, Tabs } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { adminMapStudentApi, adminUnMappingStudentApi, getClassroomListApi } from '../../api/adminService';
import MiniDrawer from '../../components/Drawer';

export default function AdminMapping() {
    const [classId, setClassId] = React.useState('');
    const [studentId, setStudentId] = React.useState('');
    const [inClassId, setInClassId] = React.useState('');
    const [fetchData, setFetchData] = React.useState(false);

    const [query, setQuery] = React.useState([]);
    const [isMapping, setIsMapping] = React.useState(false);
    const [classList, setClassList] = React.useState([]);
    const [studentList, setStudentList] = React.useState([]);
    const [inClassIdList, setInClassIdList] = React.useState([]);

    const navigation = useNavigate();

    React.useEffect(() => {
        async function fetchData() {
            var response = await getClassroomListApi();

            if (response.status === 200) {
                setQuery(response.data);
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
    }, [fetchData]);

    React.useEffect(() => {
        for (const element of query) {
            if (element['id'] === classId) {
                var studentList = element['user_in_class'];
                var inClassIds = [];
                var students = [];

                for (const student of studentList) {
                    inClassIds.push(student['in_class_id']);
                    students.push({
                        id: student['student_id'],
                        name: student['student_name']
                    });
                }

                setInClassIdList(inClassIds);
                setStudentList(students);

                break;
            }
        }
    }, [classId, fetchData, query]);

    React.useEffect(() => {
        var isMappingCalling = false;
        for (const element of query) {
            if (element['id'] === classId) {
                var studentList = element['user_in_class'];
                for (const student of studentList) {
                    if (student['in_class_id'] === inClassId || student['student_id'] === studentId) {
                        setIsMapping(student['is_mapping']);
                        isMappingCalling = true;
                        break;
                    }
                }

                if (!isMappingCalling) setIsMapping(false);
                break;
            }
        }
    }, [inClassId, studentId, fetchData, classId, query]);

    const handleButtonClick = () => {
        if (classId === '') {
            toast.error("Please select required field");
            return;
        }

        if (isMapping) {
            adminUnMappingStudentApi(classId, studentId, inClassId).then(response => {
                if (response.status === 200) {
                    setFetchData(!fetchData);
                    toast.success(response.data.messages);
                    navigation(0);
                }
                else {
                    toast.error(response.data.messages);
                }

            }).catch(err => {
                console.log(err);
            });
        }
        else {
            adminMapStudentApi(classId, studentId, inClassId).then(response => {
                if (response.status === 200) {
                    setFetchData(!fetchData);
                    toast.success(response.data.messages);
                    navigation(0);
                }
                else {
                    toast.error(response.data.messages);
                }
            }).catch(err => {
                console.log(err);
            });
        }
    };

    const handleUploadFile = (file) => {
        const fd = new FormData();
        
        fd.append('files', file);
        fd.append('class_id', classId);

        const baseLength = 87; // estimated max value
        const separatorLength = 115; // estimated max value
        let length = baseLength;
        const entries = fd.entries();
        for (const [key, value] of entries) {
            length += key.length + separatorLength;
            if (typeof value === 'object') {
                length += value.size;
            } else {
                length += String(value).length;
            }
        }

        axios.post(`${process.env.REACT_APP_SITE_API}/admin/uploadFile`, fd, {
            onUploadProgress: (process) => console.log(process*100),
            withCredentials: true,
            headers: {
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Content-Length': length,
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(
            res => {
                if (res.status === 202) {
                    toast.error(res.data.messages);
                }
                console.log(res);
            }
        ).catch(err => console.log("err:", err));
    }

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

                        {
                            (!isMapping || inClassId !== '') ? <FormControl required sx={{ m: 1, minWidth: "20%", maxWidth: "20%" }}>
                                <InputLabel>In Class Id</InputLabel>
                                <Select
                                    value={inClassId}
                                    onChange={event => {
                                        setInClassId(event.target.value);
                                    }}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {
                                        inClassIdList.map(element => {
                                            return <MenuItem value={element}> {element} </MenuItem>
                                        })
                                    }
                                </Select>
                                <FormHelperText>Required</FormHelperText>
                            </FormControl> : null
                        }

                        {
                            (!isMapping || studentId !== '') ? <FormControl required sx={{ m: 1, minWidth: "30%", maxWidth: "30%" }}>
                                <InputLabel>Student Id</InputLabel>
                                <Select
                                    value={studentId}
                                    label="Classroom id"
                                    onChange={event => {
                                        setStudentId(event.target.value);
                                    }}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {
                                        studentList.map(element => {
                                            return <MenuItem value={element['id']}> {element['id']} - {element['name']} </MenuItem>
                                        })
                                    }
                                </Select>
                                <FormHelperText>Required</FormHelperText>
                            </FormControl> : null
                        }

                        {
                            !isMapping ? (
                                <Button variant="contained" endIcon={<SendIcon />} onClick={handleButtonClick} sx={{ m: 2 }}>
                                    Mapping
                                </Button>
                            ) : (
                                <Button variant="contained" color="error" endIcon={<SendIcon />} onClick={handleButtonClick} sx={{ m: 2 }}>
                                    Un-mapping
                                </Button>
                            )
                        }
                    </Box>
                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Upload file
                        <input
                            onChange={(e) => handleUploadFile(e.target.files[0])}
                            type="file"
                            hidden
                        />
                    </Button>
                </div>
            </MiniDrawer>
        </React.Fragment>
    );
}