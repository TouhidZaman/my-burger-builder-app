import React from 'react';
import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import JsxWrapper from '../../../hoc/JsxWrapper/JsxWrapper';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let attatchedClasses = [classes.SideDrawer, classes.Close]
    if(props.open) {
        attatchedClasses = [classes.SideDrawer, classes.Open]
    }
    return (
        <JsxWrapper>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attatchedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </JsxWrapper>
    )
}

export default sideDrawer;