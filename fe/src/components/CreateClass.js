import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import { createClassApi } from '../api/classService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function CreateClass() {
  const [open, setOpen] = React.useState(false);
  const [className, setClassName] = React.useState('');
  const [classSubject, setClassSubject] = React.useState('');

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    let response = await createClassApi(className, '', classSubject, '');
    if (response.status === 200) {
      setTimeout(() => {
        navigate(0);
      }, 1000);
      toast.success('Create class successful');
    }
    else {
      setTimeout(() => {
        navigate(0);
      }, 1000);
      toast.error(response.data.messages);
    }
  };

  React.useEffect(() => {
  }, [className, classSubject]);

  return (
    <React.Fragment>
      <IconButton
        onClick={handleClickOpen}
        sx={{padding: '10px'}}
      >
        <Add style={{ fontSize: '30px', color: 'white' }}/>
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth
        PaperProps={{ sx: { borderRadius: "12px", padding: '10px' } }}
      >
        <DialogTitle sx={{fontWeight: 'bold'}}>Create class</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                required
                margin="dense"
                id="className"
                label="Class name"
                type="text"
                fullWidth
                variant="outlined"
                onChange={(e) => setClassName(e.target.value)}
                value={className}
            />
            <TextField
                margin="dense"
                id="subject"
                label="Subject"
                type="text"
                fullWidth
                variant="outlined"
                onChange={(e) => setClassSubject(e.target.value)}
                value={classSubject}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} sx={{textTransform: 'none', fontSize: '16px'}}>Cancel</Button>
            <Button onClick={handleSubmit} sx={{textTransform: 'none', fontSize: '16px'}}>Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}