import React from 'react';

import Header from './../elements/Header';
import Results from './../../features/results/Results';
import Footer from './../elements/Footer';

import { useSelector } from 'react-redux';

import {
    selectResultsStatus
    } from '../../features/results/resultsSlice';

const ResultsPage = () => {
    const resultsStatus = useSelector(selectResultsStatus);

    return (
        <div className="results-page-container">
            <Header landing={false}/>
            <Results />
            <Footer resultsStatus={resultsStatus}/>
        </div>
    )
};

export default ResultsPage;