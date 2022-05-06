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
    const results = useSelector(selectResults);
    const activeTags = useSelector(selectActiveTags);

    if (resultsStatus === 'loading') {
        return (
            <div className="results-container">
                <div className="content-container">
                    <h1>Loading...</h1>
                </div>
            </div>
        )
    } else if (resultsStatus === 'succeeded') {
        console.log(results.length)
        if (results.length === 0) {
            return (
                <div className="results-container">
                    <div className="content-container">
                        <div className="results-header">
                            <p>Here are your results!</p>
                            <div className="results-tags-gallery">
                                {
                                    activeTags.map((tag, index) => {
                                        return (
                                            <span key={index} className="search-tag-selected">{tag}</span>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="results-body">
                            <p>No results :(</p>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="results-container">
                    <div className="content-container">
                        <div className="results-header">
                            <p>Here are your results!</p>
                            <div className="results-tags-gallery">
                                {
                                    activeTags.map((tag, index) => {
                                        return (
                                            <span key={index} className="search-tag-selected">{tag}</span>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="results-body">
                            {results.map((record, key) => {
                                return <ResultCard key={key} details={record} />
                            })}
                        </div>
                    </div>
                </div>
            )
        };
    } else if (resultsStatus === 'error') {
        return (
            <div className="results-container">
                <div className="content-container">
                    <h1>Oh no! Error...</h1>
                </div>
            </div>
        )
    }
};

const ResultCard = (props) => {
    const { details } = props;
    const resultType = useSelector(selectResultType);

    // Helper functions
    const dollarSigns = num => '$'.repeat(num);

    return (
        <div className="results-card">
            <a href={details.website}><h1>{details.name}</h1></a>
            <div className="results-card-tags">
                <a href="/">{details.category}</a>
                <a href="/">{dollarSigns(details.price)}</a>
                <a href="/">{details.location}</a>
                {resultType == 'nearMe' ? <a href="/">{details.distance.toFixed(2)} km away</a> : ''}
            </div>
            <p>{details.description}</p>
        </div>
    )
};

export default Results;