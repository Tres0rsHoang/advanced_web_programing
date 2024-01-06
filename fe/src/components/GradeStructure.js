import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { grey } from '@mui/material/colors';
import { Typography } from '@mui/material';

const columns = [
    { field: 'name', label: 'Name', width: 150, format: (value) => value.toFixed(2) },
    { field: 'assignments', label: 'Assignments', width: 200, format: (value) => value.toFixed(0) },
    { field: 'midterm', label: 'Midterm Project', width: 200, format: (value) => value.toFixed(0) },
    { field: 'final', label: 'Final Project', width: 200, format: (value) => value.toFixed(0) },
];

function createData(assignments, midterm, final) {
  return { assignments, midterm, final };
}

const rows =  createData(30, 30, 40);

export default function GradeStructure() {

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
                            ? column.format(value) + '%'
                            : <Typography sx={{fontWeight: 'bold', fontSize: '15px'}}>Scale</Typography>}
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