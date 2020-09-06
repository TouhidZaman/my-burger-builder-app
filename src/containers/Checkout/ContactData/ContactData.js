import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your name'
                },
                value: ''
            },

            street: {
                elementType: "input",
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your street'
                },
                value: ''
            },

            zipCode: {
                elementType: "input",
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your zip code'
                },
                value: ''
            },

            country: {
                elementType: "input",
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your country'
                },
                value: ''
            },

            phone: {
                elementType: "input",
                elementConfig: {
                    type: 'number',
                    placeholder: 'Enter your mobile'
                },
                value: ''
            },

            email: {
                elementType: "input",
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter your e-mail'
                },
                value: ''
            },

            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest'
            }
        },
        isLoading: false
    }
    
    handleOrderSubmit = (event) => {
        event.preventDefault();
        this.setState({isLoading: true});

        const formData = {}
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }
        // console.log(formData)

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice.toFixed(2),
            formData 
        }

        axios.post("/orders.json", order)
            .then(response => {
                console.log(response)
                this.setState({isLoading: false})
                console.log('Your Order Is Confirmed')
                this.props.history.push('/orders');
            })
            .catch(error => {
                console.log(error)
                this.setState({isLoading: false})
                console.log('Sorry we can not take order today')
            })
    }

    inputChangedHandler = (event, elementId) => {
        // console.log(event.target.value);
        // console.log(elementId);
        let updatedOrderForm = {
            ...this.state.orderForm
        }
        let currentElement = {
            ...updatedOrderForm[elementId],
            value: event.target.value
        }
        updatedOrderForm[elementId] = currentElement;
        // console.log(currentElement);
        this.setState({orderForm: updatedOrderForm})
    }

    render() {
        let orderFormElements = []
        for(let key in this.state.orderForm) {
            orderFormElements.push({
                ...this.state.orderForm[key],
                id: key
            })
        }
        
        let form = (
            <form onSubmit={this.handleOrderSubmit}>
                {orderFormElements.map(element => (
                    <Input 
                        key={element.id}
                        elementType={element.elementType} 
                        elementConfig={element.elementConfig}
                        value={element.value}
                        changed={(event) => this.inputChangedHandler(event, element.id)}
                    />
                ))}
                <Button btnType="Success">ORDER</Button>
            </form>
        )

        if(this.state.isLoading) form = <Spinner/>
        
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Information</h4>
                {form}
            </div>
        )
    }
}

export default withErrorHandler(ContactData, axios);
