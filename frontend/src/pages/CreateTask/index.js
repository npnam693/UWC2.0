import { Tab, Box } from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import { useState } from "react";
import CreateCollectorTask from "../../components/CreateTask/CreateCollectorTask";
import CreateJanitorTask from "../../components/CreateTask/CreateJanitorTask";

function CreateTask() {
    const [value, setValue] = useState("1")
    const handleChange = (e, value) => {
        setValue(value)
    }
    return 
    <>
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="Choose one of two field below">
                    <Tab style={{ fontSize: '20px' }} label="Collector Task" value="1" />
                    <Tab style={{ fontSize: '20px' }} label="Janitor Task" value="2" />
                </TabList>
            </Box>
            <TabPanel value="1"><CreateCollectorTask /></TabPanel>
            <TabPanel value="2"><CreateJanitorTask /></TabPanel>
        </TabContext>
    </>;
}

export default CreateTask;