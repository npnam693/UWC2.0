import { Box, Stack, Typography, Button } from '@mui/material'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from 'react';
import * as React from 'react'
import axios from 'axios'
import styles from './style.module.css'

function TaskCollector({ triggerCollector }) {
  const [taskJanitor, setTaskJanitor] = useState()
  const [arrTaskJanitor, setArrTaskJanitor] = useState([])
  const tempTaskJanitor = []
  const [choseTask, setChoseTask] = useState();

  const [listJanitor, setListJanitor] = useState()
  const [arrJanitor, setArrJanitor] = useState([])
  const tempNameJanitor = []
  const [choseJanitor, setChoseJanitor] = useState();

  const [listAssign, setListAssign] = useState([])

  const handleAssign = () => {
    var test = true
    if (choseJanitor === undefined || taskJanitor === undefined) {
      test = false
      alert('Please choose task and janitor')
    }
    listAssign.forEach(item => {
      if (item.task === choseTask) {
        test = false
        alert('This Task has been selected')
      }
    })
    if (test) {
      setListAssign([...listAssign, {
        task: choseTask,
        janitor: choseJanitor
      }])
    }
  }


  useEffect(() => {
    const fetchTaskJanitor = async () => {
      const resTaskJanitor = await axios(
        `https://638265da281f14ffefa75b07.mockapi.io/collector_tasks`
      );

      if (resTaskJanitor.data) {
        setTaskJanitor(resTaskJanitor.data);
        resTaskJanitor.data.forEach((item, index) => {
          tempTaskJanitor.push(`Task ${index + 1}`)
        })
        setArrTaskJanitor(tempTaskJanitor)
      }
    };
    fetchTaskJanitor()

    const fetchListJanitor = async () => {
      const resListJanitor = await axios(
        `https://63823d929842ca8d3ca4bcfc.mockapi.io/staffs`
      );

      if (resListJanitor.data) {
        setListJanitor(resListJanitor.data)
        resListJanitor.data.forEach((item) => {
          if (item.isCollector == true) tempNameJanitor.push(item.name)
        })
        setArrJanitor(tempNameJanitor)
      }
    }
    fetchListJanitor()
  }, []);
  return (
    triggerCollector ? <Stack alignItems='center'>
      <Stack width='100%' flexDirection='row' justifyContent='space-around'>
        <Box>
          <Stack flexDirection='row'>
            <Typography m='20px 0' fontSize='22px' fontWeight={600}>List of tasks</Typography>
          </Stack>
          <Stack spacing={2} sx={{ width: 300 }}>
            <div>
              <Autocomplete
                value={choseTask}
                onChange={(event, newValue) => {
                  setChoseTask(`${newValue}`);
                }}
                id="controllable-states-demo"
                options={arrTaskJanitor}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Task for Janitor" />}
              />
              {
                choseTask ?
                  <Typography className={styles.mainButton}
                    border='1px solid #4658AC' borderRadius='5px' backgroundColor='#4658AC' color='#fafafa' p='10px 5px' textAlign='center' m='20px 0' fontSize='15px' fontWeight={600}>{choseTask}</Typography>
                  : <Typography className={styles.mainButton}
                    border='1px solid #4658AC' borderRadius='5px' backgroundColor='#4658AC' color='#fafafa' p='10px 5px' textAlign='center' m='20px 0' fontSize='15px' fontWeight={600}>Please Choose Task</Typography>
              }
            </div>
          </Stack>
        </Box>

        <Box >
          <Stack flexDirection='row'>
            <Typography m='20px 0' fontSize='22px' fontWeight={600}>List of Collector</Typography>
          </Stack>
          <Stack spacing={2} sx={{ width: 300 }}>
            <div>
              <Autocomplete
                value={choseJanitor}
                onChange={(event, newValue) => {
                  setChoseJanitor(newValue);
                }}
                id="controllable-states-demo"
                options={arrJanitor}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Task for Janitor" />}
              />
              {
                choseJanitor ?
                  <Typography
                    className={styles.mainButton}
                    border='1px solid #4658AC'
                    borderRadius='5px'
                    backgroundColor='#4658AC'
                    color='#fafafa'
                    p='10px 5px'
                    textAlign='center'
                    m='20px 0'
                    fontSize='15px'
                    fontWeight={600}
                  >
                    {choseJanitor}
                  </Typography>
                  : <Typography
                    className={styles.mainButton}
                    border='1px solid #4658AC'
                    borderRadius='5px'
                    backgroundColor='#4658AC'
                    color='#fafafa'
                    p='10px 5px'
                    textAlign='center'
                    m='20px 0'
                    fontSize='15px'
                    fontWeight={600}
                  >
                    Please Choose Janitor
                  </Typography>
              }
            </div>
          </Stack>
        </Box>
      </Stack>
      <Typography
        className={styles.mainButton}
        border='1px solid #4658AC'
        onClick={handleAssign}
        borderRadius='5px'
        backgroundColor='#4658AC'
        color='#fafafa'
        p='10px 30px'
        textAlign='center'
        m='20px 0'
        fontSize='15px'
        fontWeight={600}
        letterSpacing={2}
        textTransform='uppercase'
      >
        assign
      </Typography>

      <Stack mt='30px' width='80%'>
        <Stack p='10px' borderBottom='3px solid #4658AC' flexDirection='row' alignItems='center'>
          <Typography textAlign='center' width='50%' fontSize='18px' fontWeight={600} variant='h2' textTransform='uppercase'>Task</Typography>
          <Typography ml='15%' fontSize='18px' fontWeight={600} variant='h2' textTransform='uppercase'>Name</Typography>
        </Stack>
        {
          listAssign.length !== 0 ? listAssign.map((item, index) => {
            return (
              <Stack p='10px' borderBottom='3px solid #4658AC' flexDirection='row' alignItems='center'>
                <Typography ml='23%' width='50%' fontSize='16px' fontWeight={500} variant='h2'>{item.task}</Typography>
                <Typography ml='7%' width='50%' fontSize='16px' fontWeight={500} variant='h2'>{item.janitor}</Typography>
              </Stack>
            )
          }) : ''
        }
      </Stack>
    </Stack>
      : ''
  )
}

export default TaskCollector;
