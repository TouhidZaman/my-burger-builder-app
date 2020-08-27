import React , { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state = {
        orders: [],
        isLoading: true,
        hasError: false
    }

    componentDidMount() {
        axios.get('orders.json')
            .then(res => {
                let orderList = []
                for (let key in res.data) {
                    orderList.push({
                        ...res.data[key],
                        id: key
                    })
                    // console.log(key)
                }
                console.log(orderList)
                this.setState({isLoading: false, orders: orderList})
            })
            .catch(err => {
                console.log(err.message)
                this.setState({isLoading: false, hasError: true})
            })
    }

    render () {
       
        return (
            <div>

                {this.state.orders ? this.state.orders.map(order => {
                    let tmpIngredients = []
                    for (let key in order.ingredients) {
                        tmpIngredients.push({name: key, value: order.ingredients[key]})
                    }
                    // console.log(tmpIngredients)
                    return (
                        <Order 
                            key={order.id} 
                            tmpIngredients={tmpIngredients}
                            price={order.price}
                            deliveryMethod={order.deliveryMethod}
                        />
                    )
                }) : <h1>No Order Found</h1>}

            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);