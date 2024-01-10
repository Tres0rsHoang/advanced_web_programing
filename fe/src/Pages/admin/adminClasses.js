import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Box, Button, Divider, Stack, Tab, Tabs } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import { DataGrid, GridDeleteIcon } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getUserListApi, toggleAdminApi, toggleLockAccountApi } from '../../api/adminService';
import MiniDrawer from '../../components/Drawer';

export default function AdminClasses() {
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [rows, setRowsData] = useState([]);
    const [fetchData, setFetchData] = useState(false);

    useEffect(() => {
        async function fetchData() {
            var response = await getUserListApi();
            setRowsData(response.data.map((element) => {
                return {
                    id: element['id'],
                    firstName: element['first_name'],
                    lastName: element['last_name'],
                    email: element['email'],
                    isVerify: element['is_verify'],
                    isLocked: element['is_locked'],
                    isAdmin: element['is_admin'],
                    phoneNumber: element['phone_number'],
                    imageUrl: element['image_url'],
                }
            }));
        }
        fetchData();
    }, [fetchData]);

    const columns = [
        {
            field: 'id',
            headerName: 'Account ID',
            flex: 1
        },
        {
            field: 'firstName',
            headerName: 'First name',
            flex: 1
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            flex: 1
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1
        },
        {
            field: 'isVerify',
            headerName: 'Email Verify',
            flex: 1,
            type: "boolean"
        },
        {
            field: 'isLocked',
            headerName: 'Account Locked',
            flex: 1,
            type: "boolean"
        },
        {
            field: 'isAdmin',
            headerName: 'Is Admin',
            flex: 1,
            type: "boolean"
        },
        {
            field: 'phoneNumber',
            headerName: 'Phone Number',
            flex: 1
        },
        {
            field: 'imageUrl',
            headerName: 'Image URL',
            flex: 1
        }
    ];


    const handleLockAccount = () => {
        if (selectedRows.length === 0) {
            toast.error("No user sellected");
            return;
        }

        var element = selectedRows[0];

        toggleLockAccountApi(element['id']).then(response => {
            if (response.status === 200) {
                toast.success(response.data.messages);
                setFetchData(!fetchData);
            }
        });
    }

    const handleToggleAdmin = () => {
        if (selectedRows.length === 0) {
            toast.error("No user sellected");
            return;
        }

        var element = selectedRows[0];

        toggleAdminApi(element['id']).then(response => {
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
                    value= {1}
                >
                    <Tab label="Account" href='/admin/account' sx={{ml: '20px'}} />
                    <Tab label="Classes" href='/admin/classes' />
                    <Tab label="Mapping" href='/admin/mapping' />
                </Tabs>
                <Divider />
                <div style={{ height: 500, width: '100%' }} >
                    <DataGrid
                        autosizeOptions
                        rows = {rows}
                        columns = {columns}
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
                        <Button variant="contained" color="error" startIcon={<GridDeleteIcon />} onClick={handleLockAccount}>Toggle Lock</Button>
                        <Button variant="contained" startIcon={<CheckBoxIcon />} onClick={handleToggleAdmin}>Toggle Admin</Button>
                    </Stack>
                </Box>
            </MiniDrawer>
        </React.Fragment>
    );
}