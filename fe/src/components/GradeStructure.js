import * as React from 'react';
import {
  DataGridPremium,
  useGridApiRef
} from '@mui/x-data-grid-premium';
import { LicenseInfo } from '@mui/x-data-grid-premium';
import { Box, Button, IconButton, Paper, Typography } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { red } from '@mui/material/colors';
import { toast } from 'react-toastify';

LicenseInfo.setLicenseKey('e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y');

function updateRowPosition(initialIndex, newIndex, rows) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const rowsClone = [...rows];
      const row = rowsClone.splice(initialIndex, 1)[0];
      rowsClone.splice(newIndex, 0, row);
      resolve(rowsClone);
    }, Math.random() * 500 + 100); // simulate network latency
  });
}

export default function GradeStructure() {

    const columns = [
      { field: 'name', headerName: 'Name', minWidth: 200, flex: 1, editable: true },
      { field: 'scale', headerName: 'Scale', minWidth: 200, flex: 1, editable: true },
      { field: 'delete', headerName: 'Delete', minWidth: 120, flex: 0.2,
        renderCell: () => {
          const onClick = () => {
            return toast.success('Deleted!');
          };
          
          return (
              <IconButton variant="outlined" size="small" onClick={onClick} sx={{color: red[500]}}>
                <Delete />
              </IconButton>
          );
        }, 
    },
    ];
    
    const dataRows = [
      { name: 'Assignments', scale: 0.3,  },
      { name: 'Midtrem Project', scale: 0.3 },
      { name: 'Final Project', scale: 0.4 },
    ];
      
    const [rows, setRows] = React.useState(dataRows);

    // React.useEffect(() => {
    //   setRows(dataRows);
    // }, [dataRows]);

    const apiRef = useGridApiRef();

    const handleRowOrderChange = async (params) => {
      const newRows = await updateRowPosition(
        params.oldIndex,
        params.targetIndex,
        rows,
      );
  
      setRows(newRows);
    };

    return (
      <Box>
        <Box sx={{display: 'flex', justifyContent: 'flex-end', margin: '20px'}}>
          <Button variant="contained" sx={{textTransform: 'none'}} >
              <Add sx={{mr: '10px'}}/>
              <Typography sx={{mr: '10px', fontSize: '14px'}}>Add grade composition</Typography> 
          </Button>
        </Box>
        <Paper sx={{ overflow: 'hidden',  width: '100%', boxShadow: 0 }}>
            <DataGridPremium
                getRowId={(row) => row.name}
                rows = {rows}
                columns={columns}
                apiRef={apiRef}
                disableRowSelectionOnClick
                hideFooter
                rowReordering
                onRowOrderChange={handleRowOrderChange}
            />
        </Paper>
      </Box>
    );
}