import React, { Component } from 'react'
import JsxWrapper from '../JsxWrapper/JsxWrapper'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component  {

        state = {
            error: null
        }


        componentWillMount = () => {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null})
                 return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, (error) => {
                this.setState({error: error})
            })
        } 

        componentWillUnmount = () => {
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)
        }

        modalClosedHandler = () => this.setState({error: null})

        render(){
            return (
                <JsxWrapper>
                    <Modal show={this.state.error} modalClosed={this.modalClosedHandler}>
                        <p>{this.state.error ? this.state.error.message : null}</p>
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </JsxWrapper>
            )
        }
    }
}

export default withErrorHandler