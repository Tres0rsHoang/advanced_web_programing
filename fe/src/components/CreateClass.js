import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';

export default function CreateClass() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            />
            <TextField
                margin="dense"
                id="subject"
                label="Subject"
                type="text"
                fullWidth
                variant="outlined"
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} sx={{textTransform: 'none', fontSize: '16px'}}>Cancel</Button>
            <Button onClick={handleClose} sx={{textTransform: 'none', fontSize: '16px'}}>Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}