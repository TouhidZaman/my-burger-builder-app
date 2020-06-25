import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (prpos) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={prpos.toggleSideDrawer}/>
        <Logo height="90%"/> 
        <nav>
           <NavigationItems />
        </nav>
    </header>
)

export default toolbar;