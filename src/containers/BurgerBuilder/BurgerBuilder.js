import React, {Component} from 'react';
import JsxWrapper from '../../hoc/JsxWrapper';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.2,
    bacon: 0.7, 
    cheese: 0.5,
    meat: 1.2
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0, 
            cheese: 0,
            meat: 0
        },
        totalCost: 4,
        purchasable: false,
        purchasing: false
    }

    purchasableHandler = (ingredients) => {

        const sum = Object.keys(ingredients).map(igKey =>{
            return ingredients[igKey];
        }).reduce((x,y) => x+y)

        this.setState({purchasable: sum > 0})
    }

    purchaseHandler = () => this.setState({purchasing: true});
    purchaseCancleHandler = () => this.setState({purchasing: false});
    continuePurchaseHandler = () => alert("Sorry ! this section is under maintenance")

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCounted = oldCount + 1;

        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] = updatedCounted;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalCost;
        const newPrice = oldPrice + priceAddition;
        this.setState({ingredients: updatedIngredients,totalCost: newPrice})
        
        this.purchasableHandler(updatedIngredients);

    }

    removeIngredientHandler = (type) => {

        const oldCount = this.state.ingredients[type];
        if(oldCount < 0){
            return;
        }
        const updatedCounted = oldCount - 1;

        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] = updatedCounted;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalCost;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ingredients: updatedIngredients,totalCost: newPrice})
        
        this.purchasableHandler(updatedIngredients)
    
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return (
            <JsxWrapper>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancleHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        price={this.state.totalCost}
                        canclePurchase={this.purchaseCancleHandler}
                        continuePurchase={this.continuePurchaseHandler}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addIngredient={this.addIngredientHandler} 
                    removeIngredient={this.removeIngredientHandler}
                    disabled={disabledInfo} 
                    price={this.state.totalCost}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />
            </JsxWrapper>
        )
    }
}

export default BurgerBuilder;