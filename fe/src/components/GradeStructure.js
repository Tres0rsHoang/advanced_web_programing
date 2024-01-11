import * as React from 'react';
import {
  DataGridPremium,
  useGridApiRef
} from '@mui/x-data-grid-premium';
import { LicenseInfo } from '@mui/x-data-grid-premium';
import { Box, Button, IconButton, Paper } from '@mui/material';
import { Delete, Done } from '@mui/icons-material';
import { red } from '@mui/material/colors';
import { toast } from 'react-toastify';
import { gradeStructureApi, removeGradeApi } from '../api/gradeService';
import AddGradeComposition from './AddGradeComposition';

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

export default function GradeStructure({classId}) {
  const [gradeStructure, setGradeStructure] = React.useState([]);

  React.useEffect(() => {
      async function fetchData() {
          var response = await gradeStructureApi(classId, 'grade_scale ASC');
          setGradeStructure(response.data.data);
      }
      fetchData();
  }, []);

  const columns = [
    { field: 'name', headerName: 'Name', minWidth: 200, flex: 1, editable: true },
    { field: 'scale', headerName: 'Scale', minWidth: 200, flex: 1, editable: true },
    { field: 'delete', headerName: 'Delete', minWidth: 120, flex: 0.2,
      renderCell: (params) => {
        const onClick = async () => {
          const selectedRowId = params.row.id;
          let response = await removeGradeApi(classId, selectedRowId);
          if (response.status === 200) {
            const updatedRows = rows.filter(row => row.id !== selectedRowId);
            setRows(updatedRows);

            toast.success('Delete successful');
          }
        };
        
        return (
            <IconButton variant="outlined" size="small" onClick={onClick} sx={{color: red[500]}}>
              <Delete />
            </IconButton>
        );
      }, 
  },
  ];

  function createData(id, name, scale) {
    return { id, name, scale }
  };

  if(gradeStructure.length === 0) {
    setGradeStructure([createData('', '', '')]);
  }

  const dataRows = gradeStructure.map(element => 
    createData(element.id, element.name, element.grade_scale)
  );

  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    setRows(dataRows);
  }, [gradeStructure]);

  const apiRef = useGridApiRef();

  const handleRowOrderChange = async (params) => {
    const newRows = await updateRowPosition(
      params.oldIndex,
      params.targetIndex,
      rows,
    );

    setRows(newRows);
  };

  const handleSave = () => {
    
  }


  return (
    <Box>
      <Box sx={{display: 'flex', justifyContent: 'flex-end', margin: '20px'}}>
        <AddGradeComposition classId={classId} />
        <Button variant="contained" sx={{textTransform: 'none', ml: '10px'}}
          onClick={handleSave}
        >
          <Done />
        </Button>
      </Box>
      <Paper sx={{ overflow: 'hidden',  width: '100%', boxShadow: 0 }}>
          <DataGridPremium
              getRowId={(row) => row.id}
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