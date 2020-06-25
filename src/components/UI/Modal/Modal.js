import React from 'react';
import classes from  './Modal.module.css';
import JsxWrapper from '../../../hoc/JsxWrapper/JsxWrapper';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
    <JsxWrapper>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
        <div 
            className={classes.Modal}
            style={{
                transform : props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}
        >
            {props.children}
        </div>
    </JsxWrapper>
)

export default modal;