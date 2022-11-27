import { useState, useEffect } from 'react';
import axios from 'axios';

// const UserPage = () => {

    
//         const data = {
//             name: "name",
//             avatar: "name",
//             isCollector: "true",
//             onDuty: "true",
//         }
    
//         const addStaff = () =>{
//             axios.post(`https://63823d929842ca8d3ca4bcfc.mockapi.io/staffs`, data)
//                .then(res => {
//                    console.log(res)
//                    setReload(!reload)
//                    console.log(reload)
//                })
//                .catch(err => console.log(err))
//         }   
//         return (
//             <>
//                 {
//                 (staffs == null || disposals == null) ? 
//                     null : 
//                     <div> 
//                         <p>Num Staffs: {staffs.length}</p>
//                         <p>Num Disposal: {disposals.length}</p>
//                         <p>Num Staffs: {staffs.length}</p>
//                         <div style={{display:'flex', flexDirection: 'row'}}>
//                             <div>
//                                 <p>Num Janitor: {staffs.filter(item => item.isCollector).length}</p>
//                                 {
//                                     staffs.map((item,index) => !item.isCollector ?<p>{index} {item.name}</p>:null )
//                                 }
//                             </div>
//                             <div>
//                                 <p>Num Collector: {staffs.filter(item => !item.isCollector).length}</p>
//                                 {
//                                     staffs.map((item,index) => item.isCollector ?<p>{index} {item.name}</p>:null )
//                                 }
//                             </div>
//                         </div>
                        
//                         <button onClick={addStaff}>addStaff</button>
    
//                     </div>
    
//                 }
//             </>
//         )   
// }

// export default UserPage

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    {   field: 'id', headerName: 'ID', width: 80,
        valueGetter: (params) => {
        if (params.row.isCollector === true) return 'CLT' + params.row.id
        else return 'JNT' + params.row.id 
        }
    },
    { field: 'name', headerName: 'FullName', width: 200 },
    {
        field: 'isCollector',
        headerName: 'Role',
        width: 130,
        valueGetter: (params) => {
            if (params.row.isCollector === true) return 'Collector'
            else return 'Janitor'
        }
    },
    {
        field: 'onDuty',
        headerName: 'Status',
        width: 130,
        valueGetter: (params) => {
            if (params.row.onDuty === true) return 'On Duty'
            else return 'Free'
        }
    },

];


export default function DataTable() {
    const [staffs, setStaffs] = useState()
    const [disposals, setDisposals] = useState()
    const [mcps, setMcps] = useState()
    const [reload, setReload] = useState(false)
    const [selection, setSelection] = useState()

    useEffect(() => {
        console.log(selection); // <-- The state is updated
    }, [selection])

    useEffect(()=>{
        axios.get(`https://63823d929842ca8d3ca4bcfc.mockapi.io/staffs`)
            .then(res => {
                setStaffs(res.data)
                return axios.get(`https://63823d929842ca8d3ca4bcfc.mockapi.io/DisposalFacility`)
                    .then(res => {
                        setDisposals(res.data)
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }, [reload])
    
    return (
        <div style={{ height: '90%', width: '80%'}}>
{        staffs == null ? null :
        <DataGrid
            rows={staffs}
            columns={columns}
            pageSize={12}
            checkboxSelection
            onSelectionChange={(newSelection) => {
                console.log('alo')
                setSelection(newSelection.rows);
                setReload(!reload)
            }}
        />}
        </div>
    );
}
