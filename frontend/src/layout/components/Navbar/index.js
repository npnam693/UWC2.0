import React from 'react'
import styles from './style.module.css'

const Navbar = () => {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf('/') + 1);
    var content 
    if (id === "") content = 'OVERVIEW'
    if (id === "chat") content = 'MESSAGE'
    if (id === "task") content = 'ASSIGNMENT TASK'
    if (id === "profile") content = 'PROFILE'
    return (
        <div className={styles.navbar}>
            <p className = {styles.navbarTitle}>{content}</p>
        </div>
    )
}

export default Navbar