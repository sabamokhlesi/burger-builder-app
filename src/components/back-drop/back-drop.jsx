import React from'react'
import styles from './back-drop.module.scss'

const backDrop = (props) => {
    return (
        props.show? <div className={styles.backDrop} onClick={props.clicked}></div>: null
    )
}


export default backDrop