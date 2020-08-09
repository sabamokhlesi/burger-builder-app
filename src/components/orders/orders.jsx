import React from 'react'
import styles from './orders.module.scss'
import Order from './order/order'
import axios from '../../axios-orders'
import withErrorHandler from '../withErrorHandler/withErrorHandler'
class Orders extends React.Component{
    state={
        orders:[],
        loading:true
    }
    componentDidMount(){
        axios.get('/orders.json')
        .then(res =>{
            const fetchedOrders = []
            for (let key in res.data) {
                fetchedOrders.push({...res.data[key], ID:key})
            }
            this.setState({loading:false, orders:fetchedOrders})
        }).catch(err=>{this.setState({loading:false})})
    }
    render(){
        
        return(
            <div className={styles.Orders}>
                {this.state.orders.map(order =>{
                   return (<Order key={order.ID} orderID={order.ID} price={order.totalPrice} ingredients={order.ingredients}/>)
                })}
            </div>
        )
    }
}

export default withErrorHandler(Orders,axios)