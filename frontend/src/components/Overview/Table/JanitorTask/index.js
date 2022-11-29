import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CircleIcon from '@mui/icons-material/Circle';
import { useEffect } from 'react';
import axios from 'axios';

import styles from './style.module.css'

const columns = [
  { id: 'id', label: 'Task ID', minWidth: 80 },
  { id: 'user', label: 'Staff', minWidth: 180 },
  {
    id: 'disposal',
    label: 'Disposal Facility',
    minWidth: 140,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'des',
    label: 'Description',
    minWidth: 250,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'time',
    label: 'Time',
    minWidth: 250,
    align: 'left',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'status',
    label: 'Task Status',
    minWidth: 140,
    align: 'left',
    format: (value) => value.toFixed(2),
  },
];

function createData(id, user, disposal, des, time, status) {
  return { id, user, disposal, des, time, status };
}


export default function ColumnGroupingTable({staffs, disposals, mcps, vehicles}) {
    const [page, setPage] = React.useState(0);
    const [janitorTasks, setJanitorTasks] = React.useState();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    useEffect(()=>{
        axios.get(`https://638265da281f14ffefa75b07.mockapi.io/janitor_tasks`)
            .then(res => {
                setJanitorTasks(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    let rows = []
    if (janitorTasks !== undefined && staffs !== undefined && disposals !== undefined) {
        console.log('janitor tasks', janitorTasks)
        rows = janitorTasks.map(janTask => {
            var _id = ""
            if (janTask.id.length === 1) _id = '00' + janTask.id
            else if (janTask.id.length === 2) _id = '0' + janTask.id 
            _id = 'JNT' + _id
            
            const _user = staffs.find(staff => staff.id === janTask.janitor_id).name
            
            const _disposal = disposals.find(disposal => disposal.id === janTask.disposal_id).name
            
            const _mcp = janTask.mcp
            
            const _time = Date(janTask.time).substring(0, Date(janTask.time).length - 25)
            
            const _status = janTask.status

            return createData(_id, _user, _disposal, _mcp, _time, _status)
        })
    }



    const printStatus = (status) => {
        if (status === "Success") {
            return (<p className={styles.contentRow} style ={{color: '#4AA785'}}>
                        <CircleIcon sx={{fontSize: 7, marginRight: 1}} /> 
                        Success
                    </p>)
        }
        else if (status === "In Progress") {
            return <p className={styles.contentRow} style ={{color: '#8A8CD9'}}>
                        <CircleIcon sx={{fontSize: 7, marginRight: 1}} /> 
                        In Progress
                    </p>
        }
        else if (status === "Rejected") {
            return <p className={styles.contentRow} style ={{color: 'rgba(0, 0, 0, 0.4)'}}>
                        <CircleIcon sx={{fontSize: 7, marginRight: 1}} /> 
                            Rejected
                        </p>
            
        }
        else if (status === "Pending") {
            return <p className={styles.contentRow} style ={{color: '#59A8D4'}}>
                        <CircleIcon sx={{fontSize: 7, marginRight: 1}} /> 
                        Pending
                    </p>
        }
    }

return (
    <Paper sx={{ width: '100%', borderRadius: 3, marginTop: '15px', position: 'relative'}}>
      <TableContainer sx={{ minHeight: 300 , borderRadius: 3}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{minWidth: column.minWidth }}
                >
                  <p className = {styles.title}>{column.label} </p>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          
          
          <TableBody>
            {rows
              .slice(page * 5, page * 5 + 5)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                            {
                                column.id === 'status' ? printStatus(value) :
                                <p className = {styles.contentRow}>{value}</p>
                            }
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination 
        backIconButtonProps = {<p>ALO</p>}
        rowsPerPage={5}
        component="div"
        count={rows.length}
        page={page}
        rowsPerPageOptions={[]}
        onPageChange={handleChangePage}
        >
        </TablePagination>
    </Paper>
  );
}
