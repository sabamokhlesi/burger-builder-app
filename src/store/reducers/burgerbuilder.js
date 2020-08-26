import * as actionTypes from '../actions/actiontypes'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    loading:false,
    error:false
}

const INGREDIENTS_PRICES ={
    meat:2,
    cheese:1,
    bacon:.7,
    salad: .5
}
const reducer = (state=initialState,action) => {
    
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients, 
                    [action.ingredientName] : state.ingredients[action.ingredientName]+1
                },
                totalPrice : state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
            }
            case actionTypes.REMOVE_INGREDIENT:
                return{
                    ...state,
                    ingredients:{
                        ...state.ingredients, 
                        [action.ingredientName] : state.ingredients[action.ingredientName]-1 >= 0 ? state.ingredients[action.ingredientName]-1 : state.ingredients[action.ingredientName]
                    },
                    totalPrice : state.ingredients[action.ingredientName]-1 >= 0? state.totalPrice - INGREDIENTS_PRICES[action.ingredientName] : state.totalPrice
                }
                case actionTypes.SET_INGREDIENTS:
                    return{
                        ...state,
                        ingredients:action.ingredients,
                        totalPrice: 4,
                        error: false
                    }
                    case actionTypes.FETCH_INGREDIENTS_FAILED:
                        return{
                            ...state,
                            error: true
                        }
            default:
                return state
    }
    
}

export default reducer