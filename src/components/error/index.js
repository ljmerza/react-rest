import React, { Fragment } from 'react';
import './index.css';


export default function ({ error = '' }) {
    return (
        <div className="container">
            <h2>{error}</h2>
        </div>
    );
}