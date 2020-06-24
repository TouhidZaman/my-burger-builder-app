import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'

const toolbar = (prpos) => (
    <header className={classes.Toolbar}>
        <div>
            <div>Menu</div>
            <Logo /> 
        </div>
        <nav>
           <NavigationItems />
        </nav>
    </header>
)

export default toolbar;