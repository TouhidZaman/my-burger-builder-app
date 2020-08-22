import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummery/CheckoutSummary';
import { Route } from 'react-router-dom';
import JsxWrapper from '../../hoc/JsxWrapper/JsxWrapper';
import ContactData from './ContactData/ContactData';


export default class Checkout extends Component {
    state = {
       ingredients: null,
       price: 0
    }
    componentWillMount = () => {
        console.log('Checkout', this.props)
        const ingredients = {}
        let totalPrice = 0;
        const query = new URLSearchParams(this.props.location.search)
        for(let param of query.entries()){
            // console.log(ing)
            if(param[0] === 'price') totalPrice = +param[1]
            else ingredients[param[0]] = +param[1]
        }
        // console.log(ingredients)
        this.setState({ingredients: ingredients, price: totalPrice})
        
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinueHandler = () => {
        this.props.history.push(this.props.match.path + '/contact-data')
    }

    render() {
        return (
            <JsxWrapper>
                <CheckoutSummary 
                    ingredients={this.state.ingredients} 
                    checkoutCancel={this.checkoutCancelHandler}
                    checkoutContinue={this.checkoutContinueHandler}
                />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={ (props) => {
                        return (
                            <ContactData 
                                ingredients={this.state.ingredients}
                                totalPrice={this.state.price}
                                {...props}
                            />
                        )
                      } 
                    } 
                />
            </JsxWrapper>
        );
    }
}
