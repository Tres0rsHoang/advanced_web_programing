import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import NavBar from '../NavBar';

const Profile = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar />
      <Typography variant='h5' sx={{ml: '30px', mt: '100px', fontWeight: 'bold'}}>Profile Page</Typography>
    </React.Fragment>
  );
}

export default Profile;