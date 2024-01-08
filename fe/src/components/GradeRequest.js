import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, MenuItem, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

export default function GradeRequest() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const gradeCompositions = [
    'Assignments',
    'Midterm Project',
    'Final Project'
  ];

  return (
    <React.Fragment>
      <Box sx={{display: 'flex', justifyContent: 'flex-end', margin: '20px '}}>
        <Button variant="contained" sx={{textTransform: 'none'}} onClick={handleClickOpen}>
            <Add sx={{mr: '10px'}}/>
            <Typography sx={{mr: '10px', fontSize: '15px'}}>Request</Typography> 
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose} fullWidth
        PaperProps={{ sx: { borderRadius: "12px", padding: '10px' } }}
      >
        <DialogTitle sx={{fontWeight: 'bold', mb: '10px'}}>Grade request</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                required
                margin="dense"
                id="gradeComposition"
                label="Grade composition"
                select
                defaultValue="Assignments"
                fullWidth
                variant="outlined"
            >
                {gradeCompositions.map((value) => (
                    <MenuItem key={value} value={value}>
                        {value}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                required
                margin="dense"
                id="currentGrade"
                label="Current grade"
                type="number"
                fullWidth
                InputProps={{ inputProps: { min: 0, max: 10 } }}
                variant="outlined"
            />
            <TextField
                required
                margin="dense"
                id="expectationGrade"
                label="Expectation grade"
                type="number"
                fullWidth
                InputProps={{ inputProps: { min: 0, max: 10 } }}
                variant="outlined"
            />
            <TextField
                required
                margin="dense"
                id="explanation"
                label="Explanation"
                type="text"
                fullWidth
                variant="outlined"
                multiline
                rows={4}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} sx={{textTransform: 'none', fontSize: '16px', color: '#02579A'}}>Cancel</Button>
            <Button onClick={handleClose} sx={{textTransform: 'none', fontSize: '16px', color: '#02579A'}}>Request</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}