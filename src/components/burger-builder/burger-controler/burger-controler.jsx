import React from'react'
import styles from './burger-controler.module.scss'
import BurgerControl from './burger-control/burger-control'
const burgerControler = (props) => {
    return (
        <div className={styles.BuildControl}>
            <h3 style={{textAlign:"center"}}>Total Price:{props.price.toFixed(2)}</h3>
            <BurgerControl type='meat' label='Meat' added={()=>props.addIngredient('meat')} removed={()=>props.removeIngredient('meat')} />
            <BurgerControl type='cheese' label='Cheese' added={()=>props.addIngredient('cheese')} removed={()=>props.removeIngredient('cheese')}/>
            <BurgerControl type='salad' label='Salad' added={()=>props.addIngredient('salad')} removed={()=>props.removeIngredient('salad')}/>
            <BurgerControl type='bacon' label='Bacon' added={()=>props.addIngredient('bacon')} removed={()=>props.removeIngredient('bacon')}/>
        </div>
    )
}


export default burgerControler