import { Button, Paper, IconButton, Autocomplete, TextField, FormGroup, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import styles from './style.module.css';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { OutlinedInput, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import VehicleItem from "../VehicleItem";
import axios from 'axios'
// import { useSnackbar } from 'notistack';
// import { SnackbarProvider } from 'notistack';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function CreateJanitorTask({ disposals, vehicles }) {
    const [disposal, setDisposal] = useState()
    const [time, setTime] = useState(new Date());
    const [vehicle, setVehicle] = useState('')
    const [mcp, setMcp] = useState('')
    const [loading, setLoading] = useState(false)

    // const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    // const toast = (message, variantType) => {
    //     enqueueSnackbar(message, {
    //         variant: variantType,
    //         action: (key) => (
    //             <Button style={{ fontSize: '12px', fontWeight: '600' }} size='small' onClick={() => closeSnackbar(key)}>
    //                 Dismiss
    //             </Button>
    //         )
    //     });
    // };

    const handleSubmit = () => {
        setLoading(true)
        axios.post('https://638265da281f14ffefa75b07.mockapi.io/janitor_tasks', {
            disposal_id: disposal.id,
            time,
            vehicle_id: vehicle,
            mcp
        })
            .then(res => {
                // toast('Tạo task thành công', 'success')
                console.log('Tạo task thành công', res)
                setLoading(false)
            })
            .catch(err => {
                // toast('Tạo task thất bại', 'error')
                console.log('Tạo task thất bại')
                setLoading(false)
            })
    }

    let navigate = useNavigate()
    return (
        <div className={styles.formWrapper}>
            <Paper sx={{ width: '80%', borderRadius: 3, margin: '15px 0', position: 'relative', padding: '20px' }}>
                <Autocomplete
                    disablePortal
                    id="disposal-facility"
                    options={disposals.map(disposal => disposal.name)}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Choose Disposal Facility" />}
                    onChange={(e) => {
                        const disposalName = e.target.outerText
                        setDisposal(disposals.find(disposal => disposal.name === disposalName))
                        setMcp('')
                    }}
                />

                <FormGroup style={{ margin: '15px 0' }}>
                    <span>Select MCP</span>
                    <RadioGroup row style={{ display: 'flex', flexWrap: 'wrap' }} value={mcp}>
                        {disposal ? (disposal.Mcps.map(mcp => {
                            return <FormControlLabel key={mcp.id} control={<Radio />} value={mcp.name} label={mcp.name}
                                onChange = {(e)=> {
                                    setMcp(e.target.value)
                                }}
                            />
                        })) : (<span style={{ fontSize: '12px' }}>
                            Empty
                        </span>)}
                    </RadioGroup>
                </FormGroup>

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Vehicle</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={vehicle}
                        label="Vehicle"
                        MenuProps={MenuProps}
                        onChange={(e) => { setVehicle(e.target.value) }}
                    >
                        {vehicles.map(v => {
                            return <MenuItem key={v.id} value={v.id}><VehicleItem data={v} /></MenuItem>
                        })}
                    </Select>
                </FormControl>

                <OutlinedInput value={time} onChange={(e) => setTime(e.target.value)} type='date' style={{ width: '100%', marginTop: '30px' }} />

                <div className={styles.formFooter}>
                    <Button variant='contained' className={styles.createbtn} onClick={handleSubmit}>{loading ? (<CircularProgress color="success" />) : ('Create')}</Button>
                    <IconButton onClick={() => { navigate('/task') }}><UndoOutlinedIcon /></IconButton>
                </div>
            </Paper>
        </div>
    )
}

export default CreateJanitorTask;