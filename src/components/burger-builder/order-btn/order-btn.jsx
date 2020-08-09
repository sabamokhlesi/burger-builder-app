import React from'react'
import styles from './order-btn.module.scss'

const orderBtn = (props) => {
    return (
        <button className={styles.OrderButton } disabled={!props.purchaseable} onClick={props.clicked}>
            {props.children}
        </button>
    )
}


export default orderBtn