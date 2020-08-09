import React from'react'
import styles from './burger-control.module.scss'

const burgerControl = (props) => {
    return (
        <div className={styles.BuildControl}>
            <div className={styles.Label}>{props.label}</div>
            <button className={styles.More} onClick={props.added} >More</button>
            <button className={styles.Less} onClick={props.removed} >Less</button>
        </div>
    )
}


export default burgerControl