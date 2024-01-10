import { Divider, Tab, Tabs } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { getUserListApi } from '../../api/adminService';
import MiniDrawer from '../../components/Drawer';

export default function AdminAccount() {
    //const theme = useTheme();
    //const isMatch = useMediaQuery(theme.breakpoints.down('lg'));
    const [rowsData, setRowsData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            var response = await getUserListApi();
            setRowsData(response.data);
            console.log(response);
        }
        fetchData();
    }, []);
    
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
            headerName: 'Verify', 
            flex: 1
        },
        { 
            field: 'isLocked', 
            headerName: 'Locked', 
            flex: 1
        },
        { 
            field: 'isAdmin', 
            headerName: 'Admin', 
            flex: 1
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

    const rows = [];

    return (
        <React.Fragment>
            <CssBaseline />
            <MiniDrawer>
                <Tabs
                    aria-label="nav tabs example"
                    role="navigation"
                    value={0}
                >
                    <Tab label="Account" href='/admin/account' sx={{ ml: '20px' }} />
                    <Tab label="Classes" href='/admin/classes' />
                    <Tab label="Mapping" href='/admin/mapping' />
                </Tabs>
                <Divider />
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </MiniDrawer>
        </React.Fragment>
    );
}