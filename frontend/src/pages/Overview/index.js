import React from 'react'
import styles from './style.module.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import DisposalItem from '../../components/Overview/DisposalItem';
import Chart from '../../components/Overview/Chart'
import Skeleton from '@mui/material/Skeleton';
import JanitorTable from '../../components/Overview/Table/JanitorTask'
import CollectorTable from '../../components/Overview/Table/CollectorTask'


import Button from '@mui/material/Button';

const OverviewPage = () => {
    const [staffs, setStaffs] = useState()
    const [disposals, setDisposals] = useState()
    const [mcps, setMcps] = useState()
    const [vehicles, setVehicles] = useState()


    const [tableTask, setTableTask] = useState('collector')

    const [taskValue, setTaskValue]  = useState()
    setTimeout(() => {
        setTaskValue(45)
    }, 220)
    useEffect(()=>{
        axios.get(`https://63823d929842ca8d3ca4bcfc.mockapi.io/staffs`)
            .then(res => {
                setStaffs(res.data)
                return axios.get(`https://63823d929842ca8d3ca4bcfc.mockapi.io/DisposalFacility`)
                    .then(res => {
                        setDisposals(res.data)
                        res.data.map((disposal, index) => {
                            if (index === 0) setMcps(disposal.Mcps)
                            else if (index < res.data.length -1)
                                setMcps(prev => [...prev, ...disposal.Mcps])
                            return 0
                        })
                    })
                    .catch(err => console.log(err))
                })
            .catch(err => console.log(err))
        
        axios.get('https://63823d929842ca8d3ca4bcfc.mockapi.io/vehicles')
            .then(res => {
                setVehicles(res.data)
            })

    }, [])


    return (
        <div className = {styles.wrapper}>
            <div className = {styles.top}>
                <div className = {styles.progressTask}>
                    <p className = {styles.titleSection}>In Progress Task</p>
                    <p style={{fontSize:"32px", fontWeight:"700", marginBottom:"25px"}}>65</p>
                    <div style={{display:"flex"}}>
                            <div style={{position: 'relative'}}>
                            <CircularProgress size={60} variant="determinate" value={100} thickness={2.6}
                                disableShrink={true}
                                style={{position: 'absolute',color: '#e6e8f8'}}
                            />
                            <CircularProgress size={60} variant="determinate" value={taskValue} thickness={2.6}
                                // disableShrink={true}
                                style={{position: 'relative', color: '#0E1B6B'}}
                            />
                            </div>
                        <p className={styles.progressTaskNum}>{taskValue}%</p>

                        <div style={{marginLeft: '14px'}}>
                            <p style={{fontSize: '20px', fontWeight:'600'}}>100</p>
                            <p style={{color: '#8E92BC'}}>Task</p>
                        </div>
                    </div>

                </div>
                <div className = {styles.doneTask}>
                    <p className = {styles.titleSection}>Done Task</p>
                    <Chart />

                </div>
                <div className = {styles.stat}>
                    <div style ={{display: 'flex', justifyContent:'space-between', width:'100%  '}}>
                        <div className = {styles.stateItem} style={{background: "#E3F5FF"}}>
                            <p className = {styles.titleSection}>Collector</p>
                            <p  className = {styles.numState}>{staffs !== undefined && staffs.filter(item => !item.isCollector).length}</p>
                        </div>
                        <div className = {styles.stateItem} style={{paddingRight: '0px', background:'#e9eef3'}}>
                            <p className = {styles.titleSection}>Disposal Facility</p>
                            <p className = {styles.numState}>{disposals !== undefined &&disposals.length}</p>
                        </div>         
                        <div className = {styles.stateItem} style={{background: "#E3F5FF"}}>
                            <p className = {styles.titleSection}>Collecting</p>
                            {
                                vehicles !== undefined &&
                                <p className = {styles.numState}>{vehicles.filter(item => item.isCollectVehicle).length}</p>
                            }
                        </div> 
                    </div>
                    <div style ={{display: 'flex', justifyContent:'space-between', width:'100%', height:'100px'}}>
                        <div className = {styles.stateItem} style={{background: "#e9eef3"}}>
                            <p className = {styles.titleSection}>Janitor</p>
                            <p className = {styles.numState}>{staffs !== undefined && staffs.filter(item => item.isCollector).length}</p>
                        </div> 
                        <div className = {styles.stateItem} style={{background: "#E3F5FF"}} >
                            <p className = {styles.titleSection}>MCPs</p>
                            <p className = {styles.numState}>{mcps !== undefined && mcps.length}</p>
                        </div> 
                        <div className = {styles.stateItem} style={{background: "#e9eef3"}}>
                            <p className = {styles.titleSection}>Troller</p>
                            {
                                vehicles !== undefined &&
                                <p className = {styles.numState}>{vehicles.filter(item => !item.isCollectVehicle).length}</p>
                            }
                        </div> 
                    </div>

                </div>
            </div>
            <div className = {styles.middle}>
                <div className = {styles.disposalList}>
                    {
                        disposals !== undefined ?  disposals.map(disposal => (<DisposalItem data = {disposal}/>))
                        : (
                            Array(5).fill(1).map(() =>
                                <Skeleton animation="wave" variant="rectangular" style={{width:'280px', height:'165px', borderRadius: '10px', marginTop: 20, marginRight: 18}}/>
                            )
                        )
                    }
                </div>

            </div>
                {
                    disposals === undefined && <Skeleton animation="wave" height={8} width="90%" style={{marginTop: '-15px'}} />
                }
            <div className = {styles.bottom}>
            </div>

            <div style={{position:'relative'}}>
                {
                    tableTask === 'collector' ?
                        <>
                            <CollectorTable staffs ={staffs} disposals = {disposals} mcps = {mcps} vehicles = {vehicles} />
                            <Button variant="contained" sx={{position:'absolute', margin: '10px', zIndex:10, bottom:'2px'}}
                                onClick={() => setTableTask('janitor')}
                            >Janitor Task</Button>
                        </> :
                        <>
                            <JanitorTable staffs ={staffs} disposals = {disposals} mcps = {mcps} vehicles = {vehicles} />
                            <Button variant="contained" sx={{position:'absolute', margin: '10px', zIndex:10, bottom:'2px'}}
                                onClick={() => setTableTask('collector')}
                            >Collector Task</Button>
                        </>
                }
                
            </div>
        </div>
    )
}

export default OverviewPage