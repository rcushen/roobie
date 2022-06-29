import React from 'react';

import { useSelector } from 'react-redux';

import {
    selectResultType
    } from './../resultsSlice';

import {
    selectActiveTags
    } from './../../search/searchSlice';

const ResultsString = () => {
    const resultType = useSelector(selectResultType);
    const activeTags = useSelector(selectActiveTags);

    // Helper functions
    const generateResultsString = (activeTags, resultType) => {
        if (resultType === 'nearMe') {
            return "<p>Showing venues that are <em>near me</em></p>";
        } else {
            let resultsString = activeTags.reduce((previousValue, currentValue) => {
                return previousValue + ` <em>${currentValue}</em> and`
            }, "")
            resultsString = "<p>Showing venues that are " + resultsString.substring(0, resultsString.length - 4) + "</p>";
            return resultsString;
        };
    };
    return <div className="results-string" dangerouslySetInnerHTML={{__html: generateResultsString(activeTags, resultType)}}></div>;
};

export default ResultsString;