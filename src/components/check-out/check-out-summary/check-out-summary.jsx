import React from 'react'
import styles from './check-out-summary.module.scss'
import Burger from '../../burger-builder/burger/burger'
const checkOutSummary = (props) =>{
    return(
        <div className={styles.checkOutSummary}>
            <h1>Hope You Enjoy It!</h1>
            <Burger ingredients ={props.ingredients}/>
            <div className={styles.checkOutButtons}>
                <button onClick={props.checkOutContinueClicked}>Continue</button>
                <button onClick={props.checkOutCancelClicked}>Cancel</button>
            </div>
        </div>
    )
}

export default checkOutSummary