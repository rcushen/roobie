import React from 'react';

import { useSelector } from 'react-redux';

import {
    selectResultType
} from './../resultsSlice';

const ResultCard = ({ record }) => {
    const resultType = useSelector(selectResultType);

    // Helper functions
    const dollarSigns = num => '$'.repeat(num);
    const dollarSignsPad = num => '$'.repeat(3 - num);

    return (
        <div className="results-card">
            <div className="results-card-header">
                <a href={record.website}><h2>{record.name}</h2></a>
            </div>
            
            <div className="results-card-details">
                <p>{record.category}</p>
                <p>{dollarSigns(record.price)}<em>{dollarSignsPad(record.price)}</em></p>
                <p>{record.location}</p>
                {resultType === 'nearMe' ? <p>{record.distance.toFixed(2)} km away</p> : ''}
            </div>
           
            <div className="results-card-content">
                <p>{record.description}</p>
                <div className="results-card-links">
                    <a href='https://www.goodheavens.com.au/'>Website</a>
                    <a href='https://www.instagram.com.au'>Instagram</a>
                    <a href='https://goo.gl/maps/MkYUPKf2pYM8NewT6'>Google Maps</a>
                </div>
            </div>
            <div className="results-card-secondary-tags">
                {
                    record.secondary_tags.split(', ').map((tag, key) => {
                        return (
                            <a href='/' key={key}>{tag}</a>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default ResultCard;