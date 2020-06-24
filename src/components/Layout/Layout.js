import React from 'react';
import JsxWrapper from '../../hoc/JsxWrapper';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => (
    <JsxWrapper>
        <Toolbar />
        <main className={classes.Content}>
            {props.children}
        </main>
    </JsxWrapper>
) 

export default layout;