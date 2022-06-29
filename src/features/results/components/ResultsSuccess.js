import React from 'react';

import { useSelector } from 'react-redux';

import {
    selectResultsFiltered
    } from './../resultsSlice';

import ResultsString from './ResultsString';
import ResultsFilters from './ResultsFilters';
import NoResults from './NoResults';
import ResultCard from './ResultCard';

const ResultsSuccess = () => {
    const results = useSelector(selectResultsFiltered);
    
    return (
        <div className="content-container">
            <div className="results-header">
                <ResultsString />
                <ResultsFilters />
            </div>
            <div className="results-body">
                <div className="results-content">
                    { results.length === 0 ? <NoResults /> : 
                        results.map((record, key) => {
                            return ( 
                                <ResultCard key={key} record={record} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
};

export default ResultsSuccess;
