import React from 'react'
import styles from './style.module.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';


const OverviewPage = () => {
    let navigate = useNavigate()
    const [staffs, setStaffs] = useState()
    const [disposals, setDisposals] = useState()
    const [mcps, setMcps] = useState()
    const [reload, setReload] = useState(false)
    
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

    const data = {
        name: "name",
        avatar: "name",
        isCollector: "true",
        onDuty: "true",
    }


    return (
        <>
            {
            (staffs == null || disposals == null) ? 
                null : 
                <div> 
                    <p>Num Staffs: {staffs.length}</p>
                    <p>Num Disposal: {disposals.length}</p>
                    <p>Num Staffs: {staffs.length}</p>
                    <p>Num Janitor: {staffs.filter(item => item.isCollector).length}</p>
                    <p>Num Collector: {staffs.filter(item => !item.isCollector).length}</p>
                </div>

            }
        </>
    )
}

export default OverviewPage