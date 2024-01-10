import { Box, Button, Divider, Stack, Tab, Tabs } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import { DataGrid, GridDeleteIcon } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getClassroomListApi, toggleClassApi } from '../../api/adminService';
import MiniDrawer from '../../components/Drawer';

export default function AdminClasses() {
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [rows, setRowsData] = useState([]);
    const [fetchData, setFetchData] = useState(false);

    useEffect(() => {
        async function fetchData() {
            var response = await getClassroomListApi();
            setRowsData(response.data.map((element) => {
                return {
                    id: element['id'],
                    name: element['name'],
                    subject: element['subject'],
                    isActive: element['is_active'],
                    teacherName: element['teacher_name']
                }
            }));
        }
        fetchData();
    }, [fetchData]);

    const columns = [
        {
            field: 'id',
            headerName: 'Account ID',
            flex: 2
        },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1
        },
        {
            field: 'subject',
            headerName: 'Subject',
            flex: 1
        },
        {
            field: 'teacherName',
            headerName: 'Teacher name',
            flex: 1
        },
        {
            field: 'isActive',
            headerName: 'Active',
            flex: 1,
            type: "boolean"
        }
    ];


    const handleActiveClass = () => {
        if (selectedRows.length === 0) {
            toast.error("No user sellected");
            return;
        }

        var element = selectedRows[0];

        toggleClassApi(element['id']).then(response => {
            if (response.status === 200) {
                toast.success(response.data.messages);
                setFetchData(!fetchData);
            }
        });
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <MiniDrawer>
                <Tabs
                    aria-label="nav tabs example"
                    role="navigation"
                    value={1}
                >
                    <Tab label="Account" href='/admin/account' sx={{ ml: '20px' }} />
                    <Tab label="Classes" href='/admin/classes' />
                    <Tab label="Mapping" href='/admin/mapping' />
                </Tabs>
                <Divider />
                <div style={{ height: 500, width: '100%' }} >
                    <DataGrid
                        sx={{
                            "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
                                outline: "none"
                            }
                        }}
                        autosizeOptions
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                        pageSizeOptions={[10, 50, 100]}
                        onRowSelectionModelChange={(ids) => {
                            const selectedIDs = new Set(ids);
                            const selectedRows = rows.filter((row) =>
                                selectedIDs.has(row.id),
                            );
                            setSelectedRows(selectedRows);
                        }}
                    />
                </div>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "start" }}>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" color="error" startIcon={<GridDeleteIcon />} onClick={handleActiveClass}>Toggle Active</Button>
                    </Stack>
                </Box>
            </MiniDrawer>
        </React.Fragment>
    );
}