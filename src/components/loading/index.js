import React, { Fragment } from 'react';
import './index.css';


export default function({ message = '' }){
    return (
        <Fragment>
            <h2>{message}</h2>
            <div className="container">
                <div className="ball"></div>
                <div className="ball"></div>
                <div className="ball"></div>
                <div className="ball"></div>
                <div className="ball"></div>
                <div className="ball"></div>
                <div className="ball"></div>
            </div>

            
        </Fragment>
    );
}