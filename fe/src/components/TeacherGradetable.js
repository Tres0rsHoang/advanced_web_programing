import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  DataGridPremium,
  GridToolbar,
} from '@mui/x-data-grid-premium';
import { LicenseInfo } from '@mui/x-data-grid-premium';

LicenseInfo.setLicenseKey('e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y');

const columns = [
  
    { field: 'id', label: 'Student ID', width: 150, format: (value) => value.toFixed(2) },
    { field: 'firstName', label: 'First name', width: 200, format: (value) => value.toFixed(2) },
    { field: 'lastName', label: 'Last name', width: 250, format: (value) => value.toFixed(2) },
    { field: 'assignments', label: 'Assignments (30%)', width: 200, format: (value) => value.toFixed(2) },
    { field: 'midterm', label: 'Midterm Project (30%)', width: 250, format: (value) => value.toFixed(2) },
    { field: 'final', label: 'Final Project (40%)', width: 200, format: (value) => value.toFixed(2) },
    { field: 'avg', label: 'Total Grade', width: 200, format: (value) => value.toFixed(2) },
];

function createData(id, firstName, lastName, assignments, midterm, final) {
  const avg = assignments * 0.3 + midterm * 0.3 + final * 0.4;
  return { id, firstName, lastName, assignments, midterm, final, avg };
}

const rows =  [
  createData('20127003', 'Bảo', 'Hoàng Quốc', 9, 10, 8.5),
  createData('20127531', 'Khánh', 'Trương Trọng', 9, 9, 8),
  createData('20127010', 'Đạt', 'Kha Vĩnh', 8, 10, 7.5),
  createData('2012311', 'Sự', 'Nguyễn Quốc', 9, 6, 9.5),
];

export default function TeacherGradeTable() {

  return (
    <Paper sx={{ overflow: 'hidden',  width: '100%', boxShadow: 0 }}>
          <DataGridPremium
              getRowId={(row) => row.id}
              rows = {rows}
              columns={columns}
              disableRowSelectionOnClick
              hideFooter
              rowReordering
              slots={{ toolbar: GridToolbar }}
          />
      </Paper>
  );
}