import React from'react'
import styles from './modal.module.scss'

const modal = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients).map(
        key=> {return(<li key={key}>{key}: {props.ingredients[key]}</li>)}
    )
    return (
        <div className={styles.Modal} style={{transform: props.ordering? 'translateY(0)': 'translateY(-100vh)'}}>
            <h2>Your Order:</h2>
            <ul>
                {ingredientsSummary}
            </ul>
            <div className={styles.modalButtons}>
                <button onClick={props.continueClicked}>Continue</button>
                <button onClick={props.cancelClicked}>Cancel</button>
            </div>
        </div>
    )
}


export default modal