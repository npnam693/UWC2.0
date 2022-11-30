import { Button, Paper, IconButton, Autocomplete, TextField, FormGroup, FormControlLabel, Checkbox} from "@mui/material";
import styles from './style.module.css';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import {useNavigate} from 'react-router-dom'
function CreateCollectorTask() {
    let navigate = useNavigate()
    return (<div className={styles.formWrapper}>
        <div style={{display: 'flex', justifyContent: 'space-between', margin: '0 15px'}}>
            <Paper sx={{ width: '40%', borderRadius: 3, margin: '15px 0', position: 'relative', padding: '20px' }}>
                <Autocomplete
                    disablePortal
                    id="disposal-facility"
                    options={['ok','not ok']}
                    sx={{ width: '100%'}}
                    renderInput={(params) => <TextField {...params} label="Choose Disposal Facility" />}
                />

                <FormGroup style={{margin: '15px 0'}}>
                    <span>Select MCPs to create route</span>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="MCP1" />
                        <FormControlLabel control={<Checkbox />} label="MCP2" />
                        <FormControlLabel control={<Checkbox defaultChecked />} label="MCP1" />
                        <FormControlLabel control={<Checkbox />} label="MCP2" />
                        <FormControlLabel control={<Checkbox defaultChecked />} label="MCP1" />
                        <FormControlLabel control={<Checkbox />} label="MCP2" />
                        <FormControlLabel control={<Checkbox defaultChecked />} label="MCP1" />
                        <FormControlLabel control={<Checkbox />} label="MCP2" />
                    </div>
                    <Button>Create route</Button>
                </FormGroup>

                <Autocomplete
                    disablePortal
                    id="vehicle"
                    options={['ok', 'not ok']}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Choose Vehicle" />}
                />
            </Paper>
            <div style={{display: 'flex', flexDirection: 'column'}}>

            </div>
        </div>
        <div className={styles.formFooter}>
            <Button variant='contained' className={styles.createbtn}>Create</Button>
            <IconButton onClick={()=>{navigate('/task')}}><UndoOutlinedIcon /></IconButton>
        </div>
    </div>);
}

export default CreateCollectorTask;