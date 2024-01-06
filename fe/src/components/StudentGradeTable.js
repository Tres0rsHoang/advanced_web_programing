import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { grey } from '@mui/material/colors';

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

const rows =  createData('20127531', 'Khánh', 'Trương Trọng', 9, 10, 8.5);

export default function StudentGradeTable() {

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 0 }}>
      <TableContainer sx={{ maxHeight: 440, border: 0.5, borderColor: grey[500]}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  align={column.align}
                  style={{ width: column.width }}
                  sx={{border: 0.5, borderColor: grey[500], fontWeight: 'bold'}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={rows.id}>
              {columns.map((column) => {
                const value = rows[column.field];
                return (
                  <TableCell key={column.field} align={column.align} sx={{border: 0.5, borderColor: grey[500]}}>
                    {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}