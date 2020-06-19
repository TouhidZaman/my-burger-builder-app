import React, {Component} from 'react';
import JsxWrapper from '../../hoc/JsxWrapper';

class BurgerBuilder extends Component {
    render() {
        return (
            <JsxWrapper>
                <div>Burger</div>
                <div>Build Controls</div>
            </JsxWrapper>
        )
    }
}

export default BurgerBuilder;