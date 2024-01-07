import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContentText, IconButton } from '@mui/material';
import { PersonAddAlt1Outlined } from '@mui/icons-material';

export default function InviteTeacher() {
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
         <PersonAddAlt1Outlined sx={{color: '#0C8590', fontSize: '28px'}}/>
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth
        PaperProps={{ sx: { borderRadius: "12px", padding: '10px' } }}
      >
        <DialogTitle sx={{fontWeight: 'bold'}}>Invite teachers</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                required
                margin="dense"
                id="email"
                label="Email address"
                type="email"
                fullWidth
                variant="outlined"
            />
            <DialogContentText sx={{mt: '30px'}}>
                Teachers you add can do everything you can, except delete the class.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} sx={{textTransform: 'none', fontSize: '16px', color: '#0C8590'}}>Cancel</Button>
            <Button onClick={handleClose} sx={{textTransform: 'none', fontSize: '16px', color: '#0C8590'}}>Invite</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}