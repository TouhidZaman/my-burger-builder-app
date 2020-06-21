import React from 'react';
import classes from './BuildControl.module.css';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button 
            onClick={props.add} 
            className={classes.More}
        >More</button>
        <button 
            onClick={props.remove} 
            className={classes.Less}
            disabled={props.disabled}
        >Less</button>
    </div>
)

export default buildControl;