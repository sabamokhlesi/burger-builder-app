import React from 'react'
import styles from'./nav-item.module.scss'
import {NavLink} from 'react-router-dom'
const navItem = (props) => (
    <li>
        <NavLink activeClassName={styles.navItemActive} exact={props.exact} to={props.link} className={styles.navItem}>{props.children}</NavLink>
    </li>
)

export default navItem