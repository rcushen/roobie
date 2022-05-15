import { useEffect, useInsertionEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
    selectActiveTags
    } from '../search/searchSlice';   
import {
    selectResultsStatus, 
    selectResults,
    selectResultType
    } from './resultsSlice';

const Results = () => {
    const navigate = useNavigate();
    const resultsStatus = useSelector(selectResultsStatus);
    
    useEffect(() => {
        if (resultsStatus === 'idle') {
            navigate('/', { replace: true });
        };
    });

    switch (resultsStatus) {
        case 'loading':
            return <ResultsLoading />
        case 'succeeded':
            return <ResultsSuccess />
        case 'error':
            return <ResultsError />
        default:
            return <ResultsError />
    };
};

const ResultsLoading = () => {
    return (
        <div className="content-container">
            <h1>Loading...</h1>
        </div>
    )
};

const ResultsSuccess = () => {
    const results = useSelector(selectResults);
    const resultType = useSelector(selectResultType);
    const activeTags = useSelector(selectActiveTags);

    return (
        <div className="content-container">
            <div className="results-header">
                <p>Here are your results!</p>
                {   
                    resultType === 'search' ?
                    <div className="results-tags-gallery">
                        {
                            activeTags.map((tag, key) => {
                                return (
                                    <span key={key} className="search-tag-selected">{tag}</span>
                                )
                            })
                        }
                    </div>
                    : ''
                }
            </div>
            <div className="results-body">
                {
                    results.map((record, key) => {
                        return ( 
                            <ResultCard key={key} record={record} />
                        )
                    })
                }
            </div>
        </div>
    )
};

const ResultsError = () => {
    return (
        <div className="content-container">
            <h1>Oh no! Error...</h1>
        </div>
    )
};

const ResultCard = ({ record }) => {
    const resultType = useSelector(selectResultType);

    // Helper functions
    const dollarSigns = num => '$'.repeat(num);

    return (
        <div className="results-card">
            <a href={record.website}><h1>{record.name}</h1></a>
            <div className="results-card-details">
                <a href="/">{record.category}</a>
                <a href="/">{dollarSigns(record.price)}</a>
                <a href="/">{record.location}</a>
                {resultType === 'nearMe' ? <a href="/">{record.distance.toFixed(2)} km away</a> : ''}
            </div>
            <p>{record.description}</p>
            <div className="results-card-primary-tags">
                {
                    record.primary_tags.split(', ').map((tag, key) => {
                        return (
                            <a href='/' key={key}>{tag}</a>
                        )
                    })
                }
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

export default Results;