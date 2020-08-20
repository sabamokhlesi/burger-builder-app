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
import * as burgerBuilderActions from '../../store/actions/index'


class BurgerBuilder extends React.Component{
    state = {
        ordering: false
    }

    componentDidMount () {
        this.props.onInitIngredients()
    }


    updateordering =() =>{
        this.setState({ordering:true})
    }
    updatePurchaseable= (updatedIngredients) =>{
        const igCount = Object.keys(updatedIngredients).map(key => { return updatedIngredients[key]}).reduce((igCount,el) =>{return igCount+el},0)
        return igCount
    }
    orderCanceling = () =>{
        this.setState({ordering:false})
    }

    continueClicked = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price='+this.state.totalPrice)
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
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
        ing : state.ingredients,
        price: state.totalPrice,
        erorr: state.erorr
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAddIngredients: (ingName) => dispatch(burgerBuilderActions.addIngredients(ingName)),
        onRemoveIngredients: (ingName) => dispatch(burgerBuilderActions.removeIngredients(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ))