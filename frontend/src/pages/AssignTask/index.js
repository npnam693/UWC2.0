import { Box, Stack, Typography, Button } from '@mui/material'
import { useState, useEffect } from 'react';
import * as React from 'react'
import TaskJanitor from './TaskJanitor';
import TaskCollector from './TaskCollector';
import styles from './style.module.css'

function AssignTaskPage() {
    const [triggerJanitor, setTriggerJanitor] = useState(false)
    const [triggerCollector, setTriggerCollector] = useState(false)
    
    const handleJanitor = () => {
        setTriggerJanitor(true)
        setTriggerCollector(false)
    }

    const handleCollector = () => {
        setTriggerJanitor(false)
        setTriggerCollector(true)
    }
    return (
        <Stack>
            <Stack flexDirection='row' justifyContent='center'>
                <Typography
                    borderRadius='5px'
                    sx={{
                        backgroundColor: triggerJanitor ? 'aliceblue' : '#4658AC',
                        color: triggerJanitor ? '#4658AC' : '#fafafa',
                        cursor: 'pointer'
                    }}
                    p='10px 25px'
                    textAlign='center'
                    m='20px 0'
                    fontSize='15px'
                    fontWeight={600}
                    mr='30px'
                    onClick={handleJanitor}
                    border='1px solid #4658AC'
                >
                    Janitor
                </Typography>
                <Typography
                    borderRadius='5px'
                    backgroundColor='#4658AC'
                    sx={{
                        backgroundColor: triggerCollector ? 'aliceblue' : '#4658AC',
                        color: triggerCollector ? '#4658AC' : '#fafafa',
                        cursor: 'pointer'
                    }}
                    p='10px 25px'
                    textAlign='center'
                    m='20px 0'
                    fontSize='15px'
                    fontWeight={600}
                    onClick={handleCollector}
                    border='1px solid #4658AC'
                >
                    Collector
                </Typography>
            </Stack>
            <TaskJanitor triggerJanitor={triggerJanitor}/>
            <TaskCollector triggerCollector={triggerCollector} />
        </Stack>
    )
}

export default AssignTaskPage;
