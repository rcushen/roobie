import _, { sample } from 'lodash';

import results from './sampleData/sampleResults';
const sampleResults = _.sampleSize(results, 10);

const Results = () => {
    return (
        <div className="results-container">
            <div className="content-container">
                <div className="results-header">
                    <p>Showing venues for <em>a date</em> that are <em>classy</em> and <em>intimate</em>...</p>
                </div>
                <div className="results-body">
                    {sampleResults.map((record, key) => {
                        return <ResultCard key={key} details={record} />
                    })}
                </div>
            </div>
        </div>
    )
};

const ResultCard = (props) => {
    const { details } = props;

    return (
        <div className="results-card">
            <a><h1>{details.Name}</h1></a>
            <div className="results-card-tags">
                <a>{details.Category}</a>
                <a>{details["Crowd Type"]}</a>
                <a>{details.Location}</a>
            </div>
            <p>{details.Description}</p>
        </div>
    )
};

export default Results;