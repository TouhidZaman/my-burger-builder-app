import React, {Component} from 'react';
import JsxWrapper from '../../hoc/JsxWrapper/JsxWrapper';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad: 0.2,
    bacon: 0.7, 
    cheese: 0.5,
    meat: 1.2
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalCost: 4,
        purchasable: false,
        purchasing: false,
        isLoading: false,
        error: false
    }

    componentDidMount = () => {
        axios.get("/ingredients.json")
            .then(response => {
                this.setState({ingredients: response.data})
            })
            .catch(error =>   {
                this.setState({error: true})
            })
    }

    purchasableHandler = (ingredients) => {

        const sum = Object.keys(ingredients).map(igKey =>{
            return ingredients[igKey];
        }).reduce((x,y) => x+y)

        this.setState({purchasable: sum > 0})
    }

    purchaseHandler = () => this.setState({purchasing: true});
    purchaseCancleHandler = () => this.setState({purchasing: false});

    continuePurchaseHandler = () => {
        this.setState({isLoading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalCost.toFixed(2),
            customer: {
                name: 'Touhid',
                address: {
                    street: 'BADC Road',
                    zipCode: '1601',
                    country: 'Bangladesh'
                },
                email: 'touhid4bd@gmail.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post("/orders.json", order)
            .then(response => {
                console.log(response)
                this.setState({isLoading: false, purchasing: false})
                console.log('Your Order Is Confirmed')
            })
            .catch(error => {
                console.log(error)
                this.setState({isLoading: false, purchasing: false})
                console.log('Sorry we can not take order today')
            })
    }

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

        let orderSummary = null
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />

        if(this.state.ingredients) {
            burger = (
                <JsxWrapper>
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

            orderSummary = (
                <OrderSummary 
                    ingredients={this.state.ingredients}
                    price={this.state.totalCost}
                    canclePurchase={this.purchaseCancleHandler}
                    continuePurchase={this.continuePurchaseHandler}
                />
            )
        }

        if(this.state.isLoading) {
            orderSummary = <Spinner />
        }

        return (
            <JsxWrapper>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancleHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </JsxWrapper>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);