import { Tab, Tabs, useMediaQuery } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import MiniDrawer from '../../components/Drawer';

export default function AdminClasses() {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('lg'));

    
    
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
            </MiniDrawer>
        </React.Fragment>
    );
}