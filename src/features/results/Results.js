import { useSelector } from 'react-redux';

import { 
    selectResultsStatus, 
    selectResults
    } from './resultsSlice';

const Results = () => {
    const resultsStatus = useSelector(selectResultsStatus);
    const results = useSelector(selectResults);

    if (resultsStatus === 'loading') {
        return (
            <div className="results-container">
                <div className="content-container">
                    <h1>Loading...</h1>
                </div>
            </div>
        )
    } else if (resultsStatus === 'succeeded') {
        return (
            <div className="results-container">
                <div className="content-container">
                    <div className="results-header">
                        <p>Here are your results!</p>
                    </div>
                    <div className="results-body">
                        {results.map((record, key) => {
                            return <ResultCard key={key} details={record} />
                        })}
                    </div>
                </div>
            </div>
        )
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

    // Helper functions
    const dollarSigns = i => '$'.repeat(i);

    return (
        <div className="results-card">
            <a href={details.website}><h1>{details.name}</h1></a>
            <div className="results-card-tags">
                <a href="/">{dollarSigns(details.price)}</a>
                <a href="/">{details.location}</a>
            </div>
            <p>{details.description}</p>
        </div>
    )
};

export default Results;