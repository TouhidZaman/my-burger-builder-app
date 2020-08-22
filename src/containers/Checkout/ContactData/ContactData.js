import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        phone: null,
        address: {
            street: '',
            postalCode: ''
        },
        isLoading: false
    }

    // componentDidMount() {
    //     this.setState({ingredients: this.props.ingredients})
    // }
    
    handleOrderSubmit = (event) => {
        event.preventDefault();
        this.setState({isLoading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice.toFixed(2),
            customer: {
                name: 'Touhid',
                email: 'touhid4bd@gmail.com',
                phone: '01681941159',
                address: {
                    street: 'BADC Road',
                    zipCode: '1601'
                }
                
            },
            deliveryMethod: 'fastest'
        }

        axios.post("/orders.json", order)
            .then(response => {
                console.log(response)
                this.setState({isLoading: false})
                console.log('Your Order Is Confirmed')
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error)
                this.setState({isLoading: false})
                console.log('Sorry we can not take order today')
            })
    }

    render() {
        let form = (
            <form onSubmit={this.handleOrderSubmit}>
                <input className={classes.Input} type="text" name="name" placeholder="Enter Your Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Enter Your Email" />
                <input className={classes.Input} type="mobile" name="phone" placeholder="Enter Your Phone" />
                <Button btnType="Success">Order Now</Button>
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
