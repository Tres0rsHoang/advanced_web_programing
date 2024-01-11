import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { grey } from '@mui/material/colors';
import { gradeStructureApi } from '../api/gradeService';


export default function StudentGradeTable({gradeInfo, classId}) {
  const [gradeStructure, setGradeStructure] = React.useState([]);

  React.useEffect(() => {
      async function fetchData() {
          var response = await gradeStructureApi(classId, 'grade_scale ASC');
          setGradeStructure(response.data.data);
      }
      fetchData();
  }, []);

  if(!gradeStructure || gradeStructure.length === 0) {
    setGradeStructure([createColumn('', '', 0, 200)]);
  }

  function createData(id, firstName, lastName) {
    let total = 0;

    if (gradeInfo.grade_list !== undefined) {
      gradeInfo.grade_list.length > 0 ? gradeInfo.grade_list.map(element => total = total + element.grade * element.grade_scale) : total=''
    }
    return { id, firstName, lastName,  total };
  }

  function createColumn(field, name, scale, width) {
    const label = name + ' (' + (scale * 100).toString() + '%)';
    return { field, label, width, format: (value) => value.toFixed(2) };
  }

  const columns = [
  
    { field: 'id', label: 'Student ID', width: 150},
    { field: 'firstName', label: 'First name', width: 150},
    { field: 'lastName', label: 'Last name', width: 200 },
  ];

  gradeStructure.map(element => 
    columns.push(createColumn(element.id, element.name, element.grade_scale, 200)
  ));

  columns.push({ field: 'total', label: 'Total Grade', width: 150 });

  const rows =  createData(gradeInfo.in_class_id, gradeInfo.first_name, gradeInfo.last_name, );

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 0 }}>
      <TableContainer sx={{ maxHeight: 440, border: 0.5, borderColor: grey[500]}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  align={'center'}
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
                let value = rows[column.field];
                if (gradeInfo.grade_list !== undefined) {
                  if(gradeInfo.grade_list.length > 0) {
                    gradeInfo.grade_list.map((element) => {
                      if(element.id === column.field) {
                        value = element.grade
                      }
                  })
                }
              }
              return (
                <TableCell key={column.field} align={'center'} sx={{border: 0.5, borderColor: grey[500], }}>
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