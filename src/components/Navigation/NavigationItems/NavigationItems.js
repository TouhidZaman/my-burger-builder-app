import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
       <NavigationItem exact link='/'>Home</NavigationItem>
       <NavigationItem link='/orders'>My Orders</NavigationItem>
    </ul>
)

export default navigationItems