import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, DialogContentText, IconButton, Typography } from '@mui/material';
import { ContentCopy,PersonAddAlt1Outlined } from '@mui/icons-material';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import { sendInviteMailApi } from '../api/classService';

export default function InviteStudent({classCode}) {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    let response = await sendInviteMailApi('student', classCode, email);
    if (response.status === 200) {
      toast.success('Invite student successful');
    }
    else {
      toast.error(response.data.messages);
    }
  };

  React.useEffect(() => {
  }, [email]);

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
        <DialogTitle sx={{fontWeight: 'bold', mb: '10px'}}>Invite students</DialogTitle>
        <DialogContent>
            <Typography sx={{fontSize: '18px'}}>Invite link</Typography>
            <Box sx={{display:'flex', alignItems: 'center', justifyContent: 'space-between', mb: '25px'}}>
              <DialogContentText 
                sx={{fontSize: '16px',
                  width: '460px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {`${process.env.REACT_APP_SITE_URL}/joinClass?classCode=${classCode}&type=student`}
              </DialogContentText>
              <CopyToClipboard 
                text={`${process.env.REACT_APP_SITE_URL}/joinClass?classCode=${classCode}&type=student`}
                onCopy={() => toast.success('Copied to clipboard')}
              >
                <IconButton sx={{mb: '5px'}}>
                  <ContentCopy sx={{color: '#0C8590', fontSize: '25px'}}/>
                </IconButton>
              </CopyToClipboard>
            </Box>
            <TextField
                autoFocus
                required
                margin="dense"
                id="email"
                label="Email address"
                type="email"
                fullWidth
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} sx={{textTransform: 'none', fontSize: '16px', color: '#0C8590'}}>Cancel</Button>
            <Button onClick={handleSubmit} sx={{textTransform: 'none', fontSize: '16px', color: '#0C8590'}}>Invite</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}