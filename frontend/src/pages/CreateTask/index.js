import { Tab, Box } from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import { useState, useEffect } from "react";
import CreateCollectorTask from "../../components/CreateTask/CreateCollectorTask";
import CreateJanitorTask from "../../components/CreateTask/CreateJanitorTask";
import axios from 'axios'

function CreateTask() {
    const [value, setValue] = useState("1")
    const [disposals, setDisposals] = useState([])
    const [vehicles, setVehicles] = useState([])
    const handleChange = (e, value) => {
        setValue(value)
    }

    useEffect(()=>{
        axios.get('https://63823d929842ca8d3ca4bcfc.mockapi.io/DisposalFacility')
            .then((response)=>{setDisposals(response.data)})
            .catch(error => console.log(error))

        axios.get('https://63823d929842ca8d3ca4bcfc.mockapi.io/vehicles')
            .then((response) => { setVehicles(response.data) })
            .catch(error => console.log(error))
    }, [])

    return <>
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="Choose one of two field below">
                    <Tab style={{ fontSize: '20px' }} label="Collector Task" value="1" />
                    <Tab style={{ fontSize: '20px' }} label="Janitor Task" value="2" />
                </TabList>
            </Box>
            <TabPanel value="1"><CreateCollectorTask disposals={disposals} vehicles={vehicles.filter(vehicle => vehicle.isCollectVehicle)}/></TabPanel>
            <TabPanel value="2"><CreateJanitorTask disposals={disposals} vehicles={vehicles.filter(vehicle => !vehicle.isCollectVehicle)} /></TabPanel>
        </TabContext>
    </>;
}

export default CreateTask;