import React from 'react'
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import { Divider, Tab, Tabs } from '@mui/material';
import MiniDrawer from '../../components/Drawer';

export default function ClassWork() {

    return (
        <React.Fragment>
            <CssBaseline />
            <MiniDrawer>
                <Tabs
                    aria-label="nav tabs example"
                    role="navigation"
                    value= {1}
                >
                    <Tab label="Stream" href='/classDetail/stream' sx={{ml: '20px'}} />
                    <Tab label="Classwork" href='/classDetail/classWork' />
                    <Tab label="People" href='/classDetail/people' />
                </Tabs>
                <Divider />
            </MiniDrawer>
        </React.Fragment>
    );
}