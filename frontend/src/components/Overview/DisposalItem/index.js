import styles from './style.module.css'
import LinearProgress from '@mui/material/LinearProgress';
import { useState } from 'react';

const DisposalItem = ({data}) => {
    const [value, setValue] = useState(0)    
    setTimeout(()=> setValue(data.loadtask), 100)

    return (
        <div className={styles.wrapper}>
            <p className = {styles.title}>{data.name}</p>
            <p className = {styles.type}>Disposal Facility</p>
            <LinearProgress variant="determinate" value={value} style={{borderRadius:'4px', height: '10px', background:'#D9D9D9'}} size={60}/>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <p className={styles.progress}>Progress</p>
                <p className={styles.progress}>{data.loadtask}%</p>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.daycount}> 3 day left</div>
        </div>
    )
}

export default DisposalItem