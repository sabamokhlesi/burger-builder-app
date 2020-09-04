import React from 'react'
import styles from './burger-builder.module.scss'
import Burger from './burger/burger'
import OrderBtn from './order-btn/order-btn'
import BurgerControler from './burger-controler/burger-controler'
import Modal from '../modal/modal'
import BackDrop from '../back-drop/back-drop'
import axios from '../../axios-orders'
import Spinner from '../spinner/spinner'
import withErrorHandler from '../withErrorHandler/withErrorHandler'; 
import Aux from '../hoc/auxiliary/auxiliary'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'


class BurgerBuilder extends React.Component{
    state = {
        ordering: false
    }

    componentDidMount () {
        this.props.onInitIngredients()
    }


    updateordering =() =>{
        if (this.props.isLogedIn) {
            this.setState( { ordering: true } );
        } else {
            // this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }
    updatePurchaseable= (updatedIngredients) =>{
        const igCount = Object.keys(updatedIngredients).map(key => { return updatedIngredients[key]}).reduce((igCount,el) =>{return igCount+el},0)
        return igCount
    }
    orderCanceling = () =>{
        this.setState({ordering:false})
    }

    continueClicked = () => {
        this.props.onPurchaseInit()
        this.props.history.push('/checkout')
    }

    
    render(){
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if ( this.props.ing ) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ing}/>
                    <BurgerControler addIngredient={this.props.onAddIngredients} removeIngredient={this.props.onRemoveIngredients} price={this.props.price}/>
                    <OrderBtn purchaseable={this.updatePurchaseable(this.props.ing)} clicked={this.updateordering}>Order Now</OrderBtn>
                </Aux>
            );
            orderSummary = <Modal ingredients={this.props.ing} ordering={this.state.ordering} continueClicked={this.continueClicked} cancelClicked={this.orderCanceling}/>
        }
        
    
        return(
            <div className={styles.burgerBuilder}>
                <BackDrop show={this.state.ordering} clicked={this.orderCanceling}/>
                {orderSummary}
                {burger}
            </div>
        )
    }
}


const mapStateToProps = state =>{
    return {
        ing : state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        erorr: state.burgerBuilder.erorr,
        isLogedIn: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAddIngredients: (ingName) => dispatch(actions.addIngredients(ingName)),
        onRemoveIngredients: (ingName) => dispatch(actions.removeIngredients(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onPurchaseInit: () => dispatch(actions.purchaseInit())        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ))