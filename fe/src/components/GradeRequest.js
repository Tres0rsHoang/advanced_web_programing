import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, MenuItem, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { createGradeReviewApi } from '../api/profileService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function GradeRequest({gradeInfo}) {
  const [open, setOpen] = React.useState(false);
  const [gradeId, setGradeId] = React.useState('');
  const [currentGrade, setCurrentGrade] = React.useState(0);
  const [expectationGrade, setExpectationGrade] = React.useState(0);
  const [explanation, setExplanation] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const navigate = useNavigate();

  React.useEffect(() => {
  }, [expectationGrade, explanation, gradeId]);

  const gradeCompositions = [];
  if (gradeInfo.grade_list !== undefined) {
    gradeInfo.grade_list.length > 0 ? gradeInfo.grade_list.map(element => gradeCompositions.push(element)) : gradeCompositions.push('')
  }

  const handleSubmit = async () => {
    let response = await createGradeReviewApi(gradeId, explanation, expectationGrade);

    if (response.status === 200) {
      setTimeout(() => {
        navigate(0);
      }, 1000);
      toast.success('Request successful');
    }
  };

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
                onChange={(e) => { 
                  e.preventDefault(); 
                  setGradeId(e.target.value);
                  if (gradeInfo.grade_list !== undefined) {
                    if(gradeInfo.grade_list.length > 0) {
                      gradeInfo.grade_list.map((element) => 
                        element.id === e.target.value ? setCurrentGrade(element.grade):'')
                      }
                 }
                }}
            >
                {gradeCompositions !== undefined && gradeCompositions.length > 0 ? gradeCompositions.map((value) => (
                    <MenuItem key={value.id} value={value.id}>
                        {value.name}
                    </MenuItem>
                ))  : ''}
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
                onChange={(e) => setExpectationGrade(e.target.value)}
                value={currentGrade}
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
                onChange={(e) => setExpectationGrade(e.target.value)}
                value={expectationGrade}

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
                onChange={(e) => setExplanation(e.target.value)}
                value={explanation}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} sx={{textTransform: 'none', fontSize: '16px', color: '#02579A'}}>Cancel</Button>
            <Button onClick={handleSubmit} sx={{textTransform: 'none', fontSize: '16px', color: '#02579A'}}>Request</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}