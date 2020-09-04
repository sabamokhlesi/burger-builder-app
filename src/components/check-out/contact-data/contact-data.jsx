import React from 'react'
import styles from './contact-data.module.scss'
import axios from '../../../axios-orders'
import Spinner from '../../spinner/spinner'
import Input from '../../input/input'
import {connect} from 'react-redux'
import withErrorHandler from '../../withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'
class ContactData extends React.Component{
    state = {
        form: 
        {name: {
            inputtype: 'input',
            inputConfig:{
                type: 'text',
                placeholder: 'Name'
            },
            value: '',
            rules:{
                required:true
            },
            valid: false,
            touched: false
        },
        email: {
            inputtype: 'input',
            inputConfig:{
                type: 'email',
                placeholder: 'Email'
            },
            value: '',
            rules:{
                required:true
            },
            valid: false,
            touched: false
        },
        street : {
            inputtype: 'input',
            inputConfig:{
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            rules:{
                required:true
            },
            valid: false,
            touched: false
        },
        unit: {
            inputtype: 'input',
            inputConfig:{
                type: 'number',
                placeholder: 'Unit Number'
            },
            value: '',
            rules:{
                required:true
            },
            valid: false,
            touched: false
        },
        PO: {
            inputtype: 'input',
            inputConfig:{
                type: 'text',
                placeholder: 'Postal Code'
            },
            value: '',
            rules:{
                required:true,
                minlength: 5,
                maxlegth:6
            },
            valid: false,
            touched: false
        }},
        validInputs: false
    }

    orderClicked = (event) =>{
        event.preventDefault()
        const ingredients = this.props.ingredients
        const totalPrice = this.props.price
        const formData = {}
        for (let item in this.state.form){
            formData[item] = this.state.form[item].value
        }

        const order = {
            ingredients: ingredients,
            totalPrice: totalPrice,
            orderData: formData,
            userId:this.props.userId

        }
        this.props.onOrderburger(order,this.props.token)
    }

    validityHandler = (value, rules) =>{
        let isvalid = true
        if (rules.required){
            isvalid = value.trim()!=='' && isvalid
        }
        if (rules.minlength){
            isvalid = value.trim().length >= rules.minlength && isvalid
        }
        if (rules.maxlength){
            isvalid = value.trim().length <= rules.maxlength && isvalid
        }
        return isvalid
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.form
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.validityHandler(updatedFormElement.value,updatedFormElement.rules)
        updatedFormElement.touched = true
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let validInputs = true
        for(let inputIdentifier in updatedOrderForm ){
            validInputs = updatedOrderForm[inputIdentifier].valid && validInputs
        }
        this.setState({form: updatedOrderForm, validInputs:validInputs});
    }

    render(){
        const formArray = []
        for (let key in this.state.form) {
            formArray.push({id: key, config: this.state.form[key]})}
        let form = (
        <form action="">
            {formArray.map(element =>(<Input valid={element.config.valid} key={element.id} touched={element.config.touched} inputtype={element.config.inputtype} type={element.config.inputConfig.type} placeholder={element.config.inputConfig.placeholder} changed={(event) => this.inputChangedHandler(event, element.id)} value={element.config.value}/>))}
            <button onClick={this.orderClicked} ingredients={this.props.ingredients} disabled={!this.state.validInputs}>Order</button>
        </form>)
        if (this.props.loading) {
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

const mapStateToProps = state => {
    return{
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.orders.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return{onOrderburger: (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))}
} 

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios))