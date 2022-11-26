import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import styles from './style.module.css'


function DefaultLayout({children}) { 
    return (
        // <div className={styles.wrapApp}>
        //     <div className={styles.app}>
        //         <Sidebar />
        //         <div className = {styles.inner}>
        //             <Navbar />
        //             <div style={{flex:11}}>{children}</div>
        //         </div>
        //     </div> 
        // </div> 
        <div className={styles.app}>
            <Sidebar />
            <div className = {styles.inner}>
                <Navbar />
                <div style={{flex:11, marginLeft: '25px'}}>{children}</div>
            </div>
        </div> 

    );
}

export default DefaultLayout;