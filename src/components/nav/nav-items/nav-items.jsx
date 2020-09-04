import React from 'react'
import styles from './nav-items.module.scss'
import NavItem from './nav-item/nav-item'
import {connect} from 'react-redux'

class NavItems extends React.Component{
    
        render(){
            return(
                <div className={styles.navItems}>
                <NavItem link='/' exact>Burger Builder</NavItem>
                {this.props.isLogedIn?<NavItem link='/checkOut'>Check Out</NavItem>:null}
                {this.props.isLogedIn?<NavItem link='/orders'>orders</NavItem>:null}
                {!this.props.isLogedIn? <NavItem link='/auth'>SignIn/Up</NavItem>: <NavItem link='/logout'>Log Out</NavItem>}
                </div>
            )
        }
            
       
}

const mapStateToProps = state =>{
    return{
        isLogedIn: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(NavItems)