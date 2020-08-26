import React from 'react'
import styles from './nav-items.module.scss'
import NavItem from './nav-item/nav-item'
const navItems = (props) =>(
    <div className={styles.navItems}>
        <NavItem link='/' exact>Burger Builder</NavItem>
        <NavItem link='/checkOut'>Check Out</NavItem>
        <NavItem link='/orders'>orders</NavItem>
        <NavItem link='/auth'>SignIn/out</NavItem>
    </div>
)

export default navItems