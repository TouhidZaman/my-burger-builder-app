import React from 'react';
import JsxWrapper from '../../../hoc/JsxWrapper';
import Button from '../../UI/Button/Button';


const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients).map( igKey => {
    return <li><span style={{textTransform:"capitalize"}}>{igKey}</span>: {props.ingredients[igKey]}</li>
    })
    return (
        <JsxWrapper>
            <h3>Order Summary</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Cost: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.canclePurchase}>CANCLE</Button>
            <Button btnType="Success" clicked={props.continuePurchase}>CONTINUE</Button>
        </JsxWrapper>
    )
}

export default orderSummary;