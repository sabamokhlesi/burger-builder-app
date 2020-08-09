import React from 'react'
import styles from './contact-data.module.scss'
import axios from '../../../axios-orders'
import Spinner from '../../spinner/spinner'
class ContactData extends React.Component{
    state = {
        name: '',
        email: '',
        address: {
            street : '',
            unit: '',
            PO: ''
        },
        loading:false
    }

    orderClicked = (event) =>{
        event.preventDefault()
        this.setState({loading:true})
        const ingredients = this.props.ingredients
        const totalPrice = this.props.price
        const order = {
            ingredients: ingredients,
            totalPrice: totalPrice,
            deliveryMethod:'fastest',
            address: {
                PO: 12345,
                street:'yonge',
                unit: 3914
            }

        }
        axios.post('./orders.json',order)
        .then(res => {
            this.setState({loading:false})
            this.props.history.push('/')
            })
        .catch(err => this.setState({loading:false}))
    }


    render(){
        let form = (
        <form action="">
            <input type="text" name='name' placeholder='Your Name'/>
            <input type="email" name='email' placeholder='Your Email'/>
            <input type="text" name='street' placeholder='Your Street'/>
            <input type="text" name='unit' placeholder='Your Unit Number'/>
            <input type="text" name='postal' placeholder='Your Postal Code'/>
            <button onClick={this.orderClicked} ingredients={this.props.ingredients}>Order</button>
        </form>)
        if (this.state.loading) {
            form = <Spinner/>
        }
        return( 
            <div className={styles.contactData} totalprice={this.props.price}>
                <h1>Enter Your Data</h1>
                {form}
            </div>
        )
    }
}

export default ContactData