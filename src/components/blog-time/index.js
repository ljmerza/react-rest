import React from 'react';


export default function({ timestamp }) {
    const dateObj = new Date(timestamp);

    const day = dateObj.getUTCDate();
    const month = dateObj.toLocaleString('en-us', { month: 'short' });
    const year = dateObj.getUTCFullYear();
    
    return <span>{`${day} ${month} ${year}`}</span>
}