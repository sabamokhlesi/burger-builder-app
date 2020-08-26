import React from 'react'
import CheckOutSummary from './check-out-summary/check-out-summary'
import styles from './check-out.module.scss'
import { Route, Redirect } from 'react-router-dom';
import ContactData from '../check-out/contact-data/contact-data'
import {connect} from 'react-redux'
import * as actions from './../../store/actions/index'
class CheckOut extends React.Component{
    

    componentWillMount(){
        this.props.onPurchaseInit()
    }

    checkOutContinueHandler = ()=>{
        this.props.history.replace('/checkOut/contact-data')
    }

    checkOutCancelHandler = ()=>{
        this.props.history.goBack()
    }

    render(){
        let orderSummary = <Redirect to='/'/>
        if (this.props.ing){
            const purchaseRedirect = this.props.purchased? <Redirect to='/'/>: null
            orderSummary = 
            <div className={styles.checkOut}>
                {purchaseRedirect}
                <CheckOutSummary ingredients={this.props.ing} checkOutContinueClicked={this.checkOutContinueHandler} checkOutCancelClicked={this.checkOutCancelHandler}/>
                <Route path={this.props.match.path+'/contact-data'} component={ContactData}/>
            </div>
        }
        return(
            orderSummary
        )
    }
}

const mapStateToProps = state =>{
    return{
        ing: state.burgerBuilder.ingredients,
        purchased:state.orders.purchased
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onPurchaseInit: ()=>dispatch(actions.purchaseInit())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CheckOut)