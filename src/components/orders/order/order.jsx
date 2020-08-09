import React from'react'
import styles from './order.module.scss'

const order = (props) => {
    const ingredients = [];

    for ( let ingredientName in props.ingredients ) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
                }}
            key={ig.name}>{ig.name} ({ig.amount})</span>;
    });
    return (
        <div className={styles.order}>
            <h4>Price: {props.price}</h4>
            <p><strong>Ingredients:</strong>{ingredientOutput}</p>
            <p><strong>Order ID:</strong> {props.orderID}</p>
        </div>
    )
}


export default order