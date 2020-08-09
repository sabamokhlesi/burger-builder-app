import React from'react'
import styles from './spinner.module.scss'

const spinner = (props) => {
    return (
        <div className={styles.Loader}>
            Loading...
        </div>
    )
}


export default spinner