import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { createGradeApi } from '../api/gradeService';

export default function AddGradeComposition({classId}) {
  const [open, setOpen] = React.useState(false);
  const [gradeName, setGradeName] = React.useState('');
  const [gradeScale, setGradeScale] = React.useState('');

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    let response = await createGradeApi(classId, gradeScale * 0.01, gradeName);
    if (response.status === 200) {
      setTimeout(() => {
        navigate(0);
      }, 1000);
      toast.success('Add grade composition successful');
    }
    else {
      setTimeout(() => {
        navigate(0);
      }, 1000);
    }
  };

  React.useEffect(() => {
  }, [gradeName, gradeScale]);

  return (
    <React.Fragment>
      <Button variant="contained" sx={{textTransform: 'none'}}
        onClick={handleClickOpen}
      >
        <Add sx={{mr: '10px'}}/>
        <Typography sx={{mr: '10px', fontSize: '14px'}}>Add grade composition</Typography> 
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth
        PaperProps={{ sx: { borderRadius: "12px", padding: '10px' } }}
      >
        <DialogTitle sx={{fontWeight: 'bold'}}>Add grade composition</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                required
                margin="dense"
                id="gradeName"
                label="Grade name"
                type="text"
                fullWidth
                variant="outlined"
                onChange={(e) => setGradeName(e.target.value)}
                value={gradeName}
            />
            <TextField
                margin="dense"
                id="gradeScale"
                label="Grade scale (%)"
                type="number"
                fullWidth
                variant="outlined"
                InputProps={{ inputProps: { min: 1, max: 100 } }}
                onChange={(e) => setGradeScale(e.target.value)}
                value={gradeScale}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} sx={{textTransform: 'none', fontSize: '16px'}}>Cancel</Button>
            <Button onClick={handleSubmit} sx={{textTransform: 'none', fontSize: '16px'}}>Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}