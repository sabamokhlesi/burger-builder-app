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

const INGREDIENTS_PRICES ={
    meat:2,
    cheese:1,
    bacon:.7,
    salad: .5
}
class BurgerBuilder extends React.Component{
    state = {
        ingredients:null,
        totalPrice : 4,
        purchaseable: false,
        ordering: false,
        loading:false,
        error:false
    }

    componentDidMount () {
        axios.get( 'https://burger-app-8829b.firebaseio.com/ingredients.json' )
            .then( response => {
                this.setState( { ingredients: response.data } );
            } )
            .catch( error => {
                this.setState( { error: true } );
            } );
    }
    updateordering =() =>{
        this.setState({ordering:true})
    }
    updatePurchaseable= (updatedIngredients) =>{
        const igCount = Object.keys(updatedIngredients).map(key => { return updatedIngredients[key]}).reduce((igCount,el) =>{return igCount+el},0)
        this.setState({purchaseable:igCount>0})
    }
    addHandler= (type) =>{
        const newCount = this.state.ingredients[type] + 1
        const updatedIngredients = {...this.state.ingredients}
        updatedIngredients[type]=newCount
        const updatedPrice = this.state.totalPrice + INGREDIENTS_PRICES[type]
        this.setState({ingredients:updatedIngredients,totalPrice: updatedPrice})
        this.updatePurchaseable(updatedIngredients)
    }
    removeHandler= (type) =>{
        if (this.state.ingredients[type]<=0){
            return
        }else{
            const newCount = this.state.ingredients[type] - 1
            const updatedIngredients = {...this.state.ingredients}
            updatedIngredients[type]=newCount
            const updatedPrice = this.state.totalPrice - INGREDIENTS_PRICES[type]
            this.setState({ingredients:updatedIngredients,totalPrice: updatedPrice})
            this.updatePurchaseable(updatedIngredients)
        }
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
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if ( this.state.ingredients ) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BurgerControler addIngredient={this.addHandler} removeIngredient={this.removeHandler} price={this.state.totalPrice}/>
                    <OrderBtn purchaseable={this.state.purchaseable} clicked={this.updateordering}>Order Now</OrderBtn>
                </Aux>
            );
            orderSummary = <Modal ingredients={this.state.ingredients} ordering={this.state.ordering} continueClicked={this.continueClicked} cancelClicked={this.orderCanceling}/>
        }
        
        if (this.state.loading){
            orderSummary = <Spinner/>
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

export default withErrorHandler( BurgerBuilder, axios )