import React from 'react'
import styles from './style.module.css'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

const Navbar = () => {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf('/') + 1);
    var content 
    if (id === "") content = 'OVERVIEW'
    if (id === "chat") content = 'MESSAGE'
    if (id === "task") content = 'ASSIGNMENT TASK'
    if (id === "profile") content = 'PROFILE'
    if (id === "user") content = 'USER'
    return (
        <div className={styles.navbar}>
            <p className = {styles.navbarTitle}>{content}</p>
            <NotificationsNoneIcon sx={{fontSize: '2.0rem', color:'#4658AC', marginRight: '10px'}}/>
        </div>
    )
}

export default Navbar