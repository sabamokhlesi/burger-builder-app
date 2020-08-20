import React from 'react'
import CheckOutSummary from './check-out-summary/check-out-summary'
import styles from './check-out.module.scss'
import { Route } from 'react-router-dom';
import ContactData from '../check-out/contact-data/contact-data'
import {connect} from 'react-redux'
class CheckOut extends React.Component{
    

    

    checkOutContinueHandler = ()=>{
        this.props.history.replace('/checkOut/contact-data')
    }

    checkOutCancelHandler = ()=>{
        this.props.history.goBack()
    }

    render(){
        return(
            <div className={styles.checkOut}>
                <CheckOutSummary ingredients={this.props.ing} checkOutContinueClicked={this.checkOutContinueHandler} checkOutCancelClicked={this.checkOutCancelHandler}/>
                <Route path={this.props.match.path+'/contact-data'} component={ContactData}/>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        ing: state.ingredients
    }
}

export default connect(mapStateToProps)(CheckOut)