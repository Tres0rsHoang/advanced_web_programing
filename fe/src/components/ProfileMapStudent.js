import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Typography } from '@mui/material';
import { profileMapStudentApi, profileUnMapStudentApi } from '../api/profileService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function ProfileMapStudent({classId, isMapping}) {
  const [open, setOpen] = React.useState(false);
  const [inClassId, setInClassId] = React.useState('');

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleMapping = async () => {
    let response = await profileMapStudentApi(classId, inClassId);
    
    console.log(isMapping);
    if (response.status === 200) {
        setTimeout(() => {
            navigate(0);
          }, 1000);
        toast.success('Mapping profile successful');
    }
  };

  const handleUnMapping = async () => {
    let response = await profileUnMapStudentApi(classId);
    
    console.log(response);
    if (response.status === 200) {
        setTimeout(() => {
            navigate(0);
          }, 1000);
        toast.success('Un Mapping profile successful');
    }
  };

  React.useEffect(() => {
}, [inClassId]);

  return (
    <React.Fragment>
        {isMapping? (
            <Box sx={{display: 'flex', justifyContent: 'flex-end', margin: '20px 0'}}>
                <Button variant="contained" sx={{textTransform: 'none'}} onClick={handleUnMapping}>
                    <Typography sx={{mr: '5px', fontSize: '15px'}}>Un Mapping</Typography> 
                </Button>
            </Box>
        ) : (
            <Box>
               <Box sx={{display: 'flex', justifyContent: 'flex-end', margin: '20px 5px'}}>
                <Button variant="contained" sx={{textTransform: 'none'}} onClick={handleClickOpen}>
                    <Typography sx={{fontSize: '15px'}}>Mapping</Typography> 
                </Button>
            </Box>
            <Dialog open={open} onClose={handleClose} fullWidth
                PaperProps={{ sx: { borderRadius: "12px", padding: '10px' } }}
            >
                <DialogTitle sx={{fontWeight: 'bold', mb: '10px'}}>Mapping Profile</DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        margin="dense"
                        id="inClassId"
                        label="In class Id"
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setInClassId(e.target.value)}
                        value={inClassId}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{textTransform: 'none', fontSize: '16px', color: '#02579A'}}>Cancel</Button>
                    <Button onClick={handleMapping} sx={{textTransform: 'none', fontSize: '16px', color: '#02579A'}}>Mapping</Button>
                </DialogActions>
            </Dialog>
            </Box>
        )}
    </React.Fragment>
  );
}