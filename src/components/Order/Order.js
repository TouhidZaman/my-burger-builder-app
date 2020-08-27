import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    // console.log(props.tmpIngredients)
    const ingredientStyle = {
        padding: '0 5px',
        borderRadius: '3px',
        backgroundColor: 'white',
        margin:'0 3px',
        color: 'gray'
    }
    return (
        <div className={classes.Order}>
            <p>Ingredient: {props.tmpIngredients.map(ingredient => (
                <span 
                    key={ingredient.name}
                    style={ingredientStyle}
                >{ingredient.name}: {ingredient.value}</span>
            ))}</p>
            <p>Price: <strong>${props.price}</strong></p>
        </div>
    )
}

export default order;

