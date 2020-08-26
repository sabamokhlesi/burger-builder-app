import React from 'react'
import styles from './orders.module.scss'
import Order from './order/order'
import axios from '../../axios-orders'
import withErrorHandler from '../withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import * as actionTypes from '../../store/actions/index'
class Orders extends React.Component{
    
    componentDidMount(){
        this.props.onFetchOrder(this.props.token)
    }
    render(){
        
        return(
            <div className={styles.Orders}>
                {this.props.orders.map(order =>{
                   return (<Order key={order.ID} orderID={order.ID} price={order.totalPrice} ingredients={order.ingredients}/>)
                })}
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        orders: state.orders.orders,
        loading: state.orders.loading,
        token: state.auth.token
    }
}
const mapDispatchToProps =dispatch =>{
    return{
        onFetchOrder: (token) => dispatch(actionTypes.fetchOrder(token))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios))