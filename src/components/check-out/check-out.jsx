import React from 'react'
import CheckOutSummary from './check-out-summary/check-out-summary'
import styles from './check-out.module.scss'
import { Route } from 'react-router-dom';
import ContactData from '../check-out/contact-data/contact-data'
class CheckOut extends React.Component{
    state={
        ingredients:null,
        totalPrice: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0
        for (let param of query.entries()) {
            if (param[0] === 'price'){
                price = +param[1]
            } else {
                ingredients[param[0]] = +param[1];
            }
            
        }
        this.setState({ingredients: ingredients, totalPrice: price});
    }

    checkOutContinueHandler = ()=>{
        this.props.history.replace('/checkOut/contact-data')
    }

    checkOutCancelHandler = ()=>{
        this.props.history.goBack()
    }

    render(){
        return(
            <div className={styles.checkOut}>
                <CheckOutSummary ingredients={this.state.ingredients} checkOutContinueClicked={this.checkOutContinueHandler} checkOutCancelClicked={this.checkOutCancelHandler}/>
                <Route path={this.props.match.path+'/contact-data'} render={(props)=><ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>}/>
            </div>
        )
    }
}

export default CheckOut