import styles from './style.module.css'
import { Avatar } from '@mui/material';
function VehicleItem({data}) {
    return ( <div className={styles.wrapper}>
        <div className={styles.heading}>
            <Avatar src={data.image} alt={data.name} sx={{ width: 24, height: 24 }} />
            <div style={{marginLeft: '10px'}}>{data.name}</div>
        </div>
        <span>Loading: {data.loading}</span>
    </div> );
}

export default VehicleItem;