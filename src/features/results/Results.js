import { useSelector } from 'react-redux';

import {
    selectActiveTags
    } from '../search/searchSlice';   
import {
    selectResultsStatus, 
    selectResults,
    selectResultType
    } from './resultsSlice';

const Results = () => {
    const resultsStatus = useSelector(selectResultsStatus);
    switch (resultsStatus) {
        case 'idle':
            return <ResultsIdle />
        case 'loading':
            return <ResultsLoading />
        case 'succeeded':
            return <ResultsSuccess />
        case 'error':
            return <ResultsError />
    }
};

const ResultsIdle = () => {
    return (
        <div className="content-container">
            <h1><a href='/'>Click here to search again!</a></h1>
        </div>
    )
}

const ResultsLoading = () => {
    return (
        <div className="content-container">
            <h1>Loading...</h1>
        </div>
    )
};

const ResultsSuccess = () => {
    const results = useSelector(selectResults);
    const activeTags = useSelector(selectActiveTags);

    return (
        <div className="content-container">
            <div className="results-header">
                <p>Here are your results!</p>
                <div className="results-tags-gallery">
                    {
                        activeTags.map((tag, key) => {
                            return (
                                <span key={key} className="search-tag-selected">{tag}</span>
                            )
                        })
                    }
                </div>
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
            <div className="results-card-tags">
                <a href="/">{record.category}</a>
                <a href="/">{dollarSigns(record.price)}</a>
                <a href="/">{record.location}</a>
                {resultType == 'nearMe' ? <a href="/">{record.distance.toFixed(2)} km away</a> : ''}
            </div>
            <p>{record.description}</p>
        </div>
    )
};

export default Results;