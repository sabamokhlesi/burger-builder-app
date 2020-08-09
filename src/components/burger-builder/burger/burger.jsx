import React from'react'
import styles from './burger.module.scss'
import BurgerIngredient from './burgerIngredient/burgerIngredient'
const burger = (props) => {
    let newIngredients = Object.keys(props.ingredients).map(
        IgKey=>{
            return [...Array(props.ingredients[IgKey])].map(
                (_,i)=>{ return <BurgerIngredient type={IgKey} key={IgKey+i} />}
                )
            }
        ).reduce((arr,el)=>{return arr.concat(el)},[])
    if (newIngredients.length === 0){
        newIngredients = <h3>Please Start Adding Ingredients</h3>
    }
    return(
        <div className={styles.burger}>
            <BurgerIngredient type='bread-top' />
            {newIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    )
}


export default burger