import React from 'react';
import JsxWrapper from '../../hoc/JsxWrapper';
import classes from './Layout.module.css';

const layout = (props) => (
    <JsxWrapper>
        <div>Tollbar, logo, side drawer</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </JsxWrapper>
) 

export default layout;