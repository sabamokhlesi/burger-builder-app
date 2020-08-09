import React from 'react'
import styles from './nav.module.scss'
import NavItems from './nav-items/nav-items' 

const nav = (props) =>(
    <div className={styles.nav}>
        <NavItems/>
    </div>
)
export default nav